const express = require('express')
const geocode = require('./geocode')
const axios = require ('axios')

const app=express()

app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('inputDemo')
    })

    app.get('/weather',(req,res)=>{
        let city=req.query.city
        console.log(city)
        geocode(city,(error,{latitude,longitude,location})=>{
            if(error)
            {
        return res.send({error})
            }
            console.log('latitude.... : '+latitude)
            console.log('longitude.... : '+longitude)

            var url=`https://api.openweathermap.org/data/2.5/weather?`+`lat=${latitude}&lon=${longitude}&units=metric&appid=84ecc8a5640d21ad905c482ae8fdaf45`

            axios({
                method:'get',
                url:url
            }).then((response)=>{
                const weatherData = response.data;
                console.log(weatherData)
                const temperature = weatherData.main.temp_min;
                const humidity = weatherData.main.humidity;
                const windSpeed = weatherData.wind.speed;
                const temp_min = weatherData.main.temp_min;
                const temp_max= weatherData.main.temp_max;
                const pressure = weatherData.main.pressure;
                

               // console.log(`Temperature : ${temperature}℃`);
               //console.log(`Humidity : ${humidity}%`);
            //console.log(`Wind Speed : ${windSpeed}kph`);
                res.render("location.ejs",{
                    city:city,
                    temperature: temperature,
                    humidity: humidity,
                    windSpeed: windSpeed,
                    temp_min: temp_min,
                   temp_max: temp_max,
                   pressure: pressure,
                   
                });
            });
        });
    console.log(geocode.weatherDetails);
    });
    app.listen(3000,()=>{
        console.log('Server is listening on port 3000')
    })