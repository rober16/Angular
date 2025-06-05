use indec
go

----------------------------------------------------------------------------------------------------
-- Seccion Sucursales
----------------------------------------------------------------------------------------------------

/*Get sucursales por localidad*/
create or alter procedure dbo.get_sucursales
(
	@nro_localidad integer
)
as
begin
  select nroSupermercado = nro_supermercado,
         nroSucursal = nro_sucursal,
         nomSucursal = nom_sucursal,
         calle = calle,
         nroCalle = nro_calle,
         telefonos = telefonos,
         coordLatitud = coord_latitud,
         coordLongitud = coord_longitud,
         horarioSucursal = horario_sucursal,
         serviciosDisponibles = servicios_disponibles,
         nroLocalidad = nro_localidad,
         habilitada = habilitada
    from dbo.sucursales (nolock)
	where nro_localidad = @nro_localidad
   order by nro_sucursal

end
go


create or alter procedure dbo.get_provincias
as
begin

  select codProvincia = cod_provincia,
         nomProvincia = nom_provincia
    from dbo.provincias (nolock)
   order by nom_provincia

end
go

create or alter procedure dbo.get_localidades
(
    @cod_provincia	varchar(3) = null
)
as
begin
  select nroLocalidad = nro_localidad,
         nomLocalidad = nom_localidad,
		 codPais      = cod_pais,
		 codProvincia = cod_provincia
    from dbo.localidades (nolock)
   where (cod_provincia = @cod_provincia or @cod_provincia is null)
   order by nro_localidad   
end
go



----------------------------------------------------------------------------------------------------
-- Seccion Productos
----------------------------------------------------------------------------------------------------

--execute get_rubros @cod_idioma = 2
create or alter procedure dbo.get_rubros
(
	@cod_idioma integer
)
as
begin

  select nroRubro = nro_rubro,
         nomRubro = rubro
    from dbo.idioma_rubros_productos (nolock)
	where cod_idioma = @cod_idioma
   order by rubro
end
go

--execute get_categorias @nro_rubro = 1 , @cod_idioma = 1
create or alter procedure dbo.get_categorias
(
	@nro_rubro INTEGER,
	@cod_idioma integer
)
as
begin
  select nroCategoria = icp.nro_categoria,
         nomCategoria = icp.categoria,
		 nroRubro = cp.nro_rubro
    from dbo.categorias_productos cp (nolock)
	join dbo.idiomas_categorias_productos icp
	on cp.nro_categoria = icp.nro_categoria
	where cp.nro_rubro = @nro_rubro and icp.cod_idioma = @cod_idioma
   order by nroCategoria
end
go


create or alter procedure dbo.get_productos
as
begin
    select 
        codBarra = p.cod_barra,
        nomProducto = p.nom_producto,
        nomMarca = m.nom_marca,
        imagen = p.imagen
    from 
        productos p
    inner join 
        marcas_productos m on p.nro_marca = m.nro_marca
    where 
        p.vigente = 1 
        and m.vigente = 1
    order by 
        p.nom_producto;
end
go

-- execute get_marcas
create or alter procedure dbo.get_marcas
as
begin

  select nroMarca = nro_marca,
         nomMarca = nom_marca
    from dbo.marcas_productos (nolock)
   order by nom_marca

end
go

-- execute get_tipos_productos @cod_idioma = 2
create or alter procedure dbo.get_tipos_productos
(
	@cod_idioma integer
)
as
begin

  select nroTipoProducto = nro_tipo_producto,
         nomTipoProducto = tipo_producto
    from dbo.idiomas_tipos_productos (nolock)
	where cod_idioma = @cod_idioma
   order by tipo_producto
end
go


--execute comparar_precios @nro_localidad = 1, @cod_barras = '10000001, 10000002'
--execute comparar_precios @nro_localidad = 1, @cod_barras = '50000001,60000001,70000001,60000002'

