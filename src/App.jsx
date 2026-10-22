import React,{useState} from 'react'
import axios from 'axios'

const App = () => {
  let[state,setState] = useState({
    city:"",
    details:"",
    status:""
  })

  console.log(state)
  let myKey = "9e7d25a9b97e19ad9623215ef9b4e377"
  
  function handleChange(e){
    let {name,value} = e.target
    setState({...state,[name]:value})
  }
  
  async function handleSubmit(){
    try{
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${state.city}&appid=${myKey}`)
      console.log(response)
      setState({...state,details:response.data,status:response.status})
    }
    catch(e){
      console.log(e)
      setState({...state,details:"data not found",status:404})
    }
  }

  return (
    <div>
      <input type="text" onChange={handleChange} value={state.city} name="city" id="" placeholder='Enter the city name: '/><br />
      <button type="submit" onClick={handleSubmit}>Submit</button>
      
      {state.status===200 && <div>
        <h1>City Name: {state.details.name}</h1>
        <h1>Temperature: {parseInt(state.details.main.temp - 273)}</h1>
        <h1>Wind Speed: {state.details.wind.speed} kmph</h1>
        <h1>Climate: {state.details.weather[0].main}</h1>
      </div>}

    </div>
  )
}

export default App
