const timeMark = createdAt => {
  const moment = require('moment')
  createdAt = moment(createdAt)
  if (moment().diff(createdAt) > 259200000) {
    return createdAt.format('YYYY-MM-DD')
  } else {
    return moment(createdAt, 'YYYY.MM.DD.HH.mm.SS').locale('ko').fromNow()
  }
}


export {
  timeMark
}
