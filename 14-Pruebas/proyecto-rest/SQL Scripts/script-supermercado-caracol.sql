use super_caracol
go

-- Eliminar tablas si existen
-- Inicio del lote

-- Tablas dependientes de otras
DROP TABLE IF EXISTS dbo.tipos_servicios_sucursales;
DROP TABLE IF EXISTS dbo.horarios_sucursales;
DROP TABLE IF EXISTS dbo.productos_sucursales;
DROP TABLE IF EXISTS dbo.tipos_productos_marcas;

-- Tablas con menos dependencias
DROP TABLE IF EXISTS dbo.tipos_servicios_supermercado; -- Después de tipos_servicios_sucursales
DROP TABLE IF EXISTS dbo.productos; -- Después de productos_sucursales
DROP TABLE IF EXISTS dbo.tipos_productos; -- Después de tipos_productos_marcas
DROP TABLE IF EXISTS dbo.sucursales; -- Después de productos_sucursales, tipos_servicios_sucursales y horarios_sucursales
DROP TABLE IF EXISTS dbo.categorias_productos;
DROP TABLE IF EXISTS dbo.marcas_productos; -- Después de tipos_productos_marcas

-- Tablas base
DROP TABLE IF EXISTS dbo.rubros_productos; -- Después de categorias_productos
DROP TABLE IF EXISTS dbo.empresas_externas;
DROP TABLE IF EXISTS dbo.localidades;
DROP TABLE IF EXISTS dbo.provincias;
DROP TABLE IF EXISTS dbo.paises; -- Después de provincias
DROP TABLE IF EXISTS dbo.supermercados; --  Al final, ya que no tiene dependencias


-- Fin del lote

/* -------------------------------------
   Tabla: supermercado
   ------------------------------------- */
create table dbo.supermercados
(
   cuit varchar(11) not null,
   razon_social varchar(255) not null,
   calle varchar(255),
   nro_calle int,
   telefonos varchar(255),
   constraint PK__supermercados__END primary key(cuit)
)
go

insert into dbo.supermercados(cuit, razon_social, calle, nro_calle, telefonos) values
('78923', 'Super Caracol','Av. Hipólito Yrigoyen', 212,'03571427902')
go

/* -------------------------------------
   Tabla: paises
   ------------------------------------- */
create table dbo.paises
(
   cod_pais varchar(3) not null,
   nom_pais varchar(255) not null,
   constraint PK__paises__END primary key(cod_pais)
)
go

insert into dbo.paises(cod_pais, nom_pais) values
      ('AR', 'ARGENTINA'),
      ('BO', 'BOLIVIA'),
      ('BR', 'BRASIL'),
      ('CH', 'CHILE'),
      ('PY', 'PARAGUAY'),
      ('UY', 'URUGUAY')
go	

/* -------------------------------------
   Tabla: provincias
   ------------------------------------- */
create table dbo.provincias
(
    cod_pais varchar(3)	not null,
    cod_provincia varchar(3) not null,
    nom_provincia varchar(255) not null,
    constraint PK__provincias__END primary key(cod_pais, cod_provincia),
    constraint FK__provincias__paises__END foreign key(cod_pais) references dbo.paises
)
go

insert into dbo.provincias (cod_pais, cod_provincia, nom_provincia) values
('AR', 'B', 'BUENOS AIRES'),
('AR', 'C', 'CATAMARCA'),
('AR', 'X', 'CORDOBA'),
('AR', 'P', 'LA PAMPA'),
('AR', 'L', 'SAN LUIS'),
('AR', 'F', 'SANTA FE'),
('AR', 'SE', 'SANTIAGO DEL ESTERO'),
('AR', 'SJ', 'SAN JUAN');
go

/* -------------------------------------
   Tabla: localidades
   ------------------------------------- */
