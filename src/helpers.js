// https://blog.abelotech.com/posts/number-currency-formatting-javascript/
export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const sumValues = obj => Object.values(obj).reduce((a, b) => parseFloat(a) + parseFloat(b));

export const roundToTwoDecimals = (num) => Math.round((num + Number.EPSILON) * 100) / 100

const decimalAdjust = (value, exp) => {
  // If the exp is undefined or zero
  if (typeof exp === 'undefined' || +exp === 0) {
      return Math.round(value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

export const decimalPrettify = (value) => {
  const numLength = value.toString().length
  return Math.ceil(decimalAdjust(value, numLength - 1) / 5) * 5
}

export const findStepSize = (value) => {
  if (value < 6) return 1;
  return decimalPrettify(Math.round(value/4))
}