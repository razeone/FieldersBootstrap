$(function(){
	var map;

	function initializeMap() {

		var telmexLatLng = new google.maps.LatLng(19.435092,-99.166632)
	  	var mapOptions = {
	    zoom: 15,
	    center: telmexLatLng
  	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);

	   var contentString = '<div id="content">'+
	   		'<p>Corporativo Telmex: Parque Vía 190</p>'
	      '</div>';

	  var infowindow = new google.maps.InfoWindow({
	      content: contentString
	  });

	  var marker = new google.maps.Marker({
	      position: telmexLatLng,
	      map: map,
	      icon: '../img/tmxIcon.png',
	      title: 'Telmex'
	  });
	  google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map,marker);
	  });


	}

	google.maps.event.addDomListener(window, 'load', initializeMap);

	// onSuccess Callback
	// This method accepts a Position object, which contains the
	// current GPS coordinates
	//
	var checkIn = function(position) {
		/*
	    alert('Latitude: '          + position.coords.latitude          + '\n' +
	          'Longitude: '         + position.coords.longitude         + '\n' +
	          'Altitude: '          + position.coords.altitude          + '\n' +
	          'Accuracy: '          + position.coords.accuracy          + '\n' +
	          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	          'Heading: '           + position.coords.heading           + '\n' +
	          'Speed: '             + position.coords.speed             + '\n' +
	          'Timestamp: '         + position.timestamp                + '\n');
	*/
		var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		//Here I must call to the check-in REST service
	  	$.ajax({
	  		type: "POST",
	  		url: "http://localhost:4567/checkIn",
	  		data: { nombre: 'FielderId1512', id: "15121988", latitud: position.coords.latitude, longitud: position.coords.longitude }
	  	}).done(function(msg){
	  		console.log('Success');
	  	});

		map.setCenter(myLatLng);

		 var contentString = '<div id="content">'+
	   		'<p>Aquí está usted</p>'
	      '</div>';
	     var infowindow = new google.maps.InfoWindow({
	      content: contentString
	      });

		var fielder = new google.maps.Marker({
	      position: myLatLng,
	      map: map,
	      icon: '../img/register.png',
	      title: 'Telmex'
	  	});

	  	google.maps.event.addListener(fielder, 'click', function() {
	  		infowindow.open(map,fielder);
	  	});

	};

	// onError Callback receives a PositionError object
	//
	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}


	$('#checkIn').click(function(){
		navigator.geolocation.getCurrentPosition(checkIn, onError);
	});

	$('#getPoints').click(function(){
		
	});
});