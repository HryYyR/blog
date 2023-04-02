const usePromise = (code) =>  new Promise<String>((resolve, reject) => {
    try {
         shell.exec(code)
        resolve(code+"执行成功！")
    } catch (err) {
        reject(`${code}执行失败!-------${err}`)
    }
})

export default usePromise