CREATE OR ALTER PROCEDURE comparar_precios
    @nro_localidad INT,
    @cod_barras VARCHAR(MAX)
AS
BEGIN
    -- Convertir la cadena de códigos de barra en una tabla
    DECLARE @Barras TABLE (cod_barra VARCHAR(13));
    INSERT INTO @Barras (cod_barra)
    SELECT value FROM STRING_SPLIT(@cod_barras, ',');

    WITH ProductosSupermercado AS (
        SELECT
            p.cod_barra AS codBarra,  -- Consistente con la consulta final
            p.nom_producto AS nomProducto, -- Corregido el nombre
            p.imagen,
            s.nro_supermercado AS nroSupermercado,
            s.razon_social AS nomSupermercado,
            MIN(ps.precio) AS precio  -- Precio mínimo para cada producto en cada supermercado
        FROM
            productos p
        JOIN
            productos_supermercados ps ON p.cod_barra = ps.cod_barra
        JOIN
            sucursales suc ON ps.nro_supermercado = suc.nro_supermercado AND ps.nro_sucursal = suc.nro_sucursal
        JOIN
            supermercados s ON ps.nro_supermercado = s.nro_supermercado
        WHERE
            suc.nro_localidad = @nro_localidad AND p.cod_barra IN (SELECT cod_barra FROM @Barras)
        GROUP BY
            p.cod_barra, p.nom_producto, p.imagen, s.nro_supermercado, s.razon_social
    ),
    TotalesSupermercado AS (
        SELECT
            ps.nomSupermercado,
            SUM(ps.precio) AS totalXSupermercado
        FROM
            ProductosSupermercado ps
        GROUP BY
            ps.nomSupermercado
    )
    SELECT 
        ps.codBarra,  -- Consistente
        ps.nomProducto, -- Consistente
        ps.imagen,
        ps.nomSupermercado,
        ps.precio,
        ts.totalXSupermercado,
        CASE
            WHEN ps.precio = MIN(ps.precio) OVER (PARTITION BY ps.codBarra) THEN 1  -- Comparar entre todos los supermercados
            ELSE 0
        END AS esMejorPrecio,
         CASE
            WHEN ps.nomSupermercado IN (
                SELECT nomSupermercado
                FROM ProductosSupermercado
                GROUP BY nomSupermercado
                HAVING COUNT(DISTINCT codBarra) = (SELECT COUNT(*) FROM @Barras)
            )
            AND ts.totalXSupermercado = (
                SELECT MIN(totalXSupermercado)
                FROM TotalesSupermercado
                WHERE nomSupermercado IN (
                    SELECT nomSupermercado
                    FROM ProductosSupermercado
                    GROUP BY nomSupermercado
                    HAVING COUNT(DISTINCT codBarra) = (SELECT COUNT(*) FROM @Barras)
                )
            ) THEN 1
            ELSE 0
        END AS superGanador

    FROM ProductosSupermercado ps
    JOIN TotalesSupermercado ts ON ps.nomSupermercado = ts.nomSupermercado
    ORDER BY ps.nomSupermercado, ps.codBarra;
END;
GO

--execute buscar_productos @filtro= 'pan'
--execute buscar_productos @filtro = 'Pan', @filtro_categorias = '1', @filtro_marca = '3', @filtro_tipo = '5'
--execute buscar_productos @filtro = null, @filtro_categorias = null, @filtro_marca = null, @filtro_tipo = '5'