create table dbo.localidades
(
   nro_localidad integer not null identity(1,1),
   nom_localidad varchar(255) not null,
   cod_pais varchar(3)	not null,
   cod_provincia varchar(3) null,
   constraint PK__localidades__END primary key(nro_localidad),
	constraint FK__localidades__paises__END foreign key(cod_pais) references dbo.paises,
	constraint FK__localidades__provincias__END foreign key(cod_pais, cod_provincia) references dbo.provincias,
	constraint UK__localidades__provincias__END unique(cod_pais, cod_provincia, nom_localidad)
)
go

insert into dbo.localidades (nom_localidad, cod_pais, cod_provincia) values
('CAPITAL', 'AR', 'X'),
('DUMESNIL', 'AR', 'X'),
('MENDIOLAZA', 'AR', 'X'),
('LA CALERA', 'AR', 'X'),
('RÍO CEBALLOS', 'AR', 'X'),
('UNQUILLO', 'AR', 'X'),
('SALDÁN', 'AR', 'X'),
('VILLA ALLENDE', 'AR', 'X'),
('RIO TERCERO', 'AR', 'X'),
('ALMAFUERTE', 'AR', 'X'),
('EMBALSE', 'AR', 'X'),
('OLIVA', 'AR', 'X'),
('PINAMAR', 'AR', 'B'),
('BELLA VISTA', 'AR', 'B'),
('FUNES', 'AR', 'F');
GO

/* -------------------------------------
   Tabla: marcas_productos
   ------------------------------------- */
create table dbo.marcas_productos
(
   nro_marca integer not null,
   nom_marca varchar(255) not null,
   vigente smallint,
   constraint PK_marcas_productos primary key(nro_marca)
)
go

-- ---------------------------------------------------------------------------------------------
-- Insertar datos en la tabla marcas_productos

insert into dbo.marcas_productos (nro_marca, nom_marca, vigente) values
-- Panificados y cereales
(1, 'Bimbo', 1),
(2, 'Fargo', 1),
(3, 'Lactal', 1),
(4, 'Bagley', 1),
(5, 'Terrabusi', 1),
(6, 'Granix', 1),
(7, 'Gallo', 1),
(8, 'Molinos Ala', 1),
(9, 'Dos Hermanos', 1),
(10, 'Molinos Cañuelas', 1),
(11, 'Pureza', 1),
(12, 'Morixe', 1),
(13, 'Matarazzo', 1),
(14, 'Don Vicente', 1),
(15, 'Lucchetti', 1),
-- Tubérculos y legumbres
(16, 'McCain', 1),
(17, 'Arcor', 1),
(18, 'La Campagnola', 1),
(19, 'Natura', 1),
-- Frutas y verduras
(20, 'Sin marca', 1),
-- Carnes y proteínas
(21, 'Swift', 1),
(22, 'Paladini', 1),
(23, 'Cabaña Las Lilas', 1),
(24, 'San Sebastián', 1),
(25, 'Granja Tres Arroyos', 1),
-- Lácteos y derivados
(26, 'La Serenísima', 1),
(27, 'Sancor', 1),
(28, 'Ilolay', 1),
(29, 'La Paulina', 1),
(30, 'Milkaut', 1),
(31, 'Verónica', 1),
-- Aceites y grasas
(32, 'Cocinero', 1),
(33, 'Natura', 1),
(34, 'Marolio', 1),
-- Azúcares y dulces
(35, 'Ledesma', 1),
(36, 'Chango', 1),
(37, 'Dominó', 1),
(38, 'La Campagnola', 1),
(39, 'Arcor', 1),
(40, 'La Colina', 1),
-- Bebidas
(41, 'Coca-Cola', 1),
(42, 'Pepsi', 1),
(43, 'Manaos', 1),
(44, 'Cabrales', 1),
(45, 'La Virginia', 1),
(46, 'Bonafide', 1),
(47, 'Taragüí', 1),
(48, 'Rosamonte', 1),
(49, 'Cruz de Malta', 1),
(50, 'Inti Zen', 1);
go

/* -------------------------------------
   Tabla: rubros_productos
   ------------------------------------- */
create table dbo.rubros_productos
(
   nro_rubro integer not null,
   nom_rubro varchar(255) not null,
   vigente smallint,
   constraint PK__rubros_productos__END primary key(nro_rubro)
)
go

