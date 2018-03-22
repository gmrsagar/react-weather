import React, { Component } from 'react'
import Titles from './Titles'
import Form from './Form'
import Weather from './Weather'
import Spinner from './Spinner'
const API_KEY = 'a6d41360192a58508baa647bfafc77ea'

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    fetchInProgress: false
  }

  getWeather = async (e) => {
    this.setState({fetchInProgress: true})
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
    const data = await api_call.json()
    if( city && country ) {
      console.log(data)
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: '',
        fetchInProgress: false
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        fetchInProgress: false,
        error: 'Please enter a correct value'
      })
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                <Titles/>
                </div>
                <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                {( this.state.fetchInProgress === true
                ? <Spinner/>
                : <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}/>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App