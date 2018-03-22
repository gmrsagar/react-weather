import React from 'react'

const Weather = props => (
  <div className="weather__value">
    { props.city && props.country && <p>Location: {props.city}, {props.country}</p> }
    { props.temperature && <p>Temperature: {props.temperature}</p> }
    { props.humidity && <p>Humidity: {props.humidity}</p> }
    { props.description && <p>Description: {props.description}</p> }
    { props.error && <p>{props.error}</p>}
  </div>
  )

export default Weather