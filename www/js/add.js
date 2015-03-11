// Add cb function to willgomap object
willGoMap.cbFn = function(latlong, geocodedInfo){
  console.log(latlong);
  console.log(geocodedInfo);
  console.log(willGoMap.latlong);
  console.log(willGoMap.geocodedInfo);
  document.getElementsByName("latlong")[0].value = latlong;
  document.getElementsByName("country")[0].value = geocodedInfo;
  document.getElementsByName("address")[0].value = geocodedInfo;
}

function getModel(){
  return {
    name: document.getElementsByName("name")[0].value,
    country: document.getElementsByName("country")[0].value,
    address: document.getElementsByName("address")[0].value,
    latlong: document.getElementsByName("latlong")[0].value
  }
}

function saveCallback(){
  console.log(arguments);
  console.log('Saved successfully!');
}

function saveForm(){
  var model = getModel(),
      tableName = 'preference';

  DBLayer.insert(tableName, model, saveCallback);
}

function cancelForm(){
  document.getElementsByName("name")[0].value = '';
  document.getElementsByName("country")[0].value = '';
  document.getElementsByName("address")[0].value = '';
  document.getElementsByName("latlong")[0].value = '';
}
