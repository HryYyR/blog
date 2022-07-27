// utils.js
// immediate 是否开始立即执行
function debounce(func, delay = 300, immediate = false) {
    let timer = null
    return function() {
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