CREATE OR ALTER PROCEDURE buscar_productos(@filtro VARCHAR(255) = NULL, @filtro_categorias VARCHAR(255) = NULL, @filtro_marca VARCHAR(255) = NULL, @filtro_tipo VARCHAR(255) = NULL)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT p.cod_barra, p.nom_producto, p.desc_producto, mp.nom_marca, tp.nom_tipo_producto, p.imagen
    FROM productos AS p
    INNER JOIN marcas_productos AS mp ON p.nro_marca = mp.nro_marca
    INNER JOIN tipos_productos AS tp ON p.nro_tipo_producto = tp.nro_tipo_producto
    INNER JOIN categorias_productos AS cp ON p.nro_categoria = cp.nro_categoria
    INNER JOIN rubros_productos AS rp ON cp.nro_rubro = rp.nro_rubro
    WHERE (p.nom_producto LIKE '%' + ISNULL(@filtro, '') + '%'
       OR mp.nom_marca LIKE '%' + ISNULL(@filtro, '') + '%'
       OR tp.nom_tipo_producto LIKE '%' + ISNULL(@filtro, '') + '%') -- Manejo de @filtro NULL
       AND (ISNULL(@filtro_categorias, '') = '' OR cp.nro_categoria IN (SELECT value FROM STRING_SPLIT(ISNULL(@filtro_categorias,''), ','))) -- Manejo de @filtro_categorias NULL
       AND (ISNULL(@filtro_marca, '') = '' OR mp.nro_marca IN (SELECT value FROM STRING_SPLIT(ISNULL(@filtro_marca,''), ',')))  -- Manejo de @filtro_marca NULL
       AND (ISNULL(@filtro_tipo, '') = '' OR tp.nro_tipo_producto IN (SELECT value FROM STRING_SPLIT(ISNULL(@filtro_tipo,''), ','))) -- Manejo de @filtro_tipo NULL

    UNION

    SELECT p.cod_barra, p.nom_producto, p.desc_producto, mp.nom_marca, tp.nom_tipo_producto, p.imagen
    FROM productos AS p
    INNER JOIN marcas_productos AS mp ON p.nro_marca = mp.nro_marca
    INNER JOIN tipos_productos AS tp ON p.nro_tipo_producto = tp.nro_tipo_producto
    INNER JOIN categorias_productos AS cp ON p.nro_categoria = cp.nro_categoria
    INNER JOIN rubros_productos AS rp ON cp.nro_rubro = rp.nro_rubro
    WHERE mp.nom_marca LIKE '%' + ISNULL(@filtro, '') + '%'  -- Manejo de @filtro NULL en la segunda parte del UNION
       AND (ISNULL(@filtro_categorias, '') = '' OR cp.nro_categoria IN (SELECT value FROM STRING_SPLIT(ISNULL(@filtro_categorias,''), ',')))-- Manejo de @filtro_categorias NULL
       AND (ISNULL(@filtro_marca, '') = '' OR mp.nro_marca IN (SELECT value FROM STRING_SPLIT(ISNULL(@filtro_marca,''), ','))) -- Manejo de @filtro_marca NULL
       AND (ISNULL(@filtro_tipo, '') = '' OR tp.nro_tipo_producto IN (SELECT value FROM STRING_SPLIT(ISNULL(@filtro_tipo,''), ','))) -- Manejo de @filtro_tipo NULL
END;
GO


----------------------------------------------------------------------------------------------------
-- Seccion Servicios
----------------------------------------------------------------------------------------------------

create or alter procedure dbo.get_servicios
as
begin

  select 
		nroSupermercado = ss.nro_supermercado,
        urlServicio = ss.url_servicio,
        tipoServicio = ss.tipo_servicio,
        tokenServicio = ss.token_servicio,
        fechaUltActServicio = ss.fecha_ult_act_servicio,
		nameSpaceSoap = iss.namespace_soap,
		serviceNameSoap = iss.servicename_soap,
		portNameSoap = iss.portname_soap
    from servicios_supermercados ss (nolock)
	left join servicios_soap_supermercados iss on ss.nro_supermercado = iss.nro_supermercado
end
go

----------------------------------------------------------------------------------------------------
-- Seccion Batch
----------------------------------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE dbo.sp_abm_sucursales
    @json_sucursales NVARCHAR(MAX),
    @nro_supermercado INTEGER
