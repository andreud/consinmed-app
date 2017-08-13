function pedidoGuardadoCtrl(){

    idPedido = localStorage.getItem('idPedidoVer')
    dataPedidoGuardadoVue = {
        pedido: {},
        cliente: {},
        familiasProductos: []
    }


    database = initDatabase()
    //database.transaction( pedidoTransaction, errorTransactionGeneral )
    
    // obtener el pedido y cliente asociado
    database.executeSql('SELECT * FROM pedidos WHERE id='+idPedido, [], pedidoSqlCallback)            
    function pedidoSqlCallback(rsPedido){        
        pedido = rsPedido.rows.item(0)
        database.executeSql('SELECT * FROM clientes WHERE id='+pedido.id_clientes,[], function(rsCliente) {
            cliente = rsCliente.rows.item(0)
            dataPedidoGuardadoVue.cliente = cliente
        })
        dataPedidoGuardadoVue.pedido = pedido
    }

    // obtener el arbol de familias/productos del peddo
    database.executeSql('SELECT * FROM pedidos_familias WHERE id_pedidos='+idPedido, [], familiasSqlCallback)

    function familiasSqlCallback(rsFamiliasPedido) {
        listaFamiliasDataDB = []
        for(var x = 0; x < rsFamiliasPedido.rows.length; x++) {
            familiaPedido = rsFamiliasPedido.rows.item(x)
            familiaF = {
                id: familiaPedido.id_familias,
                nombre: '',
                descuentoPC: familiaPedido.descuento_pc,
                visible:false,
                productos: []
            }

            //obtener el registro familia asociado
            database.executeSql("SELECT * FROM familias WHERE id="+familiaPedido.id_familias, [], function(rsFamilia) {
                familia = rsFamilia.rows.item(0)
                familiaF.nombre = familia.nombre
                //listaFamiliasDataDB.push(familiaF)
            })
            listaFamiliasDataDB.push(familiaF)

            //obtener los productos pedidos asociados e cada familia
            //database.executeSql('SELECT * FROM pedidos_familias_productos WHERE id_pedidos_familias='+familiaPedido.id, [], familiasProductosSqlCallback )
        }
        console.log('listaFamiliasDataDB')
        console.log(listaFamiliasDataDB)// porque devuelve un objeto con funciones?
        dataPedidoGuardadoVue.familiasProductos = listaFamiliasDataDB
    }

    /*function familiasProductosSqlCallback(rsFamiliasProd) {
        // body...
    }*/


    /**
     * pedidoGuardadoVue
     *
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