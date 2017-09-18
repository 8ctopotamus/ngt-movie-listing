import React from 'react'

const Performance = (props) => {
  // The ombiweb URl needs path to specific theater
  const siteUrl = window.location.href
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

    var formattedHours = hours >= 13 ? (hours - 12) : hours;
    var AMorPM = hours >= 13 ? 'pm' : 'am'

    return `${formattedHours}:${mins}${AMorPM}`
  }

  const renderShowTimes = () => {
    return props.data.showtimes.map((item, i) => {
      return (
       <a href={`https://omniwebticketing.com/${ombiWebPath}/${item.url}`}
         target="_blank"
         key={i}
         style={{
           background: '#C7B299',
           padding: '4px 8px',
           textDecoration: 'none',
           fontWeight: 'bold',
           marginRight: '5px',
           color: 'black',
         }}>
         { formatShowtime(item.showtime) }
       </a>
      )
    })
  }

  return (
    <tr className="performance">
      <td>{ props.data.date }</td>
      <td>
        { renderShowTimes() }
        <style jsx>{`
          td {
            padding: 6px 8px !important;
          }
        `}</style>
      </td>
    </tr>
  )
}

export default Performance
