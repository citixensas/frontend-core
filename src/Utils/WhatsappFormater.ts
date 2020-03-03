const regex: RegExp = /\[([0-9:]){1,5}\s([AaMmPp.,\s])+([0-9\/]){0,10}](.+?:\s)/gm

export const WhatsappFormater = (str: string) => {
  let m: RegExpExecArray | null
  let matches: string[] = []
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex++
    m.forEach((match, i) => (i === 0) ? matches = [...matches, match] : null)
  }
  matches.forEach((match, i) => {
    if (i === 0) str = str.replace(match, '')
    else str = str.replace(match, "\n")
  })
  return str
}
