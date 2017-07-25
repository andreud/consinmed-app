function initDatabase() {
  //contenido
  var database = window.sqlitePlugin.openDatabase({name: 'mydb3.db', location: 'default', createFromLocation: 1});
  return database;
  //global scope
  //database = window.sqlitePlugin.openDatabase({name: 'mydb3.db', location: 'default', createFromLocation: 1});
}


var appGlobal = {

    // Application Constructor
    initialize: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

    	/**
    	 * Database
    	 */
    	//database = window.sqlitePlugin.openDatabase({name: 'mydb3.db', location: 'default', createFromLocation: 1});
    	/*
    	database = initDatabase();


    	// obtener marcas de db:
       	database.transaction(
	        function(transaction) {
	            transaction.executeSql( "SELECT * FROM marcas", [], function(transaction, rs) {
	                alert('Primer registro marcas: ' + JSON.stringify(rs.rows.item(0)) )
	                //alert('Notas item 2: ' + rs.rows.item(1).notas);
	            });
	        }, 
	        function(error) {
	            alert('SELECT error: ' + error.message)
	        }
	    )*/


    	/**
		 * Navbar Global 
		 */
		var templateNavbar = '<div><nav class="navbar navbar-toggleable-md fixed-top">'
		  +'<a class="navbar-brand" href="home.html">'
		    +'<img src="img/logo_lg.png" alt="" class="logo">'
		  +'</a>'
		+'</nav></div>'
		var Navbar = new Vue({
			el : '#Navbar',
			template : templateNavbar
		})


		/**
		 * Selector Clientes
		 */
		/*
		// Obtener Clientes de db
	    database.transaction(
	        function(transaction) {
	            transaction.executeSql( "SELECT * FROM clientes", [], function(transaction, rs) {
	                alert('Primer registro clientes: ' + JSON.stringify(rs.rows.item(0)) );
	                //alert('Notas item 2: ' + rs.rows.item(1).notas);
	            });
	        }, 
	        function(error) {
	            alert('SELECT error: ' + error.message);
	        }
	    );*/

	    // Vue selectorClientes
	    // var templateselectorClientes = '';
		var selectorClientes = new Vue({
			el: '#selectorClientes',
			//template: templateSelectorClientes,
			data:{
				clienteSeleccionado: ''
			},
			computed: {
				clientes: function() {
					
					return [
						{
							id : '1',
							razon_social: 'uno'
						},
						{
							id : '2',
							razon_social: 'dos'
						}
					]
				},

			}
		})

    }

};

appGlobal.initialize();




