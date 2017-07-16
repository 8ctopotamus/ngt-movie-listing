import React from 'react'

const Performance = (props) => {
  const id = props.data.getElementsByTagName("performanceid")[0].childNodes[0].nodeValue
  const url = props.data.getElementsByTagName("omniweb_url")[0].childNodes[0].nodeValue
  const date = url.match(/\d{4}([.\-/ ])\d{2}\1\d{2}/)[0]
  const showtimes = props.showtimes

  return (
    <tr className="performance">
      <td>{ date }</td>
      <td>
        {
          props.showtimes.map((showtime, i) => {
            return (
             <a href={`https://omniwebticketing.com/avalon/${url}`}
               target="_blank"
               className="button">
               { showtime }
             </a>
            )
          })
        }
        <style jsx>{`
          td {
            margin-bottom: 20px;
          }
          .button {
            background: #C7B299;
            color: #fff;
            padding: 4px 8px;
            text-decoration: none;
            font-weight: bold;
          }
        `}</style>
      </td>
    </tr>
  )
}

export default Performance
