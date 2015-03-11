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

  DBLayer.insert(tableName, model, saveCallback);
}
