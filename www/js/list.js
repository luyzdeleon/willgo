window.onload = function(){
  /*
  console.log(document.getElementById('side-menu').id);
  var snapper = new Snap({
    element: document.getElementById('side-menu')
  });
  console.log(snapper);*/

  console.log('reached event listener');
  var itemTpl = '<li class="table-view-cell media"><a class="navigate-right" onclick="window.location=\'add.html?{detailUrl}\'"><span class="media-object pull-left icon icon-pages"></span><div class="media-body">{name}</div><div>{address}</div></a></li>',
      listContent = '';

  //
  //console.log(itemContainer);

  var serialize = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }


  function retrieveCallback(elements, statement){
    console.log('reached callback');
    console.log(elements);
    console.log(statement);
    var itemContainer = document.querySelector('#interest-list');
    listContent = '';

    if(elements.length){
      for(index in elements){
        console.log(index);
        var currElement = elements[index];
        console.log(currElement);
        if(currElement){
          currElement['mode'] = 'detail';
          var detailUrl = serialize(currElement);
          console.error(detailUrl);
          listContent += itemTpl.format({
                    name: currElement['name'],
                    address: currElement['address'],
                    'detailUrl': detailUrl
                  });
        }
      }
      itemContainer.innerHTML = listContent;
    }else{
      console.log('No elements found');
      listContent = '<button style="width:100%;" class="btn btn-primary" onclick="window.location=\'add.html\';">Agregar mi primer interes</button>';
      document.querySelector('#empty-placeholder').innerHTML = listContent;
    }
  }

  // Returns a list of interests
  function retrieveInterests(){
    console.log('reached retrieveInterests');
    var result = [],
        tableName = 'preference',
        fieldsToSelect = ['id', 'name', 'country', 'address', 'latlong'];

    DBLayer.read(tableName, fieldsToSelect, retrieveCallback);
  }

  retrieveInterests();
}
