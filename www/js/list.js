var list = {
   container: null,
   json: null,
   init: function(idContainer, jsonData){
      this.container = (idContainer)? document.getElementById(idContainer): document.body;
      this.json = jsonData;
      this.display();
   },
   display: function(){
      if(this.container && this.json){
         
         this.container.innerHTML = "";
         for(var i=0; i<json.length; i++){
            this.container.innerHTML += '<li class="table-view-cell media">'+
                '<a class="navigate-right">'+
                  '<span class="media-object pull-left icon icon-pages"></span>'+
                  '<div class="media-body" style="color:blue; font-weight: bold;"><b>'+this.json[i].interes+'</b></div>'+
                  '<div>'+this.json[i].address+'</div></a></li>';
         }
         
      }else if(!this.json){//Mensaje que se muestra cuando no se envian los datos
         this.container.innerHTML += "<h4 style='color:#A00C09;'>Error cargando los datos.</h4>";
      }else{//Mensaje que se muestra cuando no se especifica el contenedor
         var el =  document.createElement("div")
         el.id="listContainer";
         el.innerHTML = "<h4 style='color:#A00C09;'>Error, no se ha especificado el contenedor de la lista.</h4>";
         document.body.appendChild(el);
      }
      
   }
}

var json = [
   {
      interes:"Mi casa",
      country:"DO - Republica Dominicana",
      address:"Avenida Venezuela, Santo Domingo Este,  Santo Domingo",
      latLng: "18.49922652822951, -69.86824035644531"
   },{
      interes:"Universidad",
      country:"DO - Republica Dominicana",
      address:"Avenida de Los Próceres, Jardines del Norte,  Los Jardines, Santo Domingo",
      latLng: "18.48811566302335, -69.96299743652344"
   },{
      interes:"Trabajo",
      country:"DO - Republica Dominicana",
      address:"Avenida Abraham Lincoln, La Julia,  Distrito Nacional",
      latLng: "18.48811566302335, -69.96299743652344"
   }
]

window.onload = function(){
   list.init("listContainer",json)
}