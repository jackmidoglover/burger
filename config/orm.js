const connection = require('./connection');

// create ??? for length of passed in values
    // which should probably only be 2, 
    // but maybe it's good practice to make these things
    //dynamic...
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  };

//convert objects to sql syntax...
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
        // don't think we've talked about this type of loop
        //though it is in eloquent javascript
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  };

const orm = {
    selectAll: function(input, cb){
        let queryString = "SELECT * FROM " + input + ";";
        connection.query(queryString, function(err, burger){
            if (err){
               throw err; 
            } 
            cb(burger);
        })
    
    }, 
    insertOne: function(table, cols, vals, cb){
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, function(err, results){
            if (err){throw err};
            cb(results);
        })
    },
    updateOne: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
    }
};

module.exports = orm;