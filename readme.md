# Cambios en la bd (reporducir los relevantes en el backend)

- Agregado el campo pedidos.iva_pc (falta backend)
- Agregado el campo pedidos.mod_pago (falta backend)
- Agregado el campo pedidos.tipo_cliente (falta backend)
- Agregado el campo producto.precio_bulto_dist (falta backend y sync)

por hacer

- Agreagr el campo pedidos_familias_productos.descuento_pc ?


Notas para consinmed 

- Agregado el campo "Tipo de Cliente" (fabricante/distribuidor) a los pedidos. 
- Agregado el campo "Modalidad de Pago" (cheque/transferencia) a los pedidos. 
- El porcentaje de IVA puede tener cualqueir valor, el valor sugerido cambia de acuerdo a condiciones del campo modalidad de pago y la base imponible.
- Los porcentajes de descuento global y por producto llegan hasta 50%.

- Agregado el campo "Precio Distribuidor" a los productos...


haciendo
-el tipo de cliente que se seleccione debe afectar a si se muetsra precio_bulto o precio_bulto_dist
en catalogo y pedido-actual
-descuento porcentual a nivel de producto








