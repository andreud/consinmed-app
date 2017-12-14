# Cambios en la bd (reporducir los relevantes en el backend)

- Agregado el campo pedidos.iva_pc (falta backend)
- Agregado el campo pedidos.mod_pago (falta backend)
- Agregado el campo pedidos.tipo_cliente (falta backend)
- Agregado el campo producto.precio_bulto_dist (falta backend y sync)
- Agreagdo el campo pedidos_familias_productos.descuento_pc (falta backend )

# Por hacer
-descuento porcentual a nivel de producto
	- permitir seleccionar un porcentaje de descuento a todos los productos de una familia
	- mostrar el monto descontado por familia en pedido-actual y pedido-guardado
-Sync: 
-- Borrar items en el app si se borrraron en el panel
-- Subir pedido
-- Autenticacion


# Haciendo
-el tipo de cliente que se seleccione debe afectar a si se muetsra precio_bulto o precio_bulto_dist
en catalogo y pedido-actual




# Notas para consinmed 

- Agregado el campo "Tipo de Cliente" (fabricante/distribuidor) a los pedidos. 
- Agregado el campo "Modalidad de Pago" (cheque/transferencia) a los pedidos. 
- El porcentaje de IVA puede tener cualqueir valor, el valor sugerido cambia de acuerdo a condiciones del campo modalidad de pago y la base imponible.
- Descuentos porcentuales a nivel de Producto.
- Los porcentajes de descuento global y por producto llegan hasta 50%, condicioens de pago hasta 30 dias. 
- Agregado el campo "Precio Distribuidor" a los productos...