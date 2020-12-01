import React from 'react'
import moment from 'moment'

const Performance = (props) => {
  // The ombiweb URl needs path to specific theater
  const siteUrl = window.location.href.split('?')[0]
  let ombiWebPath
  if (siteUrl.indexOf('avalonmke') !== -1){
    ombiWebPath = 'avalon'
  } else if (siteUrl.indexOf('timescinema') !== -1) {
    ombiWebPath = 'times'
  } else if (siteUrl.indexOf('rosebudcinema') !== -1) {
    ombiWebPath = 'rosebud'
  } else if (siteUrl.indexOf('localhost') !== -1) {
    ombiWebPath = 'avalon'
  }

  function formatShowtime(time) {
    // convert military time to 12-hour time
    var hours = time.split(':')[0]
    var mins = time.split(':')[1]

    var formattedHours = hours >= 13 ? (hours - 12) : hours
    var AMorPM = hours >= 12 ? 'pm' : 'am'

    return `${formattedHours}:${mins}${AMorPM}`
  }

  function renderDate() {
    return moment(props.data.date).format('dddd MMM DD')
  }

  const renderShowTimes = () => {
    return props.data.showtimes.map((item, i) => {
      return (
       <a href={`https://omniwebticketing.com/${ombiWebPath}/${item.url}`}
          className="performance-link"
          style={{ background: props.color }}
          target="_blank"
          key={i}>
         { formatShowtime(item.showtime) }
       </a>
      )
    })
  }

  return (
    <tr className="performance">
      <td style={{color: props.color}}>
        { renderDate() }
      </td>
      <td>
        { renderShowTimes() }
      </td>
    </tr>
  )
}

export default Performance
