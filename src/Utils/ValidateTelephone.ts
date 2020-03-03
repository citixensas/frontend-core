export const ValidateTelephone = (valueData: any) => {
  valueData = valueData.split(' ').join('')

  if ((valueData.startsWith('000')) && (valueData.startsWith('0000'))) {
    valueData = valueData.slice(0, 3)
  }

  if (valueData.startsWith('+')) {
    valueData = `+${valueData.split('+').join('')}`
  } else if (!valueData.startsWith('+') && !valueData.startsWith('(') && valueData.includes('+')) {
    valueData = `${valueData.split('+').join('')}`
  }

  if (valueData.includes('(') || valueData.includes(')') ||
    valueData.includes('-')) {
    valueData = `${valueData.split('(').join('')}`
    valueData = `${valueData.split(')').join('')}`
    valueData = `${valueData.split('-').join('')}`
  }

  if (valueData.length > 20) {
    valueData = valueData.slice(0, 20)
  }

  if (!(/^[+0-9]*$/).test(valueData)) {
    return ''
  }

  return valueData
}
