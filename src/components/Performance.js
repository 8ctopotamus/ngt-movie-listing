import React from 'react'
import moment from 'moment'

const Performance = (props) => {
  // The ombiweb URl needs path to specific theater
  const siteUrl = window.location.href.split('?')[0]
  let omniWebPath
  if (siteUrl.indexOf('avalonmke') !== -1){
    omniWebPath = 'avalon'
  } else if (siteUrl.indexOf('timescinema') !== -1) {
    omniWebPath = 'times'
  } else if (siteUrl.indexOf('rosebudcinema') !== -1) {
    omniWebPath = 'rosebud'
  } else if (siteUrl.indexOf('localhost') !== -1) {
    omniWebPath = 'avalon'
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


  // You Omniterm purchasing site is no longer https://omniwebticketing.com/avalon

  // https://omniwebticketing5.com/theatre4/


  const renderShowTimes = () => {
    return props.data.showtimes.map((item, i) => {
      const href = omniWebPath === 'avalon'
        ? `https://omniwebticketing5.com/theatre4/${item.url}`
        : `https://omniwebticketing.com/${omniWebPath}/${item.url}`
      return (
       <a href={href}
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