-- ------------------------------------------------------------------------------------------
-- Insertar datos en la tabla rubros_productos

insert into rubros_productos (nro_rubro, nom_rubro, vigente) values
(1, 'Panificados y cereales', 1),
(2, 'Tubérculos y legumbres', 1),
(3, 'Frutas y verduras', 1),
(4, 'Carnes y proteínas', 1),
(5, 'Lácteos y derivados', 1),
(6, 'Aceites y grasas', 1),
(7, 'Azúcares y dulces', 1),
(8, 'Bebidas', 1);
go

/* -------------------------------------
   Tabla: categorias_productos
   ------------------------------------- */
create table dbo.categorias_productos
(
   nro_categoria integer not null,
   nom_categoria varchar(255) not null,
   nro_rubro int not null,
   vigente smallint,
   constraint PK_categorias_productos__END primary key(nro_categoria),
   constraint FK__categorias_productos__rubros_productos__END foreign key(nro_rubro) references dbo.rubros_productos
)
go

-- ---------------------------------------------------------------------------------------------
-- Insertar datos en la tabla categorias_productos

insert into categorias_productos (nro_categoria, nom_categoria, nro_rubro, vigente) values
-- Categorías para Panificados y cereales
(1, 'Pan', 1, 1),
(2, 'Galletitas saladas y dulces', 1, 1),
(3, 'Arroz', 1, 1),
(4, 'Harina de trigo y de maíz', 1, 1),
(5, 'Fideos', 1, 1),
-- Categorías para Tubérculos y legumbres
(6, 'Papa', 2, 1),
(7, 'Batata', 2, 1),
(8, 'Legumbres secas (como arvejas y lentejas)', 2, 1),
-- Categorías para Frutas y verduras
(9, 'Hortalizas', 3, 1),
(10, 'Frutas variadas', 3, 1),
-- Categorías para Carnes y proteínas
(11, 'Carnes rojas', 4, 1),
(12, 'Carnes blancas', 4, 1),
(13, 'Huevos', 4, 1),
-- Categorías para Lácteos y derivados
(14, 'Leche', 5, 1),
(15, 'Queso', 5, 1),
-- Categorías para Aceites y grasas
(16, 'Aceites comestibles', 6, 1),
-- Categorías para Azúcares y dulces
(17, 'Azúcar', 7, 1),
(18, 'Dulces', 7, 1),
-- Categorías para Bebidas
(19, 'Bebidas edulcoradas', 8, 1),
(20, 'Bebidas no edulcoradas', 8, 1),
(21, 'Café', 8, 1),
(22, 'Té', 8, 1),
(23, 'Yerba mate', 8, 1);
go

/* -------------------------------------
   Tabla: productos
   ------------------------------------- */
create table dbo.productos 
(
   cod_barra varchar(13) not null,
   nom_producto varchar(255) not null,
   desc_producto varchar(255),
   nro_categoria integer not null,
   imagen varchar(255) null,
   nro_marca integer not null,
   nro_tipo_producto integer not null,
   vigente smallint not null,
   constraint PK_productos__END primary key(cod_barra),
   constraint FK__productos__categorias_productos__END foreign key(nro_categoria) references dbo.categorias_productos
);
go

insert into productos (cod_barra, nom_producto, desc_producto, nro_categoria, imagen, nro_marca, nro_tipo_producto, vigente) values
-- Panificados y cereales
(10000001, 'Pan Blanco', 'Pan blanco de molde', 1, 'assets/productos/pan_bimbo_blanco.jpeg', 1, 2, 1), -- Sin TACC
(10000002, 'Pan Integral', 'Pan integral de molde', 1, 'assets/productos/pan_integral_fargo.jpg', 2, 3, 1), -- Light
(10000003, 'Galletitas Dulces', 'Galletitas dulces clásicas', 2, 'assets/productos/galletas_dulces_bagley.jpeg', 4, 7, 1), -- Sin tipo
(10000004, 'Arroz Clásico', 'Arroz blanco premium', 3, 'assets/productos/arroz_gallo_clasico.jpg', 7, 7, 1), -- Sin tipo
(10000005, 'Fideos', 'Fideos largos de calidad', 5, 'assets/productos/fideos_matarazzo.jpg', 13, 7, 1), -- Sin tipo

