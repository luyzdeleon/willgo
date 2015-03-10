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
var SelectAll = "SELECT * FROM preference";
var INSERT = "INSERT INTO {table}({columns}) values({wildcards})";
var update = "UPDATE preference set name=?,place=? where id=?";
var deletef = "DELETE from preference where id=?";

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
}

function updateFill(id) {
  db.transaction(function(tx) {
    var name = document.getElementById('name').value;
    var place = document.getElementById('place').value;
    tx.executeSql(update, [name, place, id]);
  });
}

function deleteFill(id) {
  db.transaction(function(tx) {
    tx.executeSql(deletef, [id]);
  });
}

/**
			callback is a Function with the signature:
			callback(elements)
			*/
function read(columns, callback) {

  db.transaction(function(tx) {
    tx.executeSql(SelectAll, [], function(tx, result) {
      var row = result.rows;
      for (var i = 0, item = null; i < row.length; i++) {
        item = row.item(i);
        element.push(item[column]);
      }
      callback(element);
    });
  });


}
