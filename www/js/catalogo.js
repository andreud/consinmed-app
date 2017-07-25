/**
 * Controller y Vue de Pagina Catalogo
 */
function catalogoFamiliaCtrl() {
    
    // obtener marca 
    var idMarca = localStorage.getItem("marcaCatalogo")
    var marca = _.find(listaMarcasData, {'id': idMarca})
    // obtener arbol de familias/marcas/productos
    var dataCatalogoMarcaProductosStore = _
        .find(marcasFamiliasProductosDataStore, {'id_marca': idMarca})
    
    // arbol data para Vue
	var dataCatalogoMarca = {
        marca: marca.nombre,
        familias: dataCatalogoMarcaProductosStore.familias
    }


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
	    		
	    		// Por cada familia, devuelve los productos con cant!=0
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

	    		console.log(familiasProductosSelecMarca)
	    		//localStorage.setItem("productosSelecMarca", familiasProductosSelecMarca )
	    		localStorage.setItem("productosSelecMarca", JSON.stringify(familiasProductosSelecMarca) )

	    		window.location.href = 'pedido-actual.html'
	    	}
	    }
	})



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
          
         catalogoFamiliaCtrl(); 

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