-- Tubérculos y legumbres
(20000001, 'Papa Congelada', 'Papas pre-fritas congeladas', 6, 'assets/productos/papas_congeladas_mcain.jpg', 16, 4, 1), -- Congelados
(20000002, 'Lentejas', 'Lentejas secas de alta calidad', 8, 'assets/productos/lentejas_arcor.jpg', 17, 2, 1), -- Sin TACC

-- Carnes y proteínas
(30000001, 'Carne Roja', 'Corte de carne roja premium', 11, 'assets/productos/carne_roja_swift.jpg', 21, 7, 1), -- Sin tipo
(30000002, 'Huevos', 'Maple de huevos frescos de granja', 13, 'assets/productos/huevos_san_sebastian.jpg', 24, 7, 1), -- Sin tipo

-- Lácteos y derivados
(40000001, 'Leche', 'Leche entera pasteurizada', 14, 'assets/productos/leche_serenisima.jpg', 26, 2, 1), -- Sin TACC
(40000002, 'Queso Cremoso', 'Queso cremoso para untar', 15, 'assets/productos/queso_cremoso_paulina.jpg', 29, 7, 1), -- Sin tipo

-- Aceites y grasas
(50000001, 'Aceite', 'Aceite de girasol 100% puro', 16, 'assets/productos/aceite_natura.jpg', 33, 6, 1), -- Ecológicos

-- Azúcares y dulces
(60000001, 'Azúcar', 'Azúcar blanca refinada', 17, 'assets/productos/azucar_ledesma.jpg', 35, 7, 1), -- Sin tipo
(60000002, 'Dulce de Batata', 'Dulce de batata clásico', 18, 'assets/productos/dulce_batata_arcor.jpg', 39, 7, 1), -- Sin tipo

-- Bebidas
(70000001, 'Coca-Cola Light', 'Bebida gaseosa baja en calorías', 19, 'assets/productos/coca_cola_light.jpg', 41, 3, 1), -- Light
(70000002, 'Café', 'Café molido premium', 21, 'assets/productos/cafe_cabrales.jpg', 44, 7, 1), -- Sin tipo
(70000003, 'Yerba Mate', 'Yerba mate tradicional', 23, 'assets/productos/yerba_mate_taragui.jpg', 47, 6, 1); -- Ecológicos
go

/* -------------------------------------
   Tabla: sucursales
   ------------------------------------- */
create table dbo.sucursales
(
   nro_sucursal integer not null identity(1,1),
   nom_sucursal varchar(255) not null,
   calle varchar(255),
   nro_calle integer,
   telefonos varchar(255),
   coord_latitud varchar(255),
   coord_longitud varchar(255),
   nro_localidad integer not null,
   habilitada smallint not null,
   constraint PK_sucursales__END primary key(nro_sucursal),
   constraint FK__sucursales_localidades__END foreign key(nro_localidad) references dbo.localidades
);
go

-- Insertar datos de prueba en sucursales
insert into dbo.sucursales (nom_sucursal, calle, nro_calle, telefonos, coord_latitud, coord_longitud, nro_localidad, habilitada) values 
('Supermercado Caracol Sucursal I', 'Liniers', 55, '03571557338', -32.17196376173448, -64.10730901505617, 9, 1),
('Supermercado Caracol Sucursal II', 'Hipólito Yrigoyen', 530, '03571425898', -32.16795849690992, -64.12534409402082, 9, 1),
('Supermercado Caracol Sucursal III', '25 de mayo', 454, '03571426600', -32.174081086450734, -64.11813707525896, 9, 1),
('Supermercado Caracol Sucursal IV', 'Yatasto y Roque Saenz Peña', 0, '03571557338', -32.18183768622687, -64.11168033223439, 9, 1),
('Supermercado Caracol Sucursal V', 'Av. Hipólito Yrigoyen esq. Constitución', 0, '03571425898', -32.18168785820947, -64.12504486545588, 9, 1),
('Supermercado Caracol Sucursal VI', 'Pedro C. Molina y Castelli', 0, '03571470044', -32.19384339932449, -64.25223664346717, 10, 1),
('Supermercado Caracol Sucursal VII', 'Hipolito Yrigoyen', 212, '03571487700', -32.204006611451454, -64.4008049072035, 11, 1),
('Supermercado Caracol Sucursal VIII', 'Rivadavia', 99, '0000000', -32.038430256808496, -63.57270602227821, 12, 1)
go

