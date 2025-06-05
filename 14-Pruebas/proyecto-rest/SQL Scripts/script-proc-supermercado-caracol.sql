use super_caracol
go

CREATE OR ALTER PROCEDURE enviar_informacion_sucursales
AS
BEGIN
    SELECT JSON_SUCURSALES = (
        SELECT 
            nomSucursal = s.nom_sucursal,
            calle = s.calle,
            nroCalle = s.nro_calle,
            telefonos = s.telefonos,
            coordLatitud = s.coord_latitud,
            coordLongitud = s.coord_longitud,
            horarioSucursal = ISNULL((
                SELECT 
				  CASE
					WHEN COUNT(*) = 7 THEN 'Lun a Dom de ' + CONVERT(VARCHAR(5), MIN(hora_desde), 108) + ' a ' + CONVERT(VARCHAR(5), MAX(hora_hasta), 108) + ' hs'
					WHEN COUNT(*) = 6 THEN 'Lun a Sab de ' + CONVERT(VARCHAR(5), MIN(hora_desde), 108) + ' a ' + CONVERT(VARCHAR(5), MAX(hora_hasta), 108) + ' hs'
					ELSE 'Lun a Vie de ' + CONVERT(VARCHAR(5), MIN(hora_desde), 108) + ' a ' + CONVERT(VARCHAR(5), MAX(hora_hasta), 108) + ' hs'
				  END
				FROM horarios_sucursales hs
                WHERE hs.nro_sucursal = s.nro_sucursal
                GROUP BY hs.nro_sucursal
            ), 'Horario no disponible'), 
            serviciosDisponibles = ISNULL((
                SELECT '[' + STRING_AGG(ts.nom_tipo_servicio, ', ') + ']'
                FROM tipos_servicios_sucursales tss
                JOIN tipos_servicios_supermercado ts ON tss.nro_tipo_servicio = ts.nro_tipo_servicio
                WHERE tss.nro_sucursal = s.nro_sucursal AND tss.vigente = 1
            ), '[]'), 
            nroLocalidad = s.nro_localidad
        FROM sucursales s
        WHERE s.habilitada = 1
        FOR JSON PATH
    );
END;
GO

execute enviar_informacion_sucursales
go


CREATE OR ALTER PROCEDURE enviar_informacion_productos_sucursales
AS
BEGIN
    SELECT JSON_PRODUCTOS_SUCURSALES = (
    SELECT 
        codBarra = p.cod_barra,
        nomProducto = p.nom_producto,
        descProducto = p.desc_producto,
        nroCategoria = p.nro_categoria,
        imagen = p.imagen,
        nomMarca = mp.nom_marca,
        nomTipoProducto = tp.nom_tipo_producto,
		nomSucursal = s.nom_sucursal
    FROM productos_sucursales ps
	INNER JOIN productos p on ps.cod_barra = p.cod_barra
	INNER JOIN sucursales s on ps.nro_sucursal = s.nro_sucursal
	INNER JOIN tipos_productos tp on p.nro_tipo_producto = tp.nro_tipo_producto
	INNER JOIN marcas_productos mp on p.nro_marca = mp.nro_marca
	WHERE p.vigente = 1
    FOR JSON PATH)
END;
GO

execute enviar_informacion_productos
GO

CREATE OR ALTER PROCEDURE enviar_informacion_precios
AS
BEGIN
	SELECT JSON_PRECIOS = (
    SELECT 
        nomSucursal = s.nom_sucursal,
        codBarra = ps.cod_barra,
        precio = ps.precio
    FROM productos_sucursales ps
	INNER JOIN sucursales s on ps.nro_sucursal = s.nro_sucursal
	WHERE ps.vigente = 1
    FOR JSON PATH)
END;

execute enviar_informacion_precios
GO