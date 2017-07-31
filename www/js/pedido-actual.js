function pedidoActualCtrl(){

    var idMarca = localStorage.getItem("marcaCatalogo")
    var idCliente = localStorage.getItem("IdClienteCatalogo")
    //var productosSelecMarca = localStorage.getItem("productosSelecMarca")
    var productosSelecMarca = JSON.parse(localStorage.getItem("productosSelecMarca"))
       
	/**
     * PedidoActualVue
     *
     * @type       Vue Root
     */
    var PedidoActualVue = new Vue({

		el : '#pedido-actual', 
		
		data: {
            marca:{},
            familias: productosSelecMarca,
            totales:{
                totalBruto : 0,
                totalDescuentosParciales: 0,
                baseImponible:0,
                iva:0,
                totalOperacion:0
            },
            meta:{
                cliente: {},
                nOrdenCliente: '',
                condicionesPago: '',
                despacho:'',
                despachoOtroTransporte: '',
                observaciones:''
            }
        },

        mounted: function() { //vs created
            this.totalizar()
        },

        methods: {
            guardarPedido: guardarPedidoCallback,
            totalizar: function() {
                var totalBruto = 0,
                    descuentosParcialesMonto = 0

                // Recorre Familias - Productos, acumula totales y dscuentos por familia y finales
                this.familias.forEach(function(familia) {
                    var totalBrutoFamilia = 0,
                        descuentoFamiliaMonto = 0

                    familia.productos.forEach(function(producto){
                        totalBrutoProducto =  parseInt(producto.precio_bulto*producto.cantidad)
                        producto.total = totalBrutoProducto
                        totalBrutoFamilia = parseInt(totalBrutoFamilia) + totalBrutoProducto 
                    })
                    familia.total = totalBrutoFamilia
                    totalBruto = totalBruto + totalBrutoFamilia

                    // Aplica descuento a la famila 
                    if(familia.descuentoPC!=0) {
                        descuentoFamiliaMonto = totalBrutoFamilia * (parseInt(familia.descuentoPC)/100)
                        descuentosParcialesMonto = descuentosParcialesMonto + descuentoFamiliaMonto 
                    }

                })

                this.totales.totalBruto = totalBruto
                this.totales.totalDescuentosParciales = descuentosParcialesMonto
                this.totales.baseImponible = totalBruto - descuentosParcialesMonto
                this.totales.iva = this.totales.baseImponible * 0.12
                this.totales.totalOperacion = this.totales.baseImponible + this.totales.iva 
            }
        }
        

	})


    database = initDatabase()

    // obten la marca del pedido
    database.transaction( marcaTransaction, errorTransactionGeneral)
    function marcaTransaction(tr) {
        marcaF = {};
        tr.executeSql('SELECT * FROM marcas WHERE id='+idMarca,[], function(tr, rsMarca) {
            marcaF = rsMarca.rows.item(0)
            PedidoActualVue.marca = marcaF
        })
    }

    // obten el cliente del pedido
    database.transaction( clienteTransaction, errorTransactionGeneral)
    function clienteTransaction(tr) {
        clienteF = {};
        tr.executeSql('SELECT * FROM clientes WHERE id='+idCliente,[], function(tr, rsCliente) {
            clienteF = rsCliente.rows.item(0)
            PedidoActualVue.meta.cliente = clienteF
        })
    }


    function guardarPedidoCallback() {
        database.transaction( 
            insertPedidoTransactions.bind(this), 
            function (error) {
                alert('INSERT error: ' + error.message)
            }
        )
        function insertPedidoTransactions(tr) {
            //marcaF = {};
            tr.executeSql('INSERT INTO pedidos VALUES (?,?,?,?,?,?,?,?,?)',[
                    null, 
                    1, // TO-DO usuario logeado o defecto
                    PedidoActualVue.meta.cliente.id,//this.meta.cliente.id,
                    'no_enviado',
                    PedidoActualVue.meta.nOrdenCliente,
                    PedidoActualVue.meta.condicionesPago,
                    PedidoActualVue.meta.despacho,
                    PedidoActualVue.meta.despachoOtroTransporte,
                    PedidoActualVue.meta.observaciones
                ],
                function(tr,rsPedido) {
                    idNuevoPedido = rsPedido.insertId
                    localStorage.setItem('idPedidoVer', idNuevoPedido )
                    window.location.href = "pedido-guardado.html"
                }
            )

        }
    }



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

        //this.receivedEvent('deviceready');
       pedidoActualCtrl(); 

    }




};

app.initialize();