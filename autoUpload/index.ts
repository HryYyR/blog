const { Command } = require('commander');
const shell = require('shelljs');
const compress = require('./compressFile.ts');
const [connect, SSH] = require('./ssh.ts')
const uplod = require('./uploadFile.ts')
const runcommand = require('./handleCommand.ts')
const program = new Command();

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
    const config = {
        sshinfo: {
            host: '47.96.151.77',
            username: 'Administrator',
            password: 'Hyyyh1527',
            // privateKey: "C:/Users/huang'rui/.ssh/id_rsa", // ssh私钥(不使用此方法时请勿填写， 注释即可)
            // passphrase: '' // ssh私钥对应解密密码(不存在设为''即可)
        },
        targetFile: 'blog.zip', // 目标文件
        deployDir: './Desktop/nginx-1.22.0/html/', // 远端目录
        nginxDir: 'C:/Users/Administrator/Desktop/nginx-1.22.0'  //nginx目录
    }
    try {
        console.log("开始打包项目");
        await shell.exec("npm run build-prod")
        console.log("打包成功！");
        console.log("开始添加到暂存区");
        await shell.exec("git add .")
        console.log("添加成功！");
        console.log("开始推送到云端");
        await shell.exec("git commit -m" + info)
        console.log("设置推送成功！");
        console.log("上传代码......");
        await shell.exec("git push")
        console.log("代码上传成功！");
        console.log("开始压缩为zip");
        await compress('E:/desk/blog/blog/program/blog/dist', __dirname + '/blog.zip')  //压缩
        console.log("压缩完成！");
        console.log('正在连接远程服务器');
        await connect(config.sshinfo)  //连接
        console.log("连接成功！");
        console.log("上传压缩包");
        await uplod(SSH, config, __dirname + '/blog.zip')  //上传压缩包
        console.log("上传成功！");
        console.log("正在执行解压等后续操作");
        await runcommand(SSH, `autodeploy.bat`, '')  //
        console.log("执行完毕！");
        // await runcommand(SSH,`7z x blog.zip`,"")  //解压
        // console.log("解压成功！");
    } catch (error) {
        console.log(error);
    } finally {
        process.exit()
    }


}

main()

