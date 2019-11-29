module.exports = {
  parseDataBancoPraFront(data) {
    const arrayData = data.split("-")
    return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`
  }
}
