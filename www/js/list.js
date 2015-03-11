var itemTpl = '<li class="table-view-cell media"><a class="navigate-right"><span class="media-object pull-left icon icon-pages"></span><div class="media-body">{name}</div><div>{address}</div></a></li>',
    itemContainer = null,
    listContent = '';

itemContainer = document.getElementById('interest-list')[0];

function retrieveCallback(elements){
  listContent = '';
  for(index in elements){
    var currElement = elements[index];
    listContent += itemTpl.format({name: currElement['name'], address: currElement['address']});
  }
  itemContainer.innerHTML = listContent;
}

// Returns a list of interests
function retrieveInterests(){
  var result = [],
      tableName = 'preference',
      fieldsToSelect = ['name', 'country', 'address', 'latlong'];

  DBLayer.read(tableName, fieldsToSelect, retrieveCallback);
}
