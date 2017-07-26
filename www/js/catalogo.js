/**
 * Controller y Vue de Pagina Catalogo
 */
function catalogoFamiliaCtrl() {
    
    database = initDatabase()
    
    // obtener marca seleccionada
    var idMarca = localStorage.getItem("marcaCatalogo")
    //alert(typeof idMarca) //string
    var marca = _.find(listaMarcasDataStatic,  {'id': idMarca}  )

    //alert(JSON.stringify(marca))
    
    // obtener arbol de familias/marcas/productos
    var dataCatalogoMarcaProductosStore = _
        .find(marcasFamiliasProductosDataStore, {'id_marca': idMarca})
    




    // arbol data para Vue
	var dataCatalogoMarca = {
        marca: marca.nombre,
        //familias: dataCatalogoMarcaProductosStore.familias,
        familias: [],
        //clientes: clientesDataStatic
        clientes: []
    }


    /**
     * Selector de clientes 
     * 
     * @type       Vue Component
     */
    Vue.component( 'selector-clientes', {
        template: '#selectorClientes',
        props: ['clientes'] 
    })

    /**
     * Selector de porc descuento 
     * 
     * @type       Vue Component
     */
    /*Vue.component( 'selector-descuento', {
        template: '#selectorDescuento',
        props: ['descuento'] 
    })*/


    /**
     * Catalogo Marca
     *
     * @type       Vue Root
     */
	var catalogoMarca = new Vue({

	    el: "#catalogo-marca",
	    
	    data: dataCatalogoMarca,
	    
	    methods: {
	    
	    	familiaVisible: function (familia) {		
	    		familia.visible=!familia.visible;
	    	},

	    	actualizarPedido: function(familias) {	
	    		// Por cada familia, devuelve los productos con cant!=''
	    		var productosSelecMarca = []
	    		var familiasProductosSelecMarca = []
	    		_.forEach(familias, function(familia) {
	    			
	    			//familiasProductosSelecMarca.push(familia.nombre:[])
	    			
	    			productosSelecMarcaV2 = _.filter(familia.productos, function(producto) {
    					return producto.cantidad!='0' && producto.cantidad!=''  
    				})
	    			
	    			if( ! _.isEmpty(productosSelecMarcaV2) ) {
		    			familiasProductosSelecMarca.push({
		    				nombre: familia.nombre,
		    				descuentoPC: familia.descuentoPC,
		    				productos: productosSelecMarcaV2
		    			})
		    		}

	    			/*_.filter(familia.productos, function(producto) {
	    					return producto.cantidad!='0' && producto.cantidad!=''  
	    				}).forEach(function(producto) {
	    					//console.log(producto.nombre)
	    					productosSelecMarca.push(producto);
	    					//productosSelecMarca.push(producto);
	    				})*/
	    		})

	    		//console.log(familiasProductosSelecMarca)
	    		//localStorage.setItem("productosSelecMarca", familiasProductosSelecMarca )
	    		localStorage.setItem("productosSelecMarca", JSON.stringify(familiasProductosSelecMarca) )
	    		window.location.href = 'pedido-actual.html'
	    	}
	    }
	})


    // obtener lista de clientes de la bd
    listaClientesDataDB = []
    database.transaction(
        function (tr) {
            tr.executeSql('SELECT * FROM clientes', [], function(tr, rs){
                for(var x = 0; x < rs.rows.length; x++) {
                    listaClientesDataDB.push(rs.rows.item(x))
                }
                catalogoMarca.clientes = listaClientesDataDB
            })
        }, 
        function(error) {
            alert('SELECT error: ' + error.message)
        }
    )


    
    //obten las familias de la marca, 
    //obten los productos de cada familia
    database.transaction(
        function (tr) {
           
            tr.executeSql('SELECT * FROM familias WHERE id_marca='+idMarca, [], function(tr, rs){ 
                //alert(JSON.stringify(rs))
                familiasProductosDB = [] 
                for(var x = 0; x < rs.rows.length; x++) {
                    familia = rs.rows.item(x)

                    
                    productosFamilia = []
                    /*tr.executeSql('SELECT * FROM productos WHERE id_familia='+familia.id, [], function(tr,rs){
                        for(var i = 0; i < rs.rows.length; i++) {
                            producto = rs.rows.item(i)
                            productosFamilia.push({
                                id: producto.id,
                                nombre: producto.nombre,
                                codigo: producto.codigo,
                                caj_x_bulto: 'X',//producto.caj_x_bulto,
                                unid_x_caja: 'X',//producto.unid_x_caja,
                                precio_bulto: 'X',//producto.precio_bulto,
                                cantidad: ''
                            })
                        }
                    })*/

                    familiasProductosDB.push({
                        //id: familia.id,
                        nombre: familia.nombre,
                        descuentoPC: 0,
                        visible:false,
                        productos: productosFamilia
                    })
                }
                
                catalogoMarca.familias = familiasProductosDB
            })

        }, 
        function(error) {
            alert('SELECT error: ' + error.message)
        }
    )
    



	    /*
	Vue.component('catalogo-familia', {
		template:'#tempate-catalogo-familia',
		props:['familia']
	});
	Vue.component('catalogo-producto', {
		template : '<div>{{producto.nombre}}</div>',
		props:['producto']
	});*/



	





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

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
    
        catalogoFamiliaCtrl(); 

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