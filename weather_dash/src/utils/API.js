import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY= '&appid=63e2ab79c455ba5a3ee05762c641f525';

export default {
getWeather:function(query){
    return( axios.get(BASE_URL + query + API_KEY));
},
getUV: function(lat,lon){
    const UV_Url = 'https://api.openweathermap.org/data/2.5/uvi/forecast?';
return(axios.get(UV_Url+API_KEY+lat+'&lon='+lon + '&cnt=1'));
},
getSevenDay: function(lat,lon){
    const SEVEN_URL='https://api.openweathermap.org/data/2.5/onecall?lat=';
    return (axios.get(SEVEN_URL + lat + '&lon=' + lon + '&exclude={part}'+API_KEY))
}

}