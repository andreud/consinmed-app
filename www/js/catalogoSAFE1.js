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
    database.transaction(
        function (tr) {
            listaClientesDataDB = []
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


    
    //obten las familias de la marca, los productos de cada familia y actualiza en el Vue
    database.transaction(
        function (tr) {
           
            familiasProductosDB = []
            
            //obten las familias de la marca, 
            tr.executeSql('SELECT * FROM familias WHERE id_marca='+idMarca, [], function(tr, rsFamilias){ 
                //alert(JSON.stringify(rsFamilias))
                for(var x = 0; x < rsFamilias.rows.length; x++) {
                    familia = rsFamilias.rows.item(x)

                    productosEnFamilia = []
                    //familiaF = {}

                    familiaF = {
                        id: familia.id,
                        nombre: familia.nombre,
                        descuentoPC: 0,
                        visible:false,
                        productos: []
                    }
                    //familiasProductosDB.push(familiaF)
                    
                    tr.executeSql('SELECT * FROM productos WHERE id_familia='+familia.id, [], function(tr,rsProductos){
                        for(var i = 0; i < rsProductos.rows.length; i++) {
                            producto = rsProductos.rows.item(i)
                            //familiasProductosDB[x].productos.push({
                            productoF = {
                                id: producto.id,
                                nombre: producto.nombre,
                                codigo: producto.codigo,
                                caj_x_bulto: 'X',//producto.caj_x_bulto,
                                unid_x_caja: 'X',//producto.unid_x_caja,
                                precio_bulto: 'X',//producto.precio_bulto,
                                cantidad: ''
                            }
                            productosEnFamilia.push(productoF)
                        }
                        //familiaF.productos = productosEnFamilia
                        
                        /*familiaF = {
                            id: familia.id,
                            nombre: familia.nombre,
                            descuentoPC: 0,
                            visible:false,
                            productos: productosEnFamilia
                        }*/
                    })


                    
                    
                    familiasProductosDB.push(familiaF)

                        
                   
                }
            })
            
            //obten los productos de cada familia
            /*_.forEach(familiasProductosDB, function(el, i) {
                tr.executeSql('SELECT * FROM productos WHERE id_familia='+el.id, [], function(tr,rs){
                    //productosFamilia = []
                    for(var i = 0; i < rs.rows.length; i++) {
                        producto = rs.rows.item(i)
                        el.productos.push({
                        //catalogoMarca.familias[i].push({
                            id: producto.id,
                            nombre: producto.nombre,
                            codigo: producto.codigo,
                            caj_x_bulto: 'X',//producto.caj_x_bulto,
                            unid_x_caja: 'X',//producto.unid_x_caja,
                            precio_bulto: 'X',//producto.precio_bulto,
                            cantidad: ''
                        })
                    }
                })
            })*/

            
            // Pasa la data estructurada al Vue
            catalogoMarca.familias = familiasProductosDB

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