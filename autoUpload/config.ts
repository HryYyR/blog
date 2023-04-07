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
  localFile: 'E:/desk/blog/blog/program/blog/dist',

  isuploadgithub: true,  //是否上传github
  isbuild:true,
  // nginxDir: 'C:/Users/Administrator/Desktop/nginx-1.22.0'  //nginx目录
}


module.exports = config