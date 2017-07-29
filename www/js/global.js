function initDatabase() {
  //contenido
  var database = window.sqlitePlugin.openDatabase({name: 'mydb6.db', location: 'default', createFromLocation: 1});
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
    	//database = initDatabase();


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


    }

};

appGlobal.initialize();




