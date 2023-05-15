export type DATA = {
    isopenPEnav: boolean,
    islogin: boolean,
    loading: boolean,
    viewTitle: string, //当前页面标题
    header: string, //头像
    ShowUserHeader: boolean, //是否展示用户信息选项卡
    language: string, //当前语言
    visibleLanguage: boolean, //是否展示切换语言选项卡
    dark: boolean,
    darkImg: darkImg
}
type darkImg = {
    moon: string,
    sun: string
}

export type routesList = Array<List>
type List = {
    name:string,
    path:string,
    title:string,
    check?:boolean,
}