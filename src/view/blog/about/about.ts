export type DATA = {
    SectionList: Array<SectionList>,
    SectionListShow: Boolean,
    DialogList: Array<DialogList>,
    aboutInfo: aboutInfo,
}

type str_bool = string | boolean

type aboutInfo = {
    start: Array<str_bool>,
    blog: Array<str_bool>,
    like: Array<str_bool>,
    stack: Array<str_bool>,
    talk: Array<str_bool>,
    exit: Array<str_bool>
}
type SectionList = {
    id: number,
    type: string,
    text: string,
    show: boolean
}
type DialogList = {
    text: string,
    isResponse?: boolean,
}