/* -------------------------------------
   Tabla: productos_sucursales
   ------------------------------------- */
create table dbo.productos_sucursales 
(
   nro_sucursal integer not null,
   cod_barra varchar(13) not null,
   precio decimal(10, 2) not null,
   vigente smallint not null,
   constraint PK_productos_sucursales__END primary key(nro_sucursal, cod_barra),
   constraint FK__productos_sucursales_sucursales__END foreign key(nro_sucursal) references dbo.sucursales,
   constraint FK__productos_sucursales_productos__END foreign key(cod_barra) references dbo.productos
);
go

-- Insertar datos en la tabla productos_sucursales
insert into productos_sucursales (nro_sucursal, cod_barra, precio, vigente) values
-- Sucursal I
(1, '10000001', 250.00, 1), -- Pan Blanco Bimbo
(1, '20000001', 150.00, 1), -- Papa Congelada McCain
(1, '40000001', 180.00, 1), -- Leche La Serenísima

-- Sucursal II
(2, '10000002', 240.00, 1), -- Pan Integral Fargo
(2, '30000001', 1200.00, 1), -- Carne Roja Swift
(2, '60000001', 150.00, 1), -- Azúcar Ledesma

-- Sucursal III
(3, '10000003', 120.00, 1), -- Galletitas Dulces Bagley
(3, '20000002', 90.00, 1), -- Lentejas Arcor
(3, '70000003', 650.00, 1), -- Yerba Mate Taragüí

-- Sucursal IV
(4, '10000004', 100.00, 1), -- Arroz Gallo Clásico
(4, '50000001', 300.00, 1), -- Aceite Natura
(4, '70000001', 180.00, 1), -- Coca-Cola Light

-- Sucursal V
(5, '10000005', 130.00, 1), -- Fideos Matarazzo
(5, '30000002', 250.00, 1), -- Huevos San Sebastián
(5, '60000002', 200.00, 1), -- Dulce de Batata Arcor

-- Sucursal VI
(6, '40000002', 220.00, 1), -- Queso Cremoso La Paulina
(6, '70000002', 450.00, 1), -- Café Cabrales
(6, '30000001', 1250.00, 1), -- Carne Roja Swift

-- Sucursal VII
(7, '10000001', 260.00, 1), -- Pan Blanco Bimbo
(7, '10000002', 250.00, 1), -- Pan Integral Fargo
(7, '60000001', 155.00, 1), -- Azúcar Ledesma

-- Sucursal VIII
(8, '70000003', 660.00, 1), -- Yerba Mate Taragüí
(8, '60000002', 210.00, 1), -- Dulce de Batata Arcor
(8, '50000001', 310.00, 1); -- Aceite Natura
go
-- ------------------------------------------------------------------------------------------

/* -------------------------------------
   Tabla: empresas_externas
   -------------------------------------
*/

create table dbo.empresas_externas
(
   nro_empresa integer not null,
   razon_social varchar(255) not null,
   cuit_empresa varchar(13) not null,
   token_servicio varchar(255) not null,
   constraint PK_empresas_externas__END primary key(nro_empresa)
);
go

