$(function(){
	var map;
	var lat;
	var lng;

	function getIcon(nps){
		switch(nps){
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
				var flag = 'img/flag-red.png';
				return flag;
				break;
			case '7':
			case '8':
				var flag = 'img/flag-yellow.png';
				return flag;
				break;
			case '9':
			case '10':
				var flag = 'img/flag-green.png';
				return flag;
				break;
			default:
				var flag = 'img/flag-blue.png';
				return flag;
				break;
		}
	};

	function addInfoWindow(marker, message) {
            var info = message;

            var infoWindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        };

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
	      icon: 'img/tmxIcon.png',
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

		lat = position.coords.latitude;
		lng = position.coords.longitude;
		//Here I must call to the check-in REST service
	  	$.ajax({
	  		type: "POST",
	  		url: "http://localhost:4567/checkIn",
	  		data: { nombre: 'FielderId1512', id: "15121988", latitud: position.coords.latitude, longitud: position.coords.longitude }
	  	}).done(function(msg){
	  		console.log(msg);
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
	      icon: 'img/register.png',
	      title: 'Fielder'
	  	});

	  	google.maps.event.addListener(fielder, 'click', function() {
	  		infowindow.open(map,fielder);
	  	});

	};

	var getPoints = function(position){

		lat = position.coords.latitude;
		lng = position.coords.longitude;

		$.ajax({
			type: "POST",
			url: "http://localhost:4567/getPoints",
			data: {latitud: lat, longitud: lng, distancia: 3}
		}).done(function(data){

			var data = JSON.parse(data);
			//console.log(data.length);

			var fielderLocation = new google.maps.LatLng(lat, lng);
			map.setCenter(fielderLocation);

			var fielder = new google.maps.Marker({
		      position: fielderLocation,
		      map: map,
		      icon: 'img/register.png',
		      title: 'Telmex'
		  	});


			for(i = 0;i<data.length;i++){
					//Marker + infowindow + angularjs compiled ng-click
					var contentString = "<div><p>Nombre: "+data[i].nombre+"</p>"+
										"<p>Teléfono: "+data[i].telefono+"</p>"+
										"<p>Área: "+data[i].area+"</p>"+
										"<p>División: "+data[i].division+"</p>"+
										"<p>NPS: "+data[i].nps+"</p>"+
										"<p>Tenencia: "+data[i].paquete+"</p>"+
										"<button class='button icon ion-location button-balanced'>Respuesta Cliente</button></div>";

					//var compiled = $compile(contentString)($scope);
					//var compiled = contentString;
					//$('.footer').append(contentString);
					var customareLocation = new google.maps.LatLng(data[i].latitud, data[i].longitud);
					var infowindow = new google.maps.InfoWindow({
						content: contentString
					});


					var customare = new google.maps.Marker({
					    position: customareLocation,
					    map: map,
					    title: 'Cliente',
					    icon: getIcon(data[i].nps)
					  	});

					addInfoWindow(customare,contentString);
				}
			
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
		navigator.geolocation.getCurrentPosition(getPoints, onError);
	});
});