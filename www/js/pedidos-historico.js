/**
 * Controller y Vue de Pagina Catalogo
 */
function historicoPedidosCtrl() {
    
        
    
    // arbol data para Vue
	var dataHistoricoPedidos = {
        pedidos: dataPedidos
    }


    /**
     * Catalogo Marca
     *
     * @type       Vue Root
     */
	var HistoricoPedidosVue = new Vue({

	    el: "#HistoricoPedidosVue",
	    
	    data: dataHistoricoPedidos,

	    methods: {
	    	irAPedido: function(idPedido) {
	    		localStorage.setItem('idPedidoVer',idPedido);
	    		window.location.href = "pedido-guardado.html";
	    	}
	    }
	    
	   
	})






}







/**
 * Cordova App
 *
 * @type       {<type>}
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
          
         historicoPedidosCtrl(); 

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
    
       

        //console.log( window.sqlitePlugin );
       
       /* window.sqlitePlugin.echoTest(function() {
            console.log('ECHO test OK');
        })*/
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




}

app.initialize()