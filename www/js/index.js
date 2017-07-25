var app = {

    // Application Constructor
    initialize: function() {        
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //  Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        
        //this.receivedEvent('deviceready');

        /*
        
        //window.sqlitePlugin.echoTest(function() { alert('ECHO test OK'); });
        //window.sqlitePlugin.selfTest(function() { alert('SELF test OK'); });

        var db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
        db.transaction(function(tr) {
            tr.executeSql("SELECT upper('Test string') AS upperString", [], function(tr, rs) {
              alert('Got upperString result: ' + rs.rows.item(0).upperString);
            });
        });
        */

        // de demo starter app
        /*database = window.sqlitePlugin.openDatabase({name: 'sample.db', location: 'default', createFromLocation: 1});
        database.transaction(
            function(transaction) {
                transaction.executeSql('SELECT * FROM SampleTable', [], function(ignored, resultSet) {
                    alert('FIRST RECORD: ' + JSON.stringify(resultSet.rows.item(0)));
                });
            }, 
            function(error) {
                alert('SELECT error: ' + error.message);
            }
        );*/
        //navigator.notification.alert('after1');


        /*database = window.sqlitePlugin.openDatabase({name: 'mydb2.db', location: 'default', createFromLocation: 1});
        database.transaction(
            function(transaction) {
                transaction.executeSql( "SELECT * FROM pedidos", [], function(transaction, rs) {
                    alert('Primer registro: ' + JSON.stringify(rs.rows.item(0)) );
                    //alert('Notas item 2: ' + rs.rows.item(1).notas);
                });
            }, 
            function(error) {
                alert('SELECT error: ' + error.message);
            }
        );*/


        // Transaction error callback
        /*function errorCB(err) {
            alert("Error processing SQL: "+err.error );
            console.log('err');
            console.log(err);
        }*/

      //  });

          
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }




};

app.initialize();