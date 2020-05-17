import aes from 'crypto-js/aes'

export function saveToFile(filename, data){
  var pom = document.createElement('a')
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
  pom.setAttribute('download', filename)

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    pom.dispatchEvent(event)
  }
  else {
    pom.click()
  }
}

export function encodeSaveData(saveData){
  const dataString = JSON.stringify(saveData)
  // return aes.encrypt(dataString, 'whatever lol')
  return dataString
}

export function decodeSaveData(saveData){
  // const dataString = aes.decrypt(saveData, 'whatever lol')
  return JSON.parse(saveData)
}