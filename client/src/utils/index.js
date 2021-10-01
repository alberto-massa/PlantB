module.exports = {
        
    
    formatDate: date => {

      let dateF = new Date(date)

    let month = '' + (dateF.getMonth() + 1)
    let day = '' + dateF.getDate()
    let year = dateF.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-')
  },


  formatSignDate: date => {

    var today = new Date();
  
    let month = '' + (today.getMonth() + 1)
    let day = '' + today.getDate()
    let year = today.getFullYear() - 18


    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-')
  }

}