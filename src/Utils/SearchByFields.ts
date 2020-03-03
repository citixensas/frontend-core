const valueObject = (obj: any, fields: any) => {
  let intermediary = null
  let value = obj
  fields.map((field: any) => {
    intermediary = value[field]
    value = intermediary
    return field
  })
  return value
}

export const SearchByFields = (array: any, field: any, value: any) => {
  if (!!value) {
    let fields = field.split('.')
    return array.filter((element: any) => {
      const valueFind = valueObject(element, fields)
      if (!!valueFind) {
        return valueFind.toLowerCase().includes(value)
      } else {
        return false
      }
    })
  } else {
    return array
  }
}
