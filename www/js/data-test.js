    /**
     * Tabla Marcas
     */ 
        
    var listaMarcasDataStatic = [
        {nombre:'x MEJIA', id:'1'},
        {nombre:'x SENCO', id:'2'},
        {nombre:'x INCOLMA', id:'3'}
    ];

    /**
     * Tabla Familias
     */
    /*var listaFamiliasData = [

        {
            id: 1,
            id_marcas: 1,
            nombre: '',
            orden: 1
        }
    
    ];*/






    // data store catalogo v2.01
    var marcasFamiliasProductosDataStore = [
        {
            id_marca: '1',//MEJIA
            //nombre_marca: 'MEJIAx',
            familias: [
                {
                    nombre:'Remache Ciego Natural', 
                    descuentoPC: 0,
                    productos: [
                        {id: 1, codigo:'RC-N32', nombre: 'REMACHE CIEGO 3/32 x 5.55mm', caj_x_bulto:16, unid_x_caja:1000, precio_bulto: '485.749,59', cantidad: ''},
                        {id: 2, codigo:'RC-N34', nombre: 'REMACHE CIEGO 3-4 3/32 x 9.52mm', caj_x_bulto:16, unid_x_caja:1000, precio_bulto: '80000', cantidad: ''}
                    ],
                    visible:false
                },
                {
                    nombre:'Remache Avellanado', 
                    descuentoPC: 0,
                    productos: [
                        {id: 3, codigo:'RCA-44', nombre: 'REMACHE 4-4 AVELLANADO', caj_x_bulto:16, unid_x_caja:500, precio_bulto: '600000', cantidad: ''},
                        {id: 4, codigo:'RCA-46', nombre: 'REMACHE 4-6 AVELLANADO', caj_x_bulto:16, unid_x_caja:500, precio_bulto: '700000', cantidad: ''}
                    ],
                    visible:false
                },
                {
                    nombre:'Remache Ala Ancha', 
                    descuentoPC: 0,
                    productos: [
                        {id: 5, codigo:'RAA-N54', nombre: 'REMACHE 5-4 ALA ANCHA', caj_x_bulto:16, unid_x_caja:250, precio_bulto: '600000', cantidad: ''},
                        {id: 6, codigo:'RAA-N56', nombre: 'REMACHE 5-6 ALA ANCHA', caj_x_bulto:16, unid_x_caja:250, precio_bulto: '700000', cantidad: ''}
                    ],
                    visible:false
                },
                {
                    nombre:'Remache Blanco', 
                    descuentoPC: 0,
                    productos: [
                        {id: 7, codigo:'RC-B43', nombre: 'REMACHE CIEGO 4-3 BLANCO',caj_x_bulto:16, unid_x_caja:500, precio_bulto: '600000', cantidad: ''}
                    ],
                    visible:false
                }
            ]
        }, 
        {
            id_marca: '2',//SENCO
            //nombre_marca: 'SENCOx',
            familias: [
                {
                    nombre:'Familia Senco  1', 
                    descuentoPC: 0,
                    productos: [
                        {id: 8, codigo:'XYZ', nombre: 'Prueba Senco 1.1',caj_x_bulto:16, unid_x_caja:1000, precio_bulto: '600000', cantidad: ''},
                        {id: 9, codigo:'YTT', nombre: 'Prueba Senco 1.2',caj_x_bulto:16, unid_x_caja:1000, precio_bulto: '700000', cantidad: ''}
                    ],
                    visible:false
                },
                {
                    nombre:'Familia Senco  2',
                    descuentoPC: 0, 
                    productos: [
                        {id: 10, codigo:'XYZ', nombre: 'Prueba Senco 2.1',caj_x_bulto:16, unid_x_caja:1000, precio_bulto: '600000', cantidad: ''},
                        {id: 11, codigo:'YTT', nombre: 'Prueba Senco 2.2',caj_x_bulto:16, unid_x_caja:1000, precio_bulto: '700000', cantidad: ''}
                    ],
                    visible:false
                }
            ]
        },
        {
            id_marca: '3',//INDUMA,
            //marca: 'INDUMAx',
            familias: [
                {
                    nombre:'Familia Induma 1', 
                    descuentoPC: 0,

                    productos: [
                        {id: 12, codigo:'XYZ', nombre: 'Prueba Induma 1.1', precio_bulto: '600000', cantidad: ''},
                        {id: 13, codigo:'YTT', nombre: 'Prueba Induma 1.2', precio_bulto: '700000', cantidad: ''}
                    ],
                    visible:false
                },
                {
                    nombre:'Familia Senco 2',
                    descuentoPC: 0, 
                    productos: [
                        {id: 14, codigo:'XYZ', nombre: 'Prueba Induma 2.1', precio_bulto: '600000', cantidad: ''},
                        {id: 15, codigo:'YTT', nombre: 'Prueba Induma 2.2', precio_bulto: '700000', cantidad: ''}
                    ],
                    visible:false
                }
            ]
        }
    ]; 

    // data catalogo v2.02
    


    // Pedidos
    var dataPedidos = [
        {
            id:'203',
            status: 'enviado',
            n_orden_cliente: 'XYZ122',
            cond_pago: 'contado',
            despacho:'',
            observaciones:'',
            total: 4500000,
            cliente: {
                id_cliente: '3',
                razon_social: 'Litani Import',
            },
            productos: [],
            created_at:'2017-05-01'
        },
        {
            id:'204',
            status: 'no_enviado',
            n_orden_cliente: '56522',
            cond_pago: 'contado',
            despacho:'',
            observaciones:'',
            total: 8200000,
            cliente: {
                id_cliente: '4',
                razon_social: 'Tambotorca',
            },
            productos: [],
            created_at:'2017-05-02'
        },
        {
            id:'205',
            status: 'enviado',
            n_orden_cliente: 'XYZ122',
            cond_pago: 'contado',
            despacho:'',
            observaciones:'',
            total: 2100000,
            cliente: {
                id_cliente: '3',
                razon_social: 'Hierro San Felix',
            },
            productos: [],
            created_at:'2017-05-03'
        },
        {
            id:'206',
            status: 'no_enviado',
            n_orden_cliente: '56522',
            cond_pago: 'contado',
            despacho:'',
            observaciones:'',
            total: 3300000,
            cliente: {
                id_cliente: '4',
                razon_social: 'Tambotorca',
            },
            productos: [],
            created_at:'2017-05-03'
        }

    ]



