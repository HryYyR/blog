const { Command } = require('commander');
const shell = require('shelljs');
const program = new Command();

const usePromise = (code) => new Promise<String>((resolve, reject) => {
    try {
        shell.exec(code)
        resolve(`${code}"执行成功！`)
    } catch (err) {
        reject(`${code}执行失败!-------${err}`)
    }
})

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


shell.exec("npm run build-prod")
console.log("打包成功！");
shell.exec("git add .")
console.log("添加成功！");
shell.exec("git commit -m"+info)
console.log("设置信息成功！");
shell.exec("git push")
console.log("代码上传成功！");




// usePromise("npm run build-prod")
// usePromise("git add .")
// usePromise(`git commit -m ${info}`)
// usePromise("git push")

console.log("上传github成功!");
