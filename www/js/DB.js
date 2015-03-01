




var CreateTable="CREATE TABLE IF NOT EXISTS preference(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, place TEXT)";
var SelectAll="SELECT * FROM preference";
var Insert="INSERT INTO preference(name, place) values(?, ?)";
var update="UPDATE preference set name=?,place=? where id=?";
var deletef="DELETE from preference where id=?";

if(window.openDatabase)var db=openDatabase("WilgoDB","1.0","test",20000);
else alert("no se pudo crear la bd");
 
 createTable();
	
 

		function createTable() {
			db.transaction(function(tx)
			{
				tx.executeSql(CreateTable,[]);
			});
		}
		 function insert() {
		 	var name=document.getElementById('name').value;
			var place=document.getElementById('place').value;
			//var coordinates=document.getElementById('coordinates').value;
			
		        db.transaction(function(tx) {
		          tx.executeSql(Insert, [name, place]);
		        });
		      }
		   function updateFill(id){
			db.transaction(function(tx){
			var name=document.getElementById('name').value;
			var place=document.getElementById('place').value;
				tx.executeSql(update,[name,place,id]);
			});
		}
		function deleteFill(id){
			db.transaction(function(tx){
				tx.executeSql(deletef,[id]);
			});
		}

		 