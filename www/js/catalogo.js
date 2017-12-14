/**
 * Controller y Vue de Pagina Catalogo
 */
function catalogoFamiliaCtrl() {
    
    var idMarca = localStorage.getItem("marcaCatalogo") //string 
    var idCliente = localStorage.getItem("IdClienteCatalogo") //string 

    
    /**
     * Selector de clientes 
     * 
     * @type       Vue Component
     */
    Vue.component( 'selector-clientes', {
        template: '#selectorClientes',
        props: ['clientes'],
        data: function(){
            return { clienteSeleccionado: ''}
        },
        methods: {
            clienteFueSeleccionado: function() {
                this.$emit('seleccionado', this.clienteSeleccionado)
            }
        }
    })


    /**
     * Selector de tipo de cliente
     * 
     * @type       Vue Component
     */
    Vue.component('selector-tipo-cliente', {
        template: '#selectorTipoCliente',
        data: function(){
            return { 
                tipoClienteSeleccionado: ''//'fabricante' 
            }
        },
        methods: {
            tipoClienteFueSeleccionado: function() {
                this.$emit('tiposeleccionado', this.tipoClienteSeleccionado)
            }
        }

    })


    /**
     * Selector de porcentaje descuento a familia
     * 
     * @type       Vue Component
     */
    Vue.component( 'selector-descuento', {
        template: '#selectorDescuento',
        props: ['familia'] 
    })

    /**
     * Selector de porcentaje descuento a un producto
     * 
     * @type       Vue Component
     */
    Vue.component( 'selector-descuento-producto', {
        template: '#selectorDescuentoProducto',
        props: ['producto']
        /*,
        methods: {

        }*/
    })




    /**
     * Catalogo Marca
     *
     * @type       Vue Root
     */
	var catalogoMarca = new Vue({
	    el: "#catalogo-marca",
	    data: {
            clientes: [],
            clienteSeleccionadoID: '',
            tipoCliente: '',
            marca: {},
            familias: []
        },
        filters: {
            formatoDinero: formatoDinero,
        },
	    methods: {
	    	familiaVisible: function (familia) {		
                if( this.tipoCliente == '' ) {
                    alert('Debe seleccionar tipo de cliente')
                } else {
                    familia.visible=!familia.visible                    
                }
            },
	    	
            actualizarPedido: function(familias) {	

                if(!this.validaActualizarPedidio()) return

                // Recoge los productos que se agregaron en un arbol familias-productos
	    		var familiasProductosSelecMarca = []	    		
                _.forEach(this.familias, function(familia) {
	    			productosSeleccionados = _.filter(familia.productos, function(producto) {
    					return producto.cantidad!='0' && producto.cantidad!=''  
    				})
	    			
	    			if( ! _.isEmpty(productosSeleccionados) ) {
		    			familiasProductosSelecMarca.push({
		    				id: familia.id,
                            nombre: familia.nombre,
		    				descuentoPC: parseInt(familia.descuentoPC),//deprecado como principal fuente del descuento, que pasa a nivel de producto
		    				productos: productosSeleccionados,
                            total: 0,
                            totalBruto: 0 // NUEVO
		    			})
		    		}
                })
                localStorage.setItem("productosSelecMarca", JSON.stringify(familiasProductosSelecMarca) )
	    		window.location.href = 'pedido-actual.html'
	    	},
            
            validaActualizarPedidio: function() {
                if(this.clienteSeleccionadoID=='') {
                    alert('Debe seleccionar un cliente para continuar.')
                    return false;
                }
                return true;
            },
            
            actualizaCliente: function (IdCliente) {
                localStorage.setItem("IdClienteCatalogo", IdCliente)
                this.clienteSeleccionadoID = IdCliente 
            },
            
            actualizaTipoCliente: function(tipoCliente) {
                localStorage.setItem("tipoClienteCatalogo", tipoCliente)
                this.tipoCliente = tipoCliente
            }
        
	    }
	})



    database = initDatabase()

    // Obtener todos los clientes 
    listaClientesDataDB = []
    database.executeSql('SELECT * FROM clientes', [], function(rs){
        for(var x = 0; x < rs.rows.length; x++) {
            listaClientesDataDB.push(rs.rows.item(x))
        }
        catalogoMarca.clientes = listaClientesDataDB
    })

    // Obtener el registro de la marca seleccionada
    marcaF = {};
    database.executeSql('SELECT * FROM marcas WHERE id='+idMarca,[], function(rsMarca) {
        marcaF = rsMarca.rows.item(0)
        catalogoMarca.marca = marcaF
    })
 
    //obten las familias y sus productos de la marca seleccionada, 
    familiasProductosDB = []
    database.executeSql('SELECT * FROM familias WHERE id_marcas='+idMarca+' ORDER BY orden', [], sqlFamiliasCallback.bind(familiasProductosDB)  )

    // Pasa la data estructurada al Vue
    catalogoMarca.familias = familiasProductosDB
    
    function sqlFamiliasCallback(rsFamilias){
        for(var x = 0; x < rsFamilias.rows.length; x++) {
            familia = rsFamilias.rows.item(x)
            familiaF = {
                id: familia.id,
                nombre: familia.nombre,
                descuentoPC: 0,// //deprecado como principal fuente del descuento, que pasa a nivel de producto
                visible:false,
                productos: []
            }

            database.executeSql(
                'SELECT * FROM productos WHERE id_familias='+familia.id, [], sqlProductosCallback.bind(familiaF)
            )

            this.push(familiaF)
        }     
    }

    function sqlProductosCallback(rsProductos){
        for(var i = 0; i < rsProductos.rows.length; i++) {
            producto = rsProductos.rows.item(i)
            //familiasProductosDB[x].productos.push({
            productoF = {
                id: producto.id,
                nombre: producto.nombre,
                codigo: producto.codigo,
                cajas_x_bulto: producto.cajas_x_bulto,//producto.caj_x_bulto,
                unid_x_caja: producto.unid_x_caja,//producto.unid_x_caja,
                precio_bulto: producto.precio_bulto,//producto.precio_bulto,
                precio_bulto_dist: producto.precio_bulto_dist,//NUEVO
                descuentoPC: 0,//NUEVO                                                                             
                cantidad: ''
            }
            this.productos.push(productoF)
        }
    }


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
    },

    onDeviceReady: function() {
        catalogoFamiliaCtrl(); 
    }
}
app.initialize()