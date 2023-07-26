export type DATA = {
    newBlogData: Array<showBlogData>, //最新博客数据
    showBlogData: Array<showBlogData>, //展示的博客数据
    pageNum: number, //分页
    Num: number, //每页数量
    haveMoreData: boolean, //是否还有更多数据
    scrollOption: {
        screenH: number,
        domHight: number,
        scrollTop: number,
        id: HTMLElement|number, //
        scrollHeight: number,
        offsetTop: number,
        top: number,
        bottom: number,
    },
    loading:boolean
}
export type showBlogData = {
    id?: number,
    img?: string,
    visitnumber?: number,
    createtime?: string,
    name?: string,
    container?: string,
    commentnum?: number,
    laudnum?: number,
    labelname?: Array<string>,
    sortname?: string,
    isShow?: number,
}