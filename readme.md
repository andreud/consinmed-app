# Cambios en la bd (reporducir los relevantes en el backend)

- Agregado el campo pedidos.iva_pc (falta backend)
- Agregado el campo pedidos.mod_pago (falta backend)
- Agreagdo el campo pedidos_familias_productos.descuento_pc (falta backend )
- Agregado el campo pedidos.tipo_cliente (falta backend)
- Agregado el campo producto.precio_bulto_dist (falta backend y sync)


# Por hacer
- En descuento porcentual a nivel de producto:
	- permitir seleccionar un mismo porcentaje de descuento a todos los productos de una familia
	- mostrar el monto descontado por familia en pedido-actual y pedido-guardado
	- Agregar campo pedidos_familias_productos.descuento_monto
- Agregar campo clientes.tipo_cliente para usar como valor por defecto al iniciar el pedidos  
- Sync: 
	- Borrar items en el app si se borrraron en el panel
	- Subir pedidos
	- Autenticacion
- 
- Permitir pedidos con productos de varias familias


# Haciendo


# Notas Cambios para consinmed 

## Notas

- Antes de instalar la nueva version de la aplicacion, deben desinstalar las versiones anteriroes presentes en el dispositivo.
- La base de datos estara inicialmente vacia tras instalar la nueva version, debe tocar el boton de Sincronizar Data para obtener la data del servidor. 

## Cambios

- Agregado el campo "Tipo de Cliente" (fabricante/distribuidor) a los pedidos. 
- Agregado el campo "Modalidad de Pago" (cheque/transferencia) a los pedidos. 
- Agregado el campo "Precio Distribuidor" a los productos, el pedido usa esos precios si el tipo de cliente es Distribuidor
- El porcentaje de IVA puede tener cualqueir valor, el valor sugerido cambia de acuerdo a condiciones del campo modalidad de pago y la base imponible.
- Descuentos porcentuales a nivel de Producto.
- Los porcentajes de descuento global y por producto llegan hasta 50%, las condiciones de pago hasta 30 dias. 
 