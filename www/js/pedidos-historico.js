/**
 * Controller y Vue de Pagina Catalogo
 */
function historicoPedidosCtrl() {
    
        
    
    // arbol data para Vue
	var dataHistoricoPedidos = {
        pedidos: [] //dataPedidos
    }


    database = initDatabase()
    database.transaction(pedidosTransaction,errorTransactionGeneral)
    function pedidosTransaction(tr) {
        tr.executeSql('SELECT * FROM pedidos',[], function(tr,rsPedidos) {
            pedidosF = []
            for(var i=0 ; i < rsPedidos.rows.length; i++ ){
                //this.pedidos.push(rsPedidos.rows.tem(i)
                pedidosF.push(rsPedidos.rows.item(i))
            }
            //alert(JSON.stringify(pedidosF))
            dataHistoricoPedidos.pedidos = pedidosF
        })
    }
    


    /**
     * Historico de Pedidos Vue
     *
     * @type       Vue Root
     */
	var HistoricoPedidosVue = new Vue({

	    el: "#HistoricoPedidosVue",
	    
	    data: dataHistoricoPedidos,

        mounted: function(){
            //this.getPedidos()
        },

	    methods: {

	    	irAPedido: function(idPedido) {
	    		localStorage.setItem('idPedidoVer',idPedido);
	    		window.location.href = "pedido-guardado.html";
	    	}
	    }
	    
	   
	})






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
            
       historicoPedidosCtrl(); 
       //this.receivedEvent('deviceready');
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