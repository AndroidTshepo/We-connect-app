var map;
var service;


//After call back is successful
function callback(results, status) {
  console.log(results);

  for (var i = 0; i < results.length; i++) {

    var marker = new google.maps.Marker({
      position: results[i].geometry.location,
      map: map,
      icon: 'https://acsabsa.bankserv.co.za/activation/default/images/head_bank_logo.gif'
    });
//    if (status !== google.maps.places.PlacesServiceStatus.OK) {
//        console.error(status);
//        return;
//    }
//    for (var i = 0, result; result = results[i]; i++) {
//        addMarker(result);
//    }
  }
}


function performSearch() {
  var request = {
    //Restrict the search
    bounds: map.getBounds(),
    name: "ABSA " + "ATM"
  }
  //Receives the locations from the google map api
  service.nearbySearch(request, callback);
}

function initialise(location) {
  //Display the object so that i can see how to access the latitude and longitude
  console.log(location);

  //set global variable to reuse it any were
  var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
  var mapOptions = {
    // Here the function will create the google map that will be displayed
    //Use object to return latitude and location.coords.longitude
    center: currentLocation,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //Here i am placing the controllers using v3.22 controller
  google.maps.controlStyle = 'azteca';
  map = new google.maps.Map(document.getElementById("sab-map"), mapOptions);

  //The css for map
  map.set('styles', [
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {color: '#000000'},
        {weight: 1.6}
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        {saturation: -100},
        {invert_lightness: true}
      ]
    }, {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {hue: '#ffff00'},
        {gamma: 1.4},
        {saturation: 82},
        {lightness: 96}
      ]
    }, {
      featureType: 'poi.school',
      elementType: 'geometry',
      stylers: [
        {visibility: 'on'},
        {hue: '#fff700'},
        {lightness: -15},
        {saturation: 99}
      ]
    }
  ]);


  //Marking the location of the user
  var marker = new google.maps.Marker({
    position: currentLocation,
    map: map
    //title:"Hi user"


  });
  //Finding the nearby places
  service = new google.maps.places.PlacesService(map);

  //this ensures we wait untill the map bounds are initialised befored we perform the search
  google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
  //if its addListener only it will refresh on zoom in or out

}
//Methos to load the google map when the page loads
$(document).ready(function () {
  navigator.geolocation.getCurrentPosition(initialise);

});



/**
 * Created by Academy_Intern on 16/04/21.
 */
