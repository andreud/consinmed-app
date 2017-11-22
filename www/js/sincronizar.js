
function sincronizarCtrl() {

    var database = initDatabase()

    var sincronizarDataVue = new Vue({
        el: '#sincronizarDataVue',
        data: {
            sincronizando: false,
            marcasAPI: {},
            marcasListo: false,
            familiasAPI: {},        
            familiasListo:false,
            productosAPI: {},        
            productosListo:false,
            clientesAPI: {},        
            clientesListo:false
        },
        created: function() {
            if( checkConnection() ) {
                this.sincronizando = true
                this.getMarcas()
                
            } else {
                alert('No hay conexión')
            }
        },
        methods:{
            /**
             * MARCAS
             */
            getMarcas: function() {
                var url = apiBaseUrl + 'marcas'
                var vm = this
                axios.get(url)
                    .then( function(res) {
                        vm.marcasAPI = res.data.marcas
                        vm.syncMarcas()
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }, 
            
            syncMarcas: function() {
                var vm = this
                vm.marcasAPI.forEach(function(marca) {
                    //database = initDatabase()
                    // Chequear si ya existe el ID de la marca,
                    // para agregarla o actualizarla si ya existe 
                    database.executeSql('SELECT * FROM marcas WHERE id=?', [marca.id], function(rsMarca){
                        if(rsMarca.rows.length==1){
                            // marca ya existe en local, updatear
                            database.executeSql( 'UPDATE marcas SET nombre=?, orden=? WHERE id=?', 
                                [
                                    marca.nombre,
                                    marca.orden,
                                    marca.id //where
                                ]
                            )
                        } else if(rsMarca.rows.length==0) {
                            // marca no existe en local, insertar
                            database.executeSql( 'INSERT INTO marcas VALUES (?,?,?)', [
                                marca.id,
                                marca.nombre,
                                marca.orden
                            ])
                        }
                    });
        
                    //  -- cubir casos de marcas que no existan en el api (han sido borradas en el panel) para borrarlas local    

                    
                })

                setTimeout(function() {
                    vm.marcasListo = true;
                    vm.getFamilias()
                }, 1000);


            },

            /**
             * FAMILIAS
             */
            getFamilias: function() {
                var url = apiBaseUrl + 'familias'
                var vm = this
                axios.get(url)
                    .then( function(res) {
                        vm.familiasAPI = res.data.familias
                        vm.syncFamilias()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }, 
            
            syncFamilias: function() {
                var vm = this
                this.familiasAPI.forEach(function(familia) {
                    //database = initDatabase()
                    // Chequear si ya existe el ID de la familia,
                    // para agregarla o actualizarla si ya existe 
                    database.executeSql('SELECT * FROM familias WHERE id=?', [familia.id], function(rsFamilia){
                        if(rsFamilia.rows.length==1){
                            // familia ya existe en local, updatear
                            console.log('familia ' + familia.nombre + familia.id + ' YA existe en local, updatear')
                            database.executeSql(
                                'UPDATE familias SET id_marcas=?,nombre=?,orden=? WHERE id=?', 
                                [
                                    familia.id_marcas,
                                    familia.nombre,
                                    familia.orden,
                                    familia.id
                                ]
                            );
                        } else if(rsFamilia.rows.length==0) {
                            // familia no existe en local, insertar
                            console.log('familia ' + familia.nombre + familia.id + ' NO existe en local, insertar')
                            database.executeSql('INSERT INTO familias VALUES (?,?,?,?)', [
                                familia.id,
                                familia.id_marcas,
                                familia.nombre,
                                familia.orden
                            ])
                        }
                    })
                    //  -- cubir casos de marcas que no existan en el api (han sido borradas en el panel) para borrarlas local    
                   
                })

                setTimeout(function() {
                    vm.familiasListo = true
                    vm.getProductos()
                }, 2000);
            },

            /**
             * PRODUCTOS
             */
            getProductos: function() {
                var url = apiBaseUrl + 'productos'
                var vm = this
                axios.get(url)
                    .then( function(res) {
                        vm.productosAPI = res.data.productos
                        vm.syncProductos()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }, 
            
            syncProductos: function() {
                var vm = this
                this.productosAPI.forEach(function(producto) {
                    //database = initDatabase()
                    // Chequear si ya existe el ID de la producto,
                    // para agregarla o actualizarla si ya existe 
                    database.executeSql('SELECT * FROM productos WHERE id=?', [producto.id], function(rsProducto){
                        if(rsProducto.rows.length==1){
                            // producto ya existe en local, updatear
                            console.log('producto ' + producto.nombre + producto.id + ' YA existe en local, updatear')
                            database.executeSql(
                                'UPDATE productos SET id_familias=?,codigo=?,nombre=?,cajas_x_bulto=?,unid_x_caja=?,precio_bulto=?,precio_bulto_dist=?,orden=? WHERE id=?', 
                                [
                                    producto.id_familias,
                                    producto.codigo,
                                    producto.nombre,
                                    producto.cajas_x_bulto,
                                    producto.unid_x_caja,
                                    producto.precio_bulto,
                                    producto.precio_bulto,//_dist
                                    producto.orden,
                                    producto.id//Where
                                ]
                            );
                        } else if(rsProducto.rows.length==0) {
                            // producto no existe en local, insertar
                            console.log('producto ' + producto.nombre + producto.id + ' NO existe en local, insertar')
                            database.executeSql('INSERT INTO productos VALUES (?,?,?,?,?,?,?,?,?,?)', [
                                producto.id,
                                producto.id_familias,
                                producto.codigo,
                                producto.nombre,
                                null,
                                producto.cajas_x_bulto,
                                producto.unid_x_caja,
                                producto.precio_bulto,
                                producto.precio_bulto,//_dist
                                producto.orden
                            ])
                        }
                    })
                    //  -- cubir casos de marcas que no existan en el api (han sido borradas en el panel) para borrarlas local    
                    
                })

                setTimeout(function() {
                        vm.productosListo = true
                        vm.getClientes()
                    }, 5000);
            },


            /**
             * CLIENTES
             */
            getClientes: function() {
                var url = apiBaseUrl + 'clientes'
                var vm = this
                axios.get(url)
                    .then( function(res) {
                        vm.clientesAPI = res.data.clientes
                        vm.syncClientes()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }, 
            
            syncClientes: function() {
                var vm = this
                this.clientesAPI.forEach(function(cliente) {
                    database = initDatabase()
                    // Chequear si ya existe el ID de la cliente,
                    // para agregarla o actualizarla si ya existe 
                    database.executeSql('SELECT * FROM clientes WHERE id=?', [cliente.id], function(rsCliente){
                        if(rsCliente.rows.length==1){
                            // cliente ya existe en local, updatear
                            console.log('cliente ' + cliente.nombre + cliente.id + ' YA existe en local, updatear')
                            database.executeSql(
                                'UPDATE clientes SET razon_social=?,rif=?,email=?,contacto_nombre=?,telefono=? WHERE id=?', 
                                [
                                    cliente.razon_social,
                                    cliente.rif,
                                    cliente.email,
                                    cliente.contacto_nombre,
                                    cliente.telefono,
                                    cliente.id//Where
                                ]
                            );
                        } else if(rsCliente.rows.length==0) {
                            // cliente no existe en local, insertar
                            console.log('cliente ' + cliente.razon_social + cliente.id + ' NO existe en local, insertar')
                            database.executeSql('INSERT INTO clientes VALUES (?,?,?,?,?,?,?)', [
                                cliente.id,
                                cliente.razon_social,
                                cliente.rif,
                                cliente.email,
                                cliente.contacto_nombre,
                                cliente.telefono,
                                cliente.direccion
                            ]);
                        }
                    })
                    //  -- cubir casos de marcas que no existan en el api (han sido borradas en el panel) para borrarlas local    
                    
                });
                setTimeout(function() {
                    vm.clientesListo = true
                }, 4000);
            }


        }


    })
}



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
        sincronizarCtrl()
    }

};

app.initialize();