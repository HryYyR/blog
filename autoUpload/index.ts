const { Command } = require('commander');
const shell = require('shelljs');
const compress = require('./compressFile.ts');
const [connect, SSH] = require('./ssh.ts')
const uplod = require('./uploadFile.ts')
const runcommand = require('./handleCommand.ts')
const Config = require('./config.ts')
const program = new Command();
const Record = require("./submitRecord.ts")

const main = async () => {
    if (!shell.which('git')) {
        //向命令行打印git命令不可用的提示信息
        shell.echo('Sorry, this script requires git');
        //退出当前进程
        shell.exit(1);
    }

    // 必填选项
    program.requiredOption('-i, --commitInfo <filename>', 'commitInfo filename');
    program.parse();
    let info = program.opts().commitInfo
    try {

        if (Config.isbuild) {
            try {
                console.log("开始打包项目");
                await shell.exec("npm run build-prod")
                console.log("打包成功！");
            } catch (e) {
                console.log("打包出错: " + e);

                return
            }
        }
        if (Config.isuploadgithub) {
            console.log("开始添加到暂存区");
            await shell.exec("git add .")
            console.log("添加成功！");
            console.log("开始推送到云端");
            await shell.exec("git commit -m" + info)
            console.log("设置推送成功！");
            console.log("上传代码......");
            await shell.exec("git push")
            console.log("代码上传成功！");
        }

        if (Config.isRecord) {
            console.log(await Record(info));
        }

        console.log("开始压缩为zip");
        await compress(Config.localFile, __dirname + '/' + Config.targetFile)  //压缩
        console.log("压缩完成！");
        console.log('正在连接远程服务器');
        await connect(Config.sshinfo)  //连接
        console.log("连接成功！");
        console.log("上传压缩包");
        await uplod(SSH, Config, __dirname + '/' + Config.targetFile)  //上传压缩包
        console.log("上传成功！");
        console.log("正在执行解压等后续操作");
        await runcommand(SSH, `autodeploy.bat`, '')  //
        console.log("执行完毕！");
    } catch (error) {
        console.log(error);
    } finally {
        process.exit()
    }
}
main()

