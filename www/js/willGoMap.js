var willGoMap = {
  map: null,
  container: "MapContainer",
  marker: null,
  mapProperty: {
    center: new google.maps.LatLng(18.49333, -69.86867),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  },
  latlong: 'test',
  geocodedInfo: 'test',
	//Callback function used to return the values gotten from the map latlong and geocoded info
  cbFn: function() {},
  initialize: function() {

    //determino el contenedor en caso de que no se haya hecho
    willGoMap.container = (willGoMap.container) ? document.getElementById(willGoMap.container) : document.body;

    //si el tamaño del elemento que contiene el mapa dentro es 0, este tomara todo la pantalla
    if (willGoMap.container.parentNode.offsetHeight < 50)
      willGoMap.container.parentNode.style.height = screen.availHeight + "px";
    else
      willGoMap.container.style.height = willGoMap.container.parentNode.offsetHeight + "px";
    // console.log(willGoMap.container.parentNode.offsetHeight, screen.height, screen.availHeight)

    //creo el mapa y los guardo en la variable map
    willGoMap.map = new google.maps.Map(willGoMap.container, willGoMap.mapProperty);

    //si se agrega la clase de returnPositionWhenClick al mapa
    if (document.getElementsByClassName("returnPositionWhenClick").length > 0)
      google.maps.event.addDomListener(willGoMap.map, "click", willGoMap.returnPositionWhenClick);
  },
  returnPositionWhenClick: function(event) {
// 		console.log(event.latLng);
    //willGoMap.latLong = event.latLng[k] + "," + event.latLng[D];
// 		console.log(willGoMap.latLong);

    //si existe el marker, lo borra y lo vuelve a crear en la nueva position
    if (willGoMap.marker) {
      willGoMap.marker.setMap(null)
      willGoMap.marker.setVisible(false);
    }

    willGoMap.marker = new google.maps.Marker({
      position: event.latLng,
      map: willGoMap.map,
    });

    willGoMap.geocodePosition(willGoMap.marker.getPosition());
		//Callback with (latlong, geocodedInfo)
		
  },
  geocodePosition: function(position) {
		willGoMap.geocodedInfo = '';
    geocoder = new google.maps.Geocoder();

    if (geocoder) {
      geocoder.geocode({
        "latLng": position
      }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

         willGoMap.geocodedInfo = results[0].address_components;
         //para mandar la direccion en string
      //     for (var i = 0; i < results[0].address_components.length; i++) {
						// willGoMap.geocodedInfo += results[0].address_components[i].long_name;
      //     }
        } else {
					willGoMap.geocodedInfo = "No se pudo conseguir la direccion";
        }

         willGoMap.latlong = position;
         willGoMap.cbFn(willGoMap.latlong, willGoMap.geocodedInfo);
      });
    }
  }
}

google.maps.event.addDomListener(window, 'load', willGoMap.initialize);
