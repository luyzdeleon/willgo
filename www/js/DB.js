// Dependency to the DB Layer
String.prototype.format = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

var CreateTable = "CREATE TABLE IF NOT EXISTS preference(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, place TEXT)";
var SELECT="SELECT {columns} FROM {table}";
var INSERT = "INSERT INTO {table}({columns}) values({wildcards})";

if (window.openDatabase) {
  var db = openDatabase("WilgoDB", "1.0", "test", 20000);
} else {
  alert("no se pudo crear la bd");
}

createTable();



			function createTable() {
			  db.transaction(function(tx) {
			    tx.executeSql(CreateTable, []);
			  });
			}


			// {key:value}
			// cb: callback function(tx, result)
			function insert(table_name, fields, cb) {
			  
			  	var keys = Object.keys(fields),
			      columns = keys.join(','),
			      values = [],
			      statement = '',
			      wildcards = [];

			  for(key in fields){
			    values.push(fields[key]);
			    wildcards.push('?');
			  }

			  wildcards = wildcards.join(',');
			  statement = INSERT.format({'columns': columns, 'wildcards': wildcards, 'table': table_name});


			  db.transaction(function(tx) {
			  	
			    tx.executeSql(statement, values,cb);
			  });

			 //table name, old fields, new fields and callback
			function updatefills(table_name, old_fields,new_fields, cb) {
			  
			  	var keys = Object.keys(new_fields),
			      values = [],
			      statement = '';
			     statement = 'UPDATE '+table_name+' set ';
			     
				  for(key in new_fields){
				    values=new_fields[key];
					statement+=key;
					statement+="=";
					statement+="'";
					statement+=values;
					statement+="'";
					statement+=", ";
				  }
				  statement=statement.slice(0,statement.length-2);
				  statement+=' WHERE ';
				  keys=Object.keys(old_fields);
				  for(key in old_fields){
				  	values=old_fields[key];
				  	statement+=key;
				  	statement+="=";
				  	statement+="'";
				  	statement+=values;
				  	statement+="'";
				  	statement+=' AND ';
				  }

				  statement=statement.slice(0,statement.length-4);
				  db.transaction(function(tx) {
				  	
				    tx.executeSql(statement,cb);
				   
			  });
}
			
			function deleteFill(table_name, fields, cb) {
			  
			  	var keys = Object.keys(fields),
			      values = [],
			      statement = '';
			     statement = 'DELETE FROM '+table_name+' WHERE ';
			     
				  for(key in fields){
				    values=fields[key];
					statement+=key;
					statement+="=";
					statement+="'";
					statement+=values;
					statement+="'";
					statement+=" AND ";
				  }
				  statement=statement.slice(0,statement.length-4);

				  db.transaction(function(tx) {
				  	
				    tx.executeSql(statement,cb);
				   
			  });
}

			/**
			{key:value}
			callback is a Function with the signature:
			callback(elements)
			*/
			function readElements(table_name, fields, callback){

				var keys = Object.keys(fields),
			      columns = keys.join(','),
			      statement = '',
			      elements=[];
	
				  statement = SELECT.format({'columns': columns, 'table': table_name});

				db.transaction(function(tx){
					tx.executeSql(statement,[],function(tx,result){
					var row=result.rows;
					for(var i=0, item=null; i<row.length;i++){
						item=row.item(i);
						elements.push(item);
					}
					callback(elements);
				});
			});
				
		}
