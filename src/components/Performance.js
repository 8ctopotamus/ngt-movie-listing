import React from 'react'

const Performance = (props) => {

  console.log(props)

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
      <td>{ props.data.date }</td>
      <td>
        {
          props.data.showtimes.map((item, i) => {
            return (
             <a href={`https://omniwebticketing.com/${ombiWebPath}/${item.url}`}
               target="_blank"
               key={i}>
               { item.showtime }
             </a>
            )
          })
        }
        <style jsx>{`
          td {
            padding: 6px 8px !important;
          }
          a {
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
