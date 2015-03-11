var willGoMap = {
	map: null,
    container: "MapContainer",
    marker: null,
    mapProperty:{
    	center: new google.maps.LatLng(18.49333,-69.86867),
    	zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    initialize: function(){
                     
        //determino el contenedor en caso de que no se haya hecho
        willGoMap.container = (willGoMap.container)? document.getElementById(willGoMap.container) : document.body;
                     
        //si el tamaño del elemento que contiene el mapa dentro es 0, este tomara todo la pantalla
        if(willGoMap.container.parentNode.offsetHeight < 50)
            willGoMap.container.parentNode.style.height = screen.availHeight+"px";
        else
           willGoMap.container.style.height = willGoMap.container.parentNode.offsetHeight+"px";
         // console.log(willGoMap.container.parentNode.offsetHeight, screen.height, screen.availHeight)
                     
        //creo el mapa y los guardo en la variable map
        willGoMap.map = new google.maps.Map(willGoMap.container, willGoMap.mapProperty);

        //si se agrega la clase de returnPositionWhenClick al mapa
        if(document.getElementsByClassName("returnPositionWhenClick").length > 0)
            google.maps.event.addDomListener(willGoMap.map,"click",willGoMap.returnPositionWhenClick);


        /*****  SOLO HAGO ESTO AQUI, PARA QUE SE AGREGUEN ESTAS AL CSS DEL ARCHIVO add,html LUEGO Y NO TENER QUE 
        		MANDAR MAS DE UN ARCHIVO  *****/
        		document.getElementById("ClickAddress").style.color = "grey";
        		document.getElementById("ClickAddress").style.fontSize = "1em";

    },
    returnPositionWhenClick: function(event){
    	document.getElementById("ClickAddress").innerHTML  = event.latLng+"  ";

    	//si existe el marker, lo borra y lo vuelve a crear en la nueva posicion
        if(willGoMap.marker){
        	// document.getElementById("ClickAddress").innerHTML  += " - "+willGoMap.marker.getPosition()+" - "
            willGoMap.marker.setMap(null)
            willGoMap.marker.setVisible(false);
        }

        willGoMap.marker = new google.maps.Marker({
         	position: event.latLng,
         	map: willGoMap.map,	
        });

         willGoMap.geocodePosition(willGoMap.marker.getPosition())
        // document.getElementById("ClickAddress").innerHTML  += willGoMap.marker.getPosition()
    },
    geocodePosition: function (posicion) {
	   geocoder = new google.maps.Geocoder();

	   if(geocoder){
   		geocoder.geocode({"latLng":posicion},function(results,status){
   							
   			if(status == google.maps.GeocoderStatus.OK){
   				
   				for(var i=0; i<results[0].address_components.length; i++){
   				   document.getElementById("ClickAddress").innerHTML  += "<b>"+(results[0].address_components[i].long_name)+",</b> ";
   				}
   			}else{
   				document.getElementById("ClickAddress").innerHTML  =("Could not found this posicion: "+status);
   			}
   				
   		});
   	}
	}
}

google.maps.event.addDomListener(window, 'load', willGoMap.initialize);