AS
BEGIN
    -- Variables para el control de errores
    DECLARE @error_message NVARCHAR(MAX);
    DECLARE @error_number INTEGER;

    BEGIN TRY
        -- Convertir el JSON a una tabla temporal
        CREATE TABLE #SucursalesTemp (
            nomSucursal VARCHAR(255),
            calle VARCHAR(255),
            nroCalle INTEGER,
            telefonos VARCHAR(50),
            coordLatitud VARCHAR(255),
            coordLongitud VARCHAR(255),
            nroLocalidad INTEGER,
            horarioSucursal VARCHAR(255),
            serviciosDisponibles VARCHAR(255)
        );

        INSERT INTO #SucursalesTemp
        SELECT *
        FROM OPENJSON(@json_sucursales)
        WITH (
            nomSucursal VARCHAR(255) '$.nomSucursal',
            calle VARCHAR(255) '$.calle',
            nroCalle INTEGER '$.nroCalle',
            telefonos VARCHAR(50) '$.telefonos',
            coordLatitud VARCHAR(255) '$.coordLatitud',
            coordLongitud VARCHAR(255) '$.coordLongitud',
            nroLocalidad INTEGER '$.nroLocalidad',
            horarioSucursal VARCHAR(255) '$.horarioSucursal',
            serviciosDisponibles VARCHAR(255) '$.serviciosDisponibles'
        );

        -- Dar de baja las sucursales que no estén en el JSON
        UPDATE s
        SET habilitada = 0
        FROM dbo.sucursales s
        WHERE s.nro_supermercado = @nro_supermercado
          AND NOT EXISTS (
              SELECT 1
              FROM #SucursalesTemp st
              WHERE st.nomSucursal = s.nom_sucursal
                AND st.calle = s.calle
                AND ISNULL(st.nroCalle, 0) = ISNULL(s.nro_calle,0)
                AND st.telefonos = s.telefonos
                AND st.coordLatitud = s.coord_latitud
                AND st.coordLongitud = s.coord_longitud
                AND st.nroLocalidad = s.nro_localidad
                AND st.horarioSucursal = s.horario_sucursal
                AND st.serviciosDisponibles = s.servicios_disponibles
          );

        -- Insertar o actualizar las sucursales del JSON
        MERGE INTO dbo.sucursales AS target
        USING #SucursalesTemp AS source
        ON (target.nro_supermercado = @nro_supermercado 
            AND target.nom_sucursal = source.nomSucursal 
            AND target.calle = source.calle 
            AND ISNULL(target.nro_calle,0) = ISNULL(source.nroCalle,0)
            AND target.telefonos = source.telefonos 
            AND target.coord_latitud = source.coordLatitud 
            AND target.coord_longitud = source.coordLongitud 
            AND target.nro_localidad = source.nroLocalidad
			AND target.horario_sucursal = source.horarioSucursal
            AND target.servicios_disponibles = source.serviciosDisponibles)
        WHEN MATCHED THEN
            UPDATE SET 
                target.habilitada = 1  -- Reactivar si estaba deshabilitada
        WHEN NOT MATCHED THEN
            INSERT (nro_supermercado, nom_sucursal, calle, nro_calle, telefonos, coord_latitud, coord_longitud, nro_localidad, horario_sucursal, servicios_disponibles)
            VALUES (@nro_supermercado, source.nomSucursal, source.calle, source.nroCalle, source.telefonos, source.coordLatitud, source.coordLongitud, source.nroLocalidad, source.horarioSucursal, source.serviciosDisponibles);

        -- Eliminar la tabla temporal
        DROP TABLE #SucursalesTemp;
        END TRY
        BEGIN CATCH
            -- Capturar errores
            SELECT @error_message = ERROR_MESSAGE(), @error_number = ERROR_NUMBER();

            -- Revertir la transacción si ocurre un error
            IF @@TRANCOUNT > 0
                ROLLBACK TRANSACTION;

            -- Lanzar una excepción con información del error
            THROW;
            RETURN -1; -- Indicar fallo
        END CATCH;

    RETURN 0; -- Indicar éxito
