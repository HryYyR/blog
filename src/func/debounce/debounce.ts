// utils.js
// immediate 是否开始立即执行
function debounce1(func: Function, delay = 300, immediate = false) {
    let timer: any = null
    return function (this: any) {
        if (timer) {
            clearTimeout(timer)
        }
        if (immediate && !timer) {
            func.apply(this, arguments)
        }
        timer = setTimeout(() => {
            func.apply(this, arguments)
        }, delay)
    }
}
export default debounce



function debounce(fn: Function, delay: number) {
    let time: any = null;//time用来控制事件的触发
    return function (this: any) {
        if (time !== null) {
            clearTimeout(time);
        }
        time = setTimeout(() => {
            fn.call(this);
            //利用call(),让this的指针从指向window 转成指向input
        }, delay)
    }
}