function pedidoActualCtrl(){

    var idMarca = localStorage.getItem("marcaCatalogo")
    //var productosSelecMarca = localStorage.getItem("productosSelecMarca")
    var productosSelecMarca = JSON.parse(localStorage.getItem("productosSelecMarca"))
       
    var marca = _.find(listaMarcasData, {'id': idMarca})


    var pedidoActualDataStorage = {
        marca: marca.nombre,
        familias: productosSelecMarca
    }


	var PedidoActualVue = new Vue({

		el : '#pedido-actual',

		//'template' : 
		
		data: pedidoActualDataStorage,

        methods: {
            guardarPedido: function() {

                //guarda el pedido, y obten su id
                //
                //set id para siguiente pagina
                //localStorage.setItem('idPedidoVer',idPedido);
                window.location.href= 'pedido-guardado.html'
            }
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
          
        pedidoActualCtrl(); 

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
    }




};

app.initialize();