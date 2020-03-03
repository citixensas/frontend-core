export default (value_: any, currency: any, decimal: any) => {
  let value = value_.toString().split('.')[0]

  value = value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")

  if (decimal > 0) {
    let partDecimal = parseFloat(value_).toFixed(decimal)
    partDecimal = partDecimal.split('.')[1]
    return currency + value + '.' + partDecimal
  }

  return currency + value
}
