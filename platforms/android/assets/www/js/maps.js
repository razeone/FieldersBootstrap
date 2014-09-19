var map;
function initializeMap() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(19.435092,-99.166632)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initializeMap);

