function pedidoActualCtrl(){

    var idMarca = localStorage.getItem("marcaCatalogo")
    var idCliente = localStorage.getItem("IdClienteCatalogo")
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
                totalDescuentosParciales: 0,//to do
                descuentoGlobPC: 0, //to-do
                descuentoGlobMonto: 0,                                    
                totalNeto: 0, //to-do backend
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
                observaciones:'',
                modalidadPago: 'cheque', //NUEVO cheque o transferencia
                
                tipoCliente: 'fabricante' // NUEVO: fabricante(P1) o distribuidor(P2)                                              
            }
        },

        mounted: function() {
            this.totalizar()
        },
        
        filters: {
            formatoDinero: formatoDinero
        },

        computed: {

            ivaPC: function() {
    
                if( this.meta.modalidadPago=='cheque' ) {
                    return 12
                } else if (this.meta.modalidadPago=='transferencia') {
                    if(this.totales.baseImponible>2000000) {
                        return 7
                    } else {
                        return 9
                    }
                }

            }
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
                this.totales.totalNeto = totalBruto - descuentosParcialesMonto
                
                if(this.totales.descuentoGlobPC>0) {
                    //this.totales.descuentoGlobMonto = this.totales.totalNeto * (1/this.totales.descuentoGlobPC)
                    this.totales.descuentoGlobMonto = this.totales.totalNeto * (this.totales.descuentoGlobPC/100)
                } else {
                    this.totales.descuentoGlobMonto = 0
                }

                this.totales.baseImponible = this.totales.totalNeto - this.totales.descuentoGlobMonto
                this.totales.iva = this.totales.baseImponible * ( this.ivaPC/100 ) //0.12
                this.totales.totalOperacion = this.totales.baseImponible + this.totales.iva
            }
        }
        

	})


    database = initDatabase()

    // obten la marca del pedido actual
    marcaF = {};
    database.executeSql('SELECT * FROM marcas WHERE id='+idMarca,[], function(rsMarca) {
        marcaF = rsMarca.rows.item(0)
        PedidoActualVue.marca = marcaF
    })

    // obten el cliente del pedido actual
    clienteF = {};
    database.executeSql('SELECT * FROM clientes WHERE id='+idCliente,[], function(rsCliente) {
        clienteF = rsCliente.rows.item(0)
        PedidoActualVue.meta.cliente = clienteF
    })

    // Click en guardar pedido
    function guardarPedidoCallback() {
        
        var hoy = new Date()
        var mes = parseInt(hoy.getMonth())+1
        var fechaGenerado = hoy.getDate() + '/' + mes + '/' + hoy.getFullYear()
        
        var familiasProductos = PedidoActualVue.familias
        var globalRsPedido = 0

        // Inserta info basica del pedido
        database.executeSql(
            'INSERT INTO pedidos VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                null, 
                1, // TO-DO usuario logeado o defecto
                PedidoActualVue.meta.cliente.id,
                'no_enviado',
                PedidoActualVue.meta.nOrdenCliente,
                PedidoActualVue.meta.tipoCliente,//
                
                PedidoActualVue.meta.condicionesPago,
                PedidoActualVue.meta.modalidadPago,//

                PedidoActualVue.meta.despacho,
                PedidoActualVue.meta.despachoOtroTransporte,
                PedidoActualVue.meta.observaciones,
                PedidoActualVue.totales.totalBruto,
                PedidoActualVue.totales.totalDescuentosParciales,
                PedidoActualVue.totales.descuentoGlobPC,//////////
               // PedidoActualVue.totales.descuentoGlobMonto,//////////
                PedidoActualVue.totales.baseImponible,
                PedidoActualVue.ivaPC,
                PedidoActualVue.totales.iva,
                fechaGenerado
            ],
            insertFamiliasProductosCallback
        )
        
        // Inserta familias y productos del pedido
        function insertFamiliasProductosCallback(rsPedido) {
            globalRsPedido = rsPedido // disponible para el llamado recursivo desde insertProductosCallback
            var idNuevoPedido = rsPedido.insertId
            var familiaProductos = familiasProductos.shift()
        
            if (familiaProductos===undefined) {
                localStorage.setItem('idPedidoVer', idNuevoPedido )
                window.location.href = "pedido-guardado.html"
            }

            // Inserta familias del pedido
            database.executeSql('INSERT INTO pedidos_familias VALUES (?,?,?,?)',[
                    null,
                    idNuevoPedido,
                    familiaProductos.id,
                    familiaProductos.descuentoPC
                ], 
                insertProductosCallback.bind(familiaProductos.productos) 
            )
        }


        // Inserta productos del pedido
        function insertProductosCallback(rsInsertFamilia) {

            newPedidoFamiliaID = rsInsertFamilia.insertId
            producto = this.shift()
           
            if( !producto  ){
                insertFamiliasProductosCallback(globalRsPedido)
            }

            boundInsertProductosCallback = insertProductosCallback.bind(this)

            database.executeSql(
                'INSERT INTO pedidos_familias_productos VALUES (?,?,?,?,?)',[
                    null,
                    newPedidoFamiliaID,
                    producto.id,
                    producto.cantidad,
                    producto.precio_bulto
                ], 
                function(){
                    boundInsertProductosCallback(rsInsertFamilia)
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