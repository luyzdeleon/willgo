// Add cb function to willgomap object
willGoMap.cbFn = function(latlong, geocodedInfo){
 console.log(latlong);
 console.log(geocodedInfo);
 document.getElementsByName("latlong")[0].value = latlong;
 document.getElementsByName("country")[0].value = geocodedInfo.country;
 document.getElementsByName("address")[0].value = geocodedInfo.address;
}

function getModel(){
 return {
   name: document.getElementsByName("name")[0].value,
   country: document.getElementsByName("country")[0].value,
   address: document.getElementsByName("address")[0].value,
   latlong: document.getElementsByName("latlong")[0].value
 }
}

function cancelForm(){
 document.getElementsByName("name")[0].value = '';
 document.getElementsByName("country")[0].value = '';
 document.getElementsByName("address")[0].value = '';
 document.getElementsByName("latlong")[0].value = '';
}

function saveCallback(){
 console.log(arguments);
 console.log('Saved successfully!');
 alert('Salvado exitosamente');
 cancelForm();
}

function saveForm(){
 var model = getModel(),
     tableName = 'preference';

 console.log(model);
 DBLayer.insert(tableName, model, saveCallback);
}

function getParameterByName(name) {
   console.error(name);
   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
       results = regex.exec(location.search);
   return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.onload = function(){
  console.log('Document is ready');
  //Initialize map object
  //willGoMap.initialize();
  console.log('After initialize');

  var mode = getParameterByName('mode');
  console.error(mode);
  if(mode){
    var object = {
      id: getParameterByName('id'),
      name: getParameterByName('name'),
      address: getParameterByName('address'),
      country: getParameterByName('country'),
      latlong: getParameterByName('latlong')
    };

    // Display map in detail mode
    var latlong = object['latlong'];
    latlong = latlong.replace('(', '');
    latlong = latlong.replace(')', '');
    var lat = latlong.split(',')[0],
        long = latlong.split(',')[1];
    willGoMap.goThere(lat, long);

    // Fill inputs for detail mode
    document.getElementsByName("name")[0].value = object['name'];
    document.getElementsByName("latlong")[0].value = object['latlong'];
    document.getElementsByName("country")[0].value = object['country'];
    document.getElementsByName("address")[0].value = object['address'];

    // hide the buttons
    var buttons = document.getElementsByClassName("btn");
    //console.error(buttons[0]);
    for(var i = 0; i < buttons.length; i++){
      buttons[i].style.display = 'none';
    }
  }
}
