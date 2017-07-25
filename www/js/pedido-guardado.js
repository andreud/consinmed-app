function pedidoGuardadoCtrl(){


    var idPedido = localStorage.getItem("idPedidoVer")
    var pedido = _.find(dataPedidos, {id:idPedido})
   /* var idMarca = localStorage.getItem("marcaCatalogo")
    //var productosSelecMarca = localStorage.getItem("productosSelecMarca")
    var productosSelecMarca = JSON.parse(localStorage.getItem("productosSelecMarca"))
       
    var 
    var marca = _.find(listaMarcasData, {'id': idMarca})


    var pedidoActualDataStorage = {
        marca: marca.nombre,
        familias: productosSelecMarca
    }*/


	new Vue({

		el : '#pedidoGuardadoVue',

		//'template' : 
		
		data: {
            pedido: pedido
        }

	})


}


/**
 * Cordova App
 *
 * @type       Object
 */
var app = {
    // Application Constructor
    initialize: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
          
        pedidoGuardadoCtrl(); 

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




};

app.initialize();