END;
GO




CREATE or ALTER PROCEDURE dbo.sp_abm_productos_sucursales
    @json_productos NVARCHAR(MAX),
    @nro_supermercado INT
AS
BEGIN
    -- Declarar tabla temporal
    CREATE TABLE #ProductosTemp (
        codBarra VARCHAR(13),
        nomProducto VARCHAR(255),
        descProducto VARCHAR(500),
        nroCategoria INT,
        imagen VARCHAR(255),
        nomMarca VARCHAR(255),
        nomTipoProducto VARCHAR(255),
        nomSucursal VARCHAR(255)
    );

    -- Insertar datos del JSON
    INSERT INTO #ProductosTemp
    SELECT *
    FROM OPENJSON(@json_productos)
    WITH (
        codBarra VARCHAR(13) '$.codBarra',
        nomProducto VARCHAR(255) '$.nomProducto',
        descProducto VARCHAR(500) '$.descProducto',
        nroCategoria INT '$.nroCategoria',
        imagen VARCHAR(255) '$.imagen',
        nomMarca VARCHAR(255) '$.nomMarca',
        nomTipoProducto VARCHAR(255) '$.nomTipoProducto',
        nomSucursal VARCHAR(255) '$.nomSucursal'
    );

    -- MERGE para marcas_productos
    MERGE INTO marcas_productos AS Target
    USING (SELECT DISTINCT nomMarca FROM #ProductosTemp) AS Source
    ON Target.nom_marca = Source.nomMarca
    WHEN NOT MATCHED THEN INSERT (nom_marca) VALUES (Source.nomMarca);

    -- MERGE para tipos_productos
    MERGE INTO tipos_productos AS Target
    USING (SELECT DISTINCT nomTipoProducto FROM #ProductosTemp) AS Source
    ON Target.nom_tipo_producto = Source.nomTipoProducto
    WHEN NOT MATCHED THEN INSERT (nom_tipo_producto) VALUES (Source.nomTipoProducto);

    -- MERGE para tipos_productos_marcas
    MERGE INTO tipos_productos_marcas AS Target
    USING (
        SELECT DISTINCT mp.nro_marca, tp.nro_tipo_producto
        FROM #ProductosTemp pt
        JOIN marcas_productos mp ON pt.nomMarca = mp.nom_marca
        JOIN tipos_productos tp ON pt.nomTipoProducto = tp.nom_tipo_producto
    ) AS Source
    ON Target.nro_marca = Source.nro_marca AND Target.nro_tipo_producto = Source.nro_tipo_producto
    WHEN NOT MATCHED THEN INSERT (nro_marca, nro_tipo_producto, vigente) VALUES (Source.nro_marca, Source.nro_tipo_producto, 1);

    -- MERGE para productos (con actualización de vigente)
    MERGE INTO productos AS Target
    USING (
        SELECT DISTINCT pt.codBarra, pt.nomProducto, pt.descProducto, pt.nroCategoria, pt.imagen, mp.nro_marca, tp.nro_tipo_producto
        FROM #ProductosTemp pt
        JOIN marcas_productos mp ON pt.nomMarca = mp.nom_marca
        JOIN tipos_productos tp ON pt.nomTipoProducto = tp.nom_tipo_producto
    ) AS Source
    ON Target.cod_barra = Source.codBarra
    WHEN NOT MATCHED THEN
        INSERT (cod_barra, nom_producto, desc_producto, nro_categoria, imagen, nro_marca, nro_tipo_producto, vigente)
        VALUES (Source.codBarra, Source.nomProducto, Source.descProducto, Source.nroCategoria, Source.imagen, Source.nro_marca, Source.nro_tipo_producto, 1)
    WHEN MATCHED THEN
        UPDATE SET 
            Target.nom_producto = Source.nomProducto,
            Target.desc_producto = Source.descProducto,
            Target.nro_categoria = Source.nroCategoria,
            Target.imagen = Source.imagen,
            Target.nro_marca = Source.nro_marca,
            Target.nro_tipo_producto = Source.nro_tipo_producto,
            Target.vigente = 1;  -- Los productos en el JSON siempre están vigentes


    -- Dar de baja los productos que NO están en el JSON para este supermercado
    UPDATE p
    SET vigente = 0
    FROM productos p
    WHERE NOT EXISTS (
        SELECT 1
        FROM #ProductosTemp pt
        WHERE pt.codBarra = p.cod_barra
    )
    AND EXISTS ( -- Verificar que el producto esté asociado al supermercado
        SELECT 1
        FROM productos_supermercados ps
        WHERE ps.cod_barra = p.cod_barra AND ps.nro_supermercado = @nro_supermercado
    );

    -- Insertar en productos_supermercados (con manejo de duplicados y fecha actual)
    INSERT INTO productos_supermercados (nro_supermercado, nro_sucursal, cod_barra, fecha_ult_actualizacion)
    SELECT @nro_supermercado, s.nro_sucursal, pt.codBarra, GETDATE()
    FROM #ProductosTemp pt
    JOIN sucursales s ON pt.nomSucursal = s.nom_sucursal
    WHERE NOT EXISTS (
        SELECT 1
        FROM productos_supermercados ps
        WHERE ps.nro_supermercado = @nro_supermercado
          AND ps.nro_sucursal = s.nro_sucursal
          AND ps.cod_barra = pt.codBarra
    );

    -- Eliminar la tabla temporal
    DROP TABLE #ProductosTemp;
END;
GO


CREATE OR ALTER PROCEDURE sp_abm_precios 
    @json_precios NVARCHAR(MAX),
    @nro_supermercado INT
AS
BEGIN
    -- Declarar tabla temporal para almacenar los datos del JSON
    CREATE TABLE #PreciosTemp (
        nomSucursal VARCHAR(255),
        codBarra VARCHAR(13),
        precio DECIMAL(10, 2)
    );

    -- Insertar datos del JSON a la tabla temporal
    INSERT INTO #PreciosTemp (nomSucursal, codBarra, precio)
    SELECT nomSucursal, codBarra, precio
    FROM OPENJSON(@json_precios)
    WITH (
        nomSucursal VARCHAR(255) '$.nomSucursal',
        codBarra VARCHAR(13) '$.codBarra',
        precio DECIMAL(10, 2) '$.precio'
    );

    -- Actualizar la tabla productos_supermercados
    UPDATE ps
    SET ps.precio = pt.precio,
        ps.fecha_ult_actualizacion = GETDATE()
    FROM dbo.productos_supermercados ps
    INNER JOIN #PreciosTemp pt ON ps.cod_barra = pt.codBarra
    INNER JOIN dbo.sucursales s ON ps.nro_supermercado = s.nro_supermercado AND ps.nro_sucursal = s.nro_sucursal
    WHERE ps.nro_supermercado = @nro_supermercado AND s.nom_sucursal = pt.nomSucursal
      AND ps.precio IS NULL; -- Solo actualiza si el precio es NULL


    -- Manejo de errores (opcional, pero recomendado)
    IF @@ROWCOUNT = 0
    BEGIN
        -- No se actualizaron filas, posiblemente por datos incorrectos en el JSON o en las tablas relacionadas.
        -- Puedes agregar lógica para manejar este caso, como lanzar un error o registrar un mensaje.
        -- Ejemplo:
        -- RAISERROR('No se encontraron registros para actualizar.', 16, 1)
        PRINT 'No se encontraron registros para actualizar o los precios ya estaban cargados.'
    END;

    -- Eliminar la tabla temporal
    DROP TABLE #PreciosTemp;
END;
GO