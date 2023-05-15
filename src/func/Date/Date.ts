
export function getFullDate(): string {
    const date = new Date();
    return date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
}