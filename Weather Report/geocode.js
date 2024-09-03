const request = require('request')

const geocode = (address,callback)=>{
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${address}&appid=84ecc8a5640d21ad905c482ae8fdaf45`

    console.log(url)
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }
        else{
            console.log('from geocode....'+JSON.stringify(body[0]))
            callback(undefined,{
                address:body[0].name,
                latitude:body[0].lat,
                longitude:body[0].lon
            });
        }
    })
}
module.exports=geocode