const { Md5 } = require("ts-md5")
const axios = require('axios')
const recordConfig = require('./config.ts')

async function submitRecord(RecordContainer) {
    return new Promise(async (resolve, reject) => {
        let loginInfo = recordConfig.loginInfo
        loginInfo.pass = new Md5().appendAsciiStr(loginInfo.pass).end();
        let loginoutInfo = await http(`${recordConfig.http}/api/login`, loginInfo)
        let token = loginoutInfo.data.token
        let addRecordoutInfo = await http(`${recordConfig.http}/api/admin/addRecord`, { container: RecordContainer }, { Authorization: token || '-1' })
        addRecordoutInfo.status == 200 ? resolve("记录添加成功!") : reject("记录添加失败!")
    })
}

function http(path, data, headers = {}) {
    return axios({
        method: 'post',
        url: path,
        data: data,
        headers: headers
    })
}

module.exports = submitRecord