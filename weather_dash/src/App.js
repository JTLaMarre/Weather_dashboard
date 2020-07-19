import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [city, setcity] = useState("");
    const [lat, setlat] = useState("");
    const [lon, setlon] = useState("");
    const [Cities, setCities] = useState([])
    const [temp, settemp] = useState("");
    const [Humidity, setHumidity] = useState("");
    const [WindSpeed, setWindSpeed] = useState("");
    const [IconSrc, setIconSrc] = useState("")
    

    
    return (
       <div className="container">
        <div className="row">
            <div className="col-12 text-center">
                <h1 className="bg-dark text-white">Weather Dashboard</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-4 mr-auto" id="search_history">
                <form>
                    <label for="search">Search for a City: </label>
                    <input type="text" name="search" onChange={event => setcity(event.target.value)}></input>
                    <button type="submit" className='btn btn-primary'><i className="fas fa-search"></i></button>
                </form>
                <form id="search_display">
                    <p>Search History</p>
                </form>
            </div>
            <div className="col-8 mr-auto text-center justify-content-left">
                <div id='currentCity'>
                    <h1 id="CityName">Current City Forecast</h1>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather icon" id="Icon"></img>
                    <p id='currentTemp'></p>
                    <p id='currentHumidity'></p>
                    <p id='currentWindSpeed'></p>
                    <p  id='UVindex'></p>
                </div>
                <div className="row">
                    <div className="col-12">
                    <h1>5-Day Forecast</h1>
                    </div>
                </div>
                <div className="row">
                    <div  className="col-2 text-center text-white bg-primary mr-auto border">
                        <h2>Day 1</h2>
                        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather icon" id="Daily1Icon"></img>
                        <p id='day1Temp'></p>
                        <p id='day1Humidity'></p>
                        </div>
                        <div className="col-2 text-center text-white bg-primary mr-auto border">
                        <h2>Day 2</h2>
                        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather icon" id ="Daily2Icon"></img>
                        <p id='day2Temp'></p>
                        <p id='day2Humidity'></p>
                        </div>
                        <div className="col-2 text-center text-white bg-primary mr-auto border">
                        <h2>Day 3</h2>
                        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather icon" id ="Daily3Icon"></img>
                        <p id ='day3Temp'></p>
                        <p id ='day3Humidity'></p>
                        </div>
                        <div className="col-2 text-center text-white bg-primary mr-auto border ">
                        <h2>Day 4</h2>
                        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather icon" id ="Daily4Icon"></img>
                        <p id ='day4Temp'></p>
                        <p id ='day4Humidity'></p>
                        </div>
                        <div className="col-2 text-center text-white bg-primary mr-auto border">
                        <h2>Day 5</h2>
                        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather icon" id ="Daily5Icon"></img>
                        <p id ='day5Temp'></p>
                        <p id ='day5Humidity'></p>
                        </div>
                        <div className="col-2"></div>
                </div>
            </div>
        </div>
    </div>

  );
}

export default App;
