function pedidoGuardadoCtrl(){

    idPedido = localStorage.getItem('idPedidoVer')
    dataPedidoGuardadoVue = {
        pedido:{},
        cliente:{}
    }



    database = initDatabase()
    database.transaction( pedidoTransaction, errorTransactionGeneral )

    function pedidoTransaction(tr) {
        tr.executeSql('SELECT * FROM pedidos WHERE id='+idPedido,[], pedidoSqlCallback)
    }

    function pedidoSqlCallback(tr,rsPedido){
        pedidoF = rsPedido.rows.item(0)
        tr.executeSql('SELECT * FROM clientes WHERE id='+pedidoF.id_clientes,[], function(tr, rsCliente) {
            cliente = rsCliente.rows.item(0)
            dataPedidoGuardadoVue.cliente = cliente
        })
        dataPedidoGuardadoVue.pedido = pedidoF
    }


    /**
     * pedidoGuardadoVue
     */
	pedidoGuardadoVue = new Vue({

		el : '#pedidoGuardadoVue',
		
		data: dataPedidoGuardadoVue,

        methods: {
            enviarPedido: function() {
                // body...
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
          
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        
        pedidoGuardadoCtrl();
    
    }

};

app.initialize();