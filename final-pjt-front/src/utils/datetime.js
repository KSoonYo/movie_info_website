const timeMark = createdAt => {
  const moment = require('moment')
  const newCreatedAt = moment(createdAt)
  if (createdAt.length < 20) {
    return createdAt
  } else if (moment().diff(newCreatedAt) > 259200000) {
    return newCreatedAt.format('YYYY-MM-DD')
  } else {
    return moment(newCreatedAt, 'YYYY.MM.DD.HH.mm.SS').locale('ko').fromNow()
  }
}


export {
  timeMark
}