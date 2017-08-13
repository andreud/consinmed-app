function HomeCtrl() {

    database = initDatabase()

    /**
     * VUE listaMarcas
     *
     * @type       {Vue}
     */
    var listaMarcasVue = new Vue({
        el : '#listaMarcas',
        data: {
            //marcas: listaMarcasDataStatic,
            marcasDB: []
        },
        methods: {
            irCatalogoMarca: function (idMarca) {
                localStorage.setItem("marcaCatalogo", idMarca )
                window.location.href = 'catalogo.html'
            },
            uriImgMarca: function(NombreMarca) {
                return 'img/marcas/'+NombreMarca+'.png';
            }
        }
        /*,computed: {
            marcasDB: function(){
                //database = initDatabase()
                listaMarcasDataDB = []
                // obtener marcas de db:
                database.transaction(
            }
            //,uriImgMarca: function(NombreMarca) {return 'img/marcas/'+NombreMarca+'.png';}
        }*/

    }) // fin ListaMarcasVue


    // obtener marcas de db:
    listaMarcasDataDB = []
    //database.transaction(
    //    function(transaction) {
            database.executeSql( "SELECT * FROM marcas", [], function(/*transaction,*/ rs) {
                //alert('Primer registro marcas: ' + JSON.stringify(rs.rows.item(0)) )
                for(var x = 0; x < rs.rows.length; x++) {
                    listaMarcasDataDB.push(rs.rows.item(x))
                }
                //alert( JSON.stringify(listaMarcasDataDB))
                listaMarcasVue.marcasDB = listaMarcasDataDB
            });
        //}, 
        /*function(error) {
            alert('SELECT error: ' + error.message)
        }*/
    //)



}





var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        HomeCtrl();        
        //this.receivedEvent('deviceready');
    }

};
app.initialize();