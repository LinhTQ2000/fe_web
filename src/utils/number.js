export const convertNumberWithSISymbol = (num, digits = 2) => {
  if (!num) return 0

  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break
    }
  }

  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}

export function convertWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function round(number, places) {
  const multiplier = Math.pow(10, places)
  return Math.round(number * multiplier) / multiplier
}
