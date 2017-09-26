var sincronizarDataVue = new Vue({
    el: '#sincronizarDataVue',
    data: {
        marcasAPI: {},
        marcas: {},
        familiasAPI: {}
    },
    created: function() {
        if( checkConnection() ) {
            this.getMarcas()
        } else {
            alert('No hay conexión')
        }
    },
    methods:{
        getMarcas: function() {
            var url = apiBaseUrl + 'marcas'
            var vm = this
            axios.get(url)
                .then( function(res) {
                    vm.marcasAPI = res.data.marcas
                    database = initDatabase()

                    vm.marcasAPI.forEach(function(marca) {
                        // Chequear si ya existe el ID de la marca,
                        // para agregarla o actualizarla si ya existe 
                        database.executeSql('SELECT * FROM marcas WHERE id=?', 
                            [marca.id], 
                            function(rsMarca){
                                var rsLenght = rsMarca.rows.length
                                if(rsLenght==1){
                                    // marca ya existe en local, updatear
                                    console.log('marca ' + marca.nombre + marca.id + ' YA existe en local, updatear')
                                    database.executeSql('UPDATE marcas SET nombre=? WHERE id=?', [
                                        marca.nombre,
                                        //marca.orden
                                        marca.id
                                    ])
                                } else if(rsLenght==0) {
                                    // marca no existe en local, insertar
                                    console.log('marca ' + marca.nombre + marca.id + ' NO existe en local, insertar')
                                    database.executeSql('INSERT INTO marcas VALUES (?,?,?)', [
                                        marca.id,
                                        marca.nombre,
                                        marca.orden
                                    ])
                                }
                            }
                        )
                        //  -- cubir casos de marcas que no existan en el api (han sido borradas en el panel) para borrarlas local    
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });

            
        }, 


    }


})


var app = {

    // Application Constructor
    initialize: function() {        
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //  Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        
        //this.receivedEvent('deviceready');
          
    }

};

app.initialize();