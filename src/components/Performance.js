import React from 'react'

const Performance = (props) => {
  const id = props.data.getElementsByTagName("performanceid")[0].childNodes[0].nodeValue
  const url = props.data.getElementsByTagName("omniweb_url")[0].childNodes[0].nodeValue
  const date = url.match(/\d{4}([.\-/ ])\d{2}\1\d{2}/)[0]
  const showtimes = props.showtimes

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
  } else {
    throw Error('Cannot find Onmiweb XML file')
  }

  return (
    <tr className="performance">
      <td>{ date }</td>
      <td>
        {
          props.showtimes.map((showtime, i) => {
            return (
             <a href={`https://omniwebticketing.com/${ombiWebPath}/${url}`}
               target="_blank"
               className="button"
               key={i}>
               { showtime }
             </a>
            )
          })
        }
        <style jsx>{`
          td {
            padding: 6px 8px !important;
          }
          .button {
            background: #C7B299;
            color: #fff;
            padding: 4px 8px;
            text-decoration: none;
            font-weight: bold;
            margin-right: 5px;
          }
        `}</style>
      </td>
    </tr>
  )
}

export default Performance