-- Insertar datos en la tabla empresas_externas
insert into empresas_externas (nro_empresa, razon_social, cuit_empresa, token_servicio) values
(1, 'Distribuidora Alimentos SA', '30512345678', 'd4f5g6h7i8j9k0'),
(2, 'Frigorífico Nacional SRL', '30765432109', 'a1b2c3d4e5f6g7'),
(3, 'Lácteos del Campo SA', '30698765432', 'h1i2j3k4l5m6n7'),
(4, 'Aceites Naturales SRL', '30587654321', 'p1q2r3s4t5u6v7'),
(5, 'Comercializadora de Bebidas SRL', '30712309876', 'x1y2z3a4b5c6d7'),
(6, 'Productos Orgánicos SA', '30543210987', 'o1p2q3r4s5t6u7'),
(7, 'Proveedor Congelados SRL', '30789012345', 'k1l2m3n4o5p6q7'),
(8, 'Dulces Tradicionales SA', '30509876543', 'f1g2h3i4j5k6l7');
go
/* -------------------------------------
   Tabla: tipos_productos
   ------------------------------------- */
create table dbo.tipos_productos 
(
   nro_tipo_producto integer not null identity(1,1),
   nom_tipo_producto varchar(255) not null,
   constraint PK_tipos_productos__END primary key(nro_tipo_producto)
);
go

-- ---------------------------------------------------------------------------------------------
-- Insertar datos en la tabla tipos_productos

insert into tipos_productos (nom_tipo_producto) values
('Orgánicos'),
('Sin TACC'),
('Light'),
('Congelados'),
('Importados'),
('Ecológicos'),
('Sin Categoria');
go
-- ---------------------------------------------------------------------------------------------

/* -------------------------------------
   Tabla: tipos_productos_marcas
   ------------------------------------- */
create table dbo.tipos_productos_marcas
(
   nro_marca integer not null,
   nro_tipo_producto integer not null,
   vigente smallint not null,
   constraint PK_tipos_productos_marcas__END primary key(nro_marca, nro_tipo_producto),
   constraint FK__tipos_productos_marcas_marcas_productos__END foreign key(nro_marca) references dbo.marcas_productos,
   constraint FK__tipos_productos_marcas_tipos_productos__END foreign key(nro_tipo_producto) references dbo.tipos_productos
);
go

-- Relacionar marcas con tipos de productos

insert into tipos_productos_marcas (nro_marca, nro_tipo_producto, vigente) values
-- Orgánicos
(1, 1, 1), -- Bimbo produce productos orgánicos
(27, 1, 1), -- Sancor produce productos orgánicos
-- Sin TACC
(6, 2, 1), -- Granix produce productos Sin TACC
(27, 2, 1), -- Sancor produce productos Sin TACC
-- Light
(1, 3, 1), -- Bimbo produce productos Light
(41, 3, 1), -- Coca-Cola produce productos Light
-- Congelados
(16, 4, 1), -- McCain produce productos congelados
-- Importados
(43, 5, 1), -- Manaos produce productos importados
-- Ecológicos
(32, 6, 1), -- Cocinero produce productos ecológicos
(48, 6, 1); -- Rosamonte produce productos ecológicos
go
-- ---------------------------------------------------------------------------------------------
-- Insertar datos en la tabla productos

create table dbo.tipos_servicios_supermercado
(
   nro_tipo_servicio integer not null,
   nom_tipo_servicio varchar(255) not null,
   constraint PK_tipos_servicios_supermercado__END primary key(nro_tipo_servicio),
);
go

-- Insertar datos de prueba en sucursales
insert into dbo.tipos_servicios_supermercado (nro_tipo_servicio, nom_tipo_servicio) values 
(1, 'Entrega a domicilio'),
(2, 'Retiro en sucursal')
go

/* -------------------------------------
   Tabla: tipos_servicios_sucursales
   -------------------------------------
*/
create table dbo.tipos_servicios_sucursales
(
   nro_sucursal integer not null,
   nro_tipo_servicio integer not null,
   vigente smallint not null,
   constraint PK_tipos_servicios_sucursales__END primary key(nro_sucursal, nro_tipo_servicio),
   constraint FK__tipos_servicios_sucursales_sucursales__END foreign key(nro_sucursal) references dbo.sucursales,
   constraint FK__tipos_servicios_sucursales_tipos_servicios_supermercado__END foreign key(nro_tipo_servicio) references dbo.tipos_servicios_supermercado
);
go

