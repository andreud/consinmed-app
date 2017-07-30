function pedidoActualCtrl(){

    var idMarca = localStorage.getItem("marcaCatalogo")
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
                totalBrutoPedido : 0
            }
        },

        mounted: function() { //vs created
            this.totalizar()
        },

        methods: {
            guardarPedido: function() {

                //guarda el pedido, y obten su id
                //
                //set id para siguiente pagina
                //localStorage.setItem('idPedidoVer',idPedido);
                window.location.href= 'pedido-guardado.html'
            },
            totalizar: function() {
                var totalPedido = 0
                this.familias.forEach(function(familia) {
                    var totalBrutoFamilia = 0,
                        descuentoFamiliaMonto = 0
                    familia.productos.forEach(function(producto){
                        //alert('Procesando producto' + producto.nombre)
                        totalBrutoProducto =  parseInt(producto.precio_bulto*producto.cantidad)
                        totalBrutoFamilia = parseInt(totalBrutoFamilia) + totalBrutoProducto 
                        producto.total = totalBrutoProducto
                    })
                    familia.total = totalBrutoFamilia
                    totalPedido = totalPedido + totalBrutoFamilia
                })
                this.totales.totalBrutoPedido = totalPedido
            }
        }
        

	})


    database = initDatabase()

    // obten la marca seleccioanda de la bd ? o pasar el objeto directo desde el home?
    database.transaction( marcaTransaction, errorTransactionGeneral)
    function marcaTransaction(tr) {
        marcaF = {};
        tr.executeSql('SELECT * FROM marcas WHERE id='+idMarca,[], function(tr, rsMarca) {
            marcaF = rsMarca.rows.item(0)
            PedidoActualVue.marca = marcaF
        })
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