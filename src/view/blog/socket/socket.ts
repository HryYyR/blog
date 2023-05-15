export type DATA = {
    chatList: Array<CHATLIST>,
    userlist: Array<USERLIST>,
    chatMessage:string,
    userInfo:USERLIST,
    fileList:any,
    fileUrl:string
}

type CHATLIST = {
    uuid:string,
    id: number,
    head:string,
    message:string,
    createtime:string,
    username:string,
    type:string,
}

export type USERLIST = {
    uuid:string,
    id: number|string,
    name:string,
    head:string

}