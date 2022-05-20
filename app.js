window.addEventListener('load', () => {
    //navigator.geolocation devuelve un objeto de geolocalizacion de solo lectura, que proporciona acceso web a la geolocalizacion
    let lon
    let lat

    let temperatureWorth = document.getElementById('temperature-worth')
    let temperatureDescription = document.getElementById('temperature-description')
    let ubication = document.getElementById('ubication')
    let iconAnimated = document.getElementById('icon-animated')
    let windSpeed = document.getElementById('wind-speed')

    if(navigator.geolocation){
        //con getCurrentPosition obtenemos todos los datos de nuestra localizacion
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            lon = position.coords.longitude
            lat = position.coords.latitude
            console.log(lon)

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=103b0e1348d3fec397bd0d2c05a16a43`;
            console.log(url)
            //usamos peticiones hacia la API usando fetch
            //fetch utiliza promesas  
            fetch(url)
            //vamos a indicar que trabajaremos en formato json
                .then(response => {return response.json()})
                //data devolvera los datos de la ciudad en el formato json
                .then(data => {
                    let temp =  data.main.temp
                    //lo mostramos en nuestro html con .textContent
                    tempCelcius = Math.round(temp - 273.15)
                    temperatureWorth.textContent = `${tempCelcius} *C`

                    let desc = data.weather[0].description
                    temperatureDescription.textContent = desc.toUpperCase()

                    ubication.textContent = data.name
                    windSpeed.textContent = `${data.wind.speed} m/s`
                    //icons static
                    let weatherIcon = data.weather[0].icon
                    const urlIcon = `http://openweathermap.org/img/wn/${weatherIcon}.png`
                    console.log(data)

                    //icons animated with svg
                    switch (data.weather[0].description) {
                        case 'clear sky':
                            iconAnimated.src = 'animated/day.svg'
                            console.log('clear')
                            break;
                        case 'few clouds':
                            iconAnimated.src = 'animated/cloudy-night-1.svg'
                            console.log('few clouds')
                            break;
                        case 'scattered clouds':
                            iconAnimated.src = 'animated/cloudy-night-2.svg'
                            console.log('scattered clouds')
                            break;
                        case 'overcast clouds':
                            iconAnimated.src = 'animated/cloudy-day-2.svg'
                            console.log('overcast clouds')
                            break;
                        case 'broken clouds':
                            iconAnimated.src = 'animated/cloudy-night-3.svg'
                            console.log('broken clouds')
                            break;
                        case 'shower rain':
                            iconAnimated.src = 'animated/rainy-7.svg'
                            console.log('shower rain')
                            break;
                        case 'rain':
                            iconAnimated.src = 'animated/rainy-4.svg'
                            console.log('rain')
                            break;
                        case 'thunderstorm':
                            iconAnimated.src = 'animated/thunder.svg'
                            console.log('thunderstorm')
                            break;
                        case 'snow':
                            iconAnimated.src = 'animated/snowy-6.svg'
                            console.log('snow')
                            break;
                        case 'mist':
                            iconAnimated.src = 'animated/cloudy.svg'
                            console.log('mist')
                            break;
                    
                        default:
                            break;
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }
})