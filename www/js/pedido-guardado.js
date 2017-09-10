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
            database.executeSql(
                "SELECT * FROM familias WHERE id="+familiaPedido.id_familias, [], familiaRegistroCallback.bind(familiaF)
            )
        
            //obtener los productos pedidos asociados a cada familia
            /*
            database.executeSql(
                'SELECT * FROM pedidos_familias_productos WHERE id_pedidos_familias='+familiaPedido.id, [], familiasProductosSqlCallback.bind(familiaF) 
            )*/
            // con join al registro de productos
            database.executeSql(
                'SELECT productos.*, pedidos_familias_productos.precio_bulto AS ped_precio_bulto, pedidos_familias_productos.cantidad AS ped_cantidad FROM pedidos_familias_productos JOIN productos ON productos.id=pedidos_familias_productos.id_productos WHERE id_pedidos_familias='+familiaPedido.id, 
                [], 
                familiasProductosSqlCallback.bind(familiaF) 
            )
            
            listaFamiliasDataDB.push(familiaF)
        }
        dataPedidoGuardadoVue.familiasProductos = listaFamiliasDataDB
    }


    function familiaRegistroCallback(rsFamiliaPedido){
        familia = rsFamiliaPedido.rows.item(0)
        this.nombre = familia.nombre
    }

    function familiasProductosSqlCallback(rsFamiliaProductosPedido) {
        for(var x = 0; x < rsFamiliaProductosPedido.rows.length; x++) {
            productoPedido = rsFamiliaProductosPedido.rows.item(x)
            console.log(productoPedido)
            productoF = {
                //id: productoPedido.id,
                
                nombre: productoPedido.nombre,
                codigo: productoPedido.codigo,
                cajas_x_bulto: productoPedido.cajas_x_bulto,//producto.caj_x_bulto,
                unid_x_caja: productoPedido.unid_x_caja,//producto.unid_x_caja,
                
                precio_bulto: productoPedido.ped_precio_bulto,// el rpeco bulto del product agregado al pedido
                cantidad: productoPedido.ped_cantidad
            
            }
            this.productos.push(productoF)
        }
    }


    /**
     * pedidoGuardadoVue
     *
     */
	pedidoGuardadoVue = new Vue({

		el : '#pedidoGuardadoVue',
		
		data: dataPedidoGuardadoVue,

        filters: {
            formatoDinero: formatoDinero
        },

        computed: {

            totalNeto : function () {
                return this.pedido.total_bruto - this.pedido.descuentos_parc_monto
            },

            descuentoGlobMonto: function() {
                return this.totalNeto * (this.pedido.descuento_glob_pc/100)  
            }


        },

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