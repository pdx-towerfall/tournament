function toObject (arr) {
  let obj = {}
  arr.forEach(item => obj[item.id] = item)
  return obj
}

export default toObject
