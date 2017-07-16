import React from 'react'

const Performance = (props) => {
  // console.log(props)

  const id = props.data.getElementsByTagName("performanceid")[0].childNodes[0].nodeValue
  return (
    <h4>Performance { id }</h4>
  )
}

export default Performance
