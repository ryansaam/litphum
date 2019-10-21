// RobG's answer on StackOverflow https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript/9763769
function msToTime(s) {
  const pad = (n, z = 2) => ('00' + n).slice(-z);
  if (s >= 3600000) {
    return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0)
  } else {
    const minute = pad((s%3.6e6)/6e4 | 0).slice(0, 1) === '0' && pad((s%3.6e6)/6e4 | 0).slice(1)
    return (minute || pad((s%3.6e6)/6e4 | 0)) + ':' + pad((s%6e4)/1000|0)
  }
}

export default msToTime