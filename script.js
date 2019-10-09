let input;

$('button').on('click', () => {
   
//    replacing spaces and commas
    input = $('input').val().replace(/ /g, '+').replace(/,/, '%2C');
    console.log(input);
    
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input}&key=9167339d35614d2e9ab181b9b9d4247d`)
    .then(result => {
        // return result in javascript format
        return result.json();
    })
    .then(data => {
        // log the information into the console 
        console.log(data);
        // grab the coordinates
        coords = data.results[0].geometry.lat + ',' + data.results[0].geometry.lng;
        // console.log(coords);

        // run dark sky api
        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/067b63b5c1aacda95d760fe5327d2bce/${coords}`)
        // return result in javascript format
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
            $('#temp').html('Current Temp: ' + data.currently.temperature);
            $('#realFeel').html('Real Feel: ' + data.currently.apparentTemperature);
            $('#sumary').html('Summary: ' + data.hourly.summary);
        })
        .catch(error => {
            console.log(error);
        })
    })

    .catch(error => {
        // log error message to console if it doesn't work
        console.log(error);
    });


});

