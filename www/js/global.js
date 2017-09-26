var apiBaseUrl = 'http://consinmed-panel.herokuapp.com/api/'

/**
 * Database
 */
function initDatabase() {
  var database = window.sqlitePlugin.openDatabase({name: 'mydb23.db', location: 'default', createFromLocation: 1});
  //database = window.sqlitePlugin.openDatabase({name: 'mydb3.db', location: 'default', createFromLocation: 1});
  return database;
}

function errorTransactionGeneral(error) {
    alert('Error General Base de Datos: ' + error.message)
}


/**
 * Utilidades, Vue Filters 
 */
function checkConnection() {
    var networkState = navigator.connection.type;
    return networkState!='none'

    /*var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    alert('Connection type: ' + states[networkState]);*/
}

function formatoDinero(x) {
    
    if(!x) {return 0.0}

    //parseFloat(x)

    //xf = x.toFixed(2)
    xf = parseFloat(x).toFixed(2)
    
    var parts = xf.toString().split(".");
    

    //var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    if(!parts[1]) {
      parts[1] = '00'
    } else if(parts[1].length==1) {
      parts[1] = parts[1]+'0'
    } 
    //return parts.join(",") + ' | ' + typeof(xf) + ' | ';
    return parts.join(",")
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
		 * Navbar Global 
		 */
		var templateNavbar = '<div><nav class="navbar navbar-toggleable-md fixed-top">'
		  +'<a class="navbar-brand" href="home.html">'
		    +'<img src="img/logo_nb.png" alt="" class="logo">'
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