-- Inserts para nro_sucursal = 1
insert into dbo.tipos_servicios_sucursales (nro_sucursal, nro_tipo_servicio, vigente) values
(1, 1, 1),
(1, 2, 1);
go

-- Inserts para nro_sucursal = 2
insert into dbo.tipos_servicios_sucursales (nro_sucursal, nro_tipo_servicio, vigente) values
(2, 1, 1),
(2, 2, 0);
go

-- Inserts para nro_sucursal = 3
insert into dbo.tipos_servicios_sucursales (nro_sucursal, nro_tipo_servicio, vigente) values
(3, 1, 1),
(3, 2, 1);
go

-- Inserts para nro_sucursal = 4
insert into dbo.tipos_servicios_sucursales (nro_sucursal, nro_tipo_servicio, vigente) values
(4, 1, 1),
(4, 2, 1);
go

-- Inserts para nro_sucursal = 5
insert into dbo.tipos_servicios_sucursales (nro_sucursal, nro_tipo_servicio, vigente) values
(5, 1, 1),
(5, 2, 1);
go

-- Inserts para nro_sucursal = 6
insert into dbo.tipos_servicios_sucursales (nro_sucursal, nro_tipo_servicio, vigente) values
(6, 1, 1),
(6, 2, 1);
go

-- Inserts para nro_sucursal = 7
insert into dbo.tipos_servicios_sucursales (nro_sucursal, nro_tipo_servicio, vigente) values
(7, 1, 1),
(7, 2, 1);
go

-- Inserts para nro_sucursal = 8
insert into dbo.tipos_servicios_sucursales (nro_sucursal, nro_tipo_servicio, vigente) values
(8, 1, 1),
(8, 2, 1);
go

/* -------------------------------------
   Tabla: horarios_sucursales
   -------------------------------------
*/
create table dbo.horarios_sucursales
(
   nro_sucursal integer not null,
   dia_semana tinyint not null,
   hora_desde time not null,
   hora_hasta time not null,
   constraint PK_horarios_sucursales__END primary key(nro_sucursal, dia_semana),
   constraint FK__horarios_sucursales_sucursales__END foreign key(nro_sucursal) references dbo.sucursales,
);
go

-- Inserts para nro_sucursal = 1
insert into dbo.horarios_sucursales (nro_sucursal, dia_semana, hora_desde, hora_hasta) values
(1, 1, '09:00', '18:00'), -- Lunes
(1, 2, '09:00', '18:00'), -- Martes
(1, 3, '09:00', '18:00'), -- Miércoles
(1, 4, '09:00', '18:00'), -- Jueves
(1, 5, '09:00', '18:00'), -- Viernes
(1, 6, '09:00', '13:00') -- Sábado
go

-- Inserts para nro_sucursal = 2
insert into dbo.horarios_sucursales (nro_sucursal, dia_semana, hora_desde, hora_hasta) values
(2, 1, '09:00', '18:00'), -- Lunes
(2, 2, '09:00', '18:00'), -- Martes
(2, 3, '09:00', '18:00'), -- Miércoles
(2, 4, '09:00', '18:00'), -- Jueves
(2, 5, '09:00', '18:00'), -- Viernes
(2, 6, '09:00', '13:00') -- Sábado
go

-- Inserts para nro_sucursal = 3
insert into dbo.horarios_sucursales (nro_sucursal, dia_semana, hora_desde, hora_hasta) values
(3, 1, '09:00', '18:00'), -- Lunes
(3, 2, '09:00', '18:00'), -- Martes
(3, 3, '09:00', '18:00'), -- Miércoles
(3, 4, '09:00', '18:00'), -- Jueves
(3, 5, '09:00', '18:00'), -- Viernes
(3, 6, '09:00', '13:00') -- Sábado
go