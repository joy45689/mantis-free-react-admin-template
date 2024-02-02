


export function formatDatetime(dateTime) {
  if(dateTime == null){
    return 'N/A';
  }
  
  let date = new Date(dateTime);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let min = date.getMinutes();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  // return year + "-" + month + "-" + day;
  return `${year}-${month}-${day} ${hour}:${min}`;
}