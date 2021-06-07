function toFourDecimals(number) {
  if (isNaN(parseFloat(number)) === false) {
    let toFixedLength = 4
    let num = number / 10000
    let str = num.toString()

    return parseFloat(str).toFixed(toFixedLength)
  }

  return number // Not a number, so you may throw exception or return number itself
}

function padZero(num, lead, trail) {
  let cString = num.toString()
  let cWhole,
    cDec,
    cCheck = cString.indexOf('.')

  if (cCheck === -1) {
    cWhole = cString.length
    cDec = 0
    cString += '.'
  } else {
    cWhole = cCheck
    cDec = cString.substr(cCheck + 1).length
  }

  if (cWhole < lead) {
    for (let i = cWhole; i < lead; i++) {
      cString = '0' + cString
    }
  }

  if (cDec < trail) {
    for (let i = cDec; i < trail; i++) {
      cString += '0'
    }
  }

  return cString
}

export const myloshisToMYLS = (myloshis) => padZero(toFourDecimals(myloshis), 0, 4)
