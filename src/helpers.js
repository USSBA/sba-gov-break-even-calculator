// https://blog.abelotech.com/posts/number-currency-formatting-javascript/
export const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const sumValues = obj => Object.values(obj).reduce((a, b) => parseFloat(a) + parseFloat(b));

export const roundToTwoDecimals = (num) => Math.round((num + Number.EPSILON) * 100) / 100