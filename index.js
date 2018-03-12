const request = require('request');

module.exports = class botUber {
	constructor (lng, lat) {
		this.lng = lng;
		this.lat = lat;
	}

	init(callback){
    const callDestPosition = (query, callback) => {
      const destinations = [];
      const params = {
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=paris+8&key=AIzaSyD_cHHLJDfVdhAMorhXUu_-CEJu9FcJGrc', 
        json: true
      }

      request(params, (err, res, json) => {
        if (err) {
          throw err;
        }

        for (let i = 0; i <1 ; i += 1){
          destinations.push(json.results[0].geometry.location);
        }
        callback(destinations);
      });

      return;
    }

    callDestPosition('dest', destinations => {
      console.log('dessssss' , destinations[0].lat);
      var options = {
        method: 'GET',
        url: 'https://api.uber.com/v1.2/estimates/price',
        qs: {
          start_longitude: this.lng,
          start_latitude: this.lat, 
          end_latitude: destinations[0].lat,
          end_longitude: destinations[0].lng
        },
        headers:{
          'Authorization': 'Token ' + 'aBxZ-6xJF5xCegAjjXXSMNCy_fI0SCKXbPq86PkZ',
          'Accept-Language': 'en_US',
          'Content-Type':  'application/json'
        } 
      };

      request(options, function (error, response, body) {
        if (error) return  console.error('Failed: %s', error.message);

        else {
          let jsonUber = JSON.parse(body);
          let tableau=  [];
          tableau.push(destinations, jsonUber.prices);
          console.log('tableau',  tableau);
          callback(tableau);
          return (tableau); 
        }
      });
    });
  }

  echo () {
    var sync = true;

    this.init(result => {
      console.log('result', result)
     this.setJson(result);
     sync = false;
   });
    while (sync) {
     require('deasync').sleep(100);
   }
 }

 setJson (json) {
  this.json = json;
}

getJson () {
  return this.json;
}
getIdVideo (i) {
  return this.json.items[i].id.videoId;
}
}


