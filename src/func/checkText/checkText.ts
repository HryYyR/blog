import { ElMessage } from "element-plus"
import { AddIpBlackList, getIpAndPath } from "../../axios/apis"

export async function checkTEXT(text: string) {
    const {ip} = await getIpAndPath()
    const reg: any = {
        '<script': 'xss',
        'and': 'sql',
        'where': 'sql',
        '*': 'sql',
        '=': 'sql or xss',
        'select': 'sql',
        'delete': 'sql',
        'update': 'sql',
        'sql':'sql'
    }
    for (let i in reg) {
        if (text.includes(i)) {
            console.log(reg[i]);
            AddIpBlackList({ ip: ip || 'null', type: reg[i] })
            ElMessage.error("为什么不听话?")
            return false
        }
    }
    return true
}
