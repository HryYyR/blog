// uploadFile.js
const handleSourceFile = require('./handleCommand.ts')

// 文件上传(ssh对象、配置信息、本地待上传文件)
async function uploadFile(ssh, config, localFile) {
    return new Promise((resolve, reject) => {
        console.log('4-开始文件上传')
        // handleSourceFile(ssh, config)
        ssh.putFile(localFile, config.deployDir + config.targetFile).then(async () => {
            resolve(console.log('5-文件上传完成'))
        }, (err) => {
            reject(console.error('5-上传失败！', err))
        })
    })
}

module.exports = uploadFile