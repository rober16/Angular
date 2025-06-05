use indec
go

-- Eliminar tablas si existen
-- Inicio del lote

-- Tablas que dependen de Idiomas
DROP TABLE IF EXISTS dbo.idiomas_tipos_productos;
DROP TABLE IF EXISTS dbo.idiomas_categorias_productos;
DROP TABLE IF EXISTS dbo.idioma_rubros_productos;
DROP TABLE IF EXISTS dbo.idiomas; -- Ahora se puede eliminar idiomas

DROP TABLE IF EXISTS dbo.productos_supermercados; -- Depende de productos y sucursales
DROP TABLE IF EXISTS dbo.servicios_supermercados;
DROP TABLE IF EXISTS dbo.servicios_soap_supermercados;

-- Eliminar tablas relacionadas con productos
DROP TABLE IF EXISTS dbo.tipos_productos_marcas; -- Depende de tipos_productos y marcas_productos
DROP TABLE IF EXISTS dbo.productos;
DROP TABLE IF EXISTS dbo.tipos_productos;
DROP TABLE IF EXISTS dbo.marcas_productos;
DROP TABLE IF EXISTS dbo.categorias_productos;
DROP TABLE IF EXISTS dbo.rubros_productos;

-- Eliminar sucursales y tablas relacionadas
DROP TABLE IF EXISTS dbo.sucursales;
DROP TABLE IF EXISTS dbo.supermercados;
DROP TABLE IF EXISTS dbo.localidades;

-- Eliminar provincias y paises (al final, ya que son referenciadas por otras tablas)
DROP TABLE IF EXISTS dbo.provincias;
DROP TABLE IF EXISTS dbo.paises;

-- Fin del lote


create table dbo.paises
(
    cod_pais varchar(3) not null,
    nom_pais varchar(255) not null,
    constraint PK__paises__END primary key(cod_pais)
)
go

insert into dbo.paises(cod_pais, nom_pais)
values('AR', 'ARGENTINA'),
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

insert into dbo.provincias(cod_pais, cod_provincia, nom_provincia)
values('AR', 'B', 'BUENOS AIRES'),
      ('AR', 'C', 'CATAMARCA'),
      ('AR', 'X', 'CÓRDOBA'),
      ('AR', 'P', 'LA PAMPA'),
      ('AR', 'L', 'SAN LUIS'),
      ('AR', 'F', 'SANTA FE'),
      ('AR', 'SE', 'SANTIAGO DEL ESTERO')
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
	constraint FK__localidades__paises__END	foreign key(cod_pais) references dbo.paises,
	constraint FK__localidades__provincias__END	foreign key(cod_pais, cod_provincia) references dbo.provincias,
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
go

-- Tabla: supermercados
create table dbo.supermercados 
(
    nro_supermercado integer not null identity(1,1),
    razon_social varchar(255) not null,
    cuit varchar(11) not null,
    constraint PK__supermercados__END primary key(nro_supermercado)
);
go

insert into dbo.supermercados (razon_social, cuit) values 
('Disco', '123456'),
('Caracol', '979679'),
('Libertad', '672424'),
('Vea', '7934234');
go

-- Tabla: servicios_supermercados
create table dbo.servicios_supermercados
(
    nro_supermercado integer not null,
    url_servicio varchar(255) NOT NULL,
    tipo_servicio varchar(50),
    token_servicio varchar(100),
    fecha_ult_act_servicio date,
    constraint PK__servicios_supermercados__END primary key(nro_supermercado),
    constraint FK__servicios_supermercados__supermercados__END foreign key(nro_supermercado) references dbo.supermercados
);
go

insert into servicios_supermercados (nro_supermercado, url_servicio, tipo_servicio, token_servicio, fecha_ult_act_servicio) values
(1, 'http://localhost:8080/superdisco/superdisco.wsdl', 'SOAP', '63af88fa-34ee-11ef-8aea-88b1111dab96', '2024-11-02'),
(2, 'http://localhost:8086/api/v1/supercaracol', 'REST', '5e6a0613-f62c-44ab-aeee-8eca144009f4', '2024-11-02'),
(3, 'http://localhost:8088/api/v1/superlibertad', 'REST', '5e6a0615-f63c-44ab-aeee-8eca14400789', '2025-1-26'),
(4, 'http://localhost:8087/supervea/supervea.wsdl', 'SOAP', '63af88fa-34ee-11ef-8aea-88b1111dab96', '2024-11-02');
go

create table dbo.servicios_soap_supermercados 
(
    nro_supermercado integer not null,
    namespace_soap varchar(255) null,
    servicename_soap varchar(255) null,
    portname_soap varchar(255) null,
    constraint PK__servicios_soap_supermercados__END primary key(nro_supermercado),
    constraint FK__servicios_soap_supermercados__supermercados__END foreign key(nro_supermercado) references dbo.supermercados
);
go

insert into servicios_soap_supermercados (nro_supermercado, namespace_soap, servicename_soap, portname_soap) values
(1, 'http://services.superdiscows.das.ubp.edu.ar/', 'SuperDiscoWSPortService', 'SuperDiscoWSPortSoap11'),
(4, 'http://services.superveaws.das.ubp.edu.ar/', 'SuperVeaWSPortService', 'SuperVeaWSPortSoap11');
go

-- Tabla: sucursales
create table dbo.sucursales 
(
    nro_supermercado integer not null,
    nro_sucursal integer not null identity(1,1),
    nom_sucursal varchar(255) not null,
    calle varchar(255),
    nro_calle integer,
    telefonos varchar(50),
    coord_latitud varchar(255),
    coord_longitud varchar(255),
    horario_sucursal varchar(255),
    servicios_disponibles varchar(255),
    nro_localidad integer not null,
    habilitada bit not null default 1,
    constraint PK__sucursales__END primary key(nro_supermercado, nro_sucursal),
    constraint FK__sucursales__supermercados__END foreign key(nro_supermercado) references dbo.supermercados,
    constraint FK__sucursales__localidades__END	foreign key(nro_localidad) references dbo.localidades
);
go

-- Tabla: rubros_productos
create table dbo.rubros_productos
(
    nro_rubro integer not null,
    nom_rubro varchar(255) not null,
    vigente bit not null default 1,
    constraint PK__rubros_productos__END primary key(nro_rubro)
);
go

insert into dbo.rubros_productos (nro_rubro, nom_rubro, vigente) values
(1, 'Panificados y cereales', 1),
(2, 'Tubérculos y legumbres', 1),
(3, 'Frutas y verduras', 1),
(4, 'Carnes y proteínas', 1),
(5, 'Lácteos y derivados', 1),
(6, 'Aceites y grasas', 1),
(7, 'Azúcares y dulces', 1),
(8, 'Bebidas', 1);
go

-- Tabla: categorias_productos
create table dbo.categorias_productos 
(
    nro_categoria integer not null,
    nom_categoria varchar(255) not null,
    nro_rubro integer not null,
    vigente bit not null default 1,
    constraint PK__categorias_productos__END primary key(nro_categoria),
    constraint FK__categorias_productos__rubros_productos__END foreign key(nro_rubro) references dbo.rubros_productos
);
go

insert into dbo.categorias_productos (nro_categoria, nom_categoria, nro_rubro, vigente) values
-- Categorías para Panificados y cereales
(1, 'Pan', 1, 1),
(2, 'Galletitas saladas y dulces', 1, 1),
(3, 'Arroz', 1, 1),
(4, 'Harina de trigo y de maíz', 1, 1),
(5, 'Fideos', 1, 1),
-- Categorías para Tubérculos y legumbres
(6, 'Papa', 2, 1),
(7, 'Batata', 2, 1),
(8, 'Arvejas', 2, 1), --CORRECCION
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

-- Tabla: marcas_productos
create table dbo.marcas_productos (
    nro_marca integer not null identity(1,1),
    nom_marca varchar(255) not null,
    vigente smallint not null default 1,
    constraint PK__marcas_productos__END primary key(nro_marca)
);
go

-- Tabla: tipos_productos
create table dbo.tipos_productos 
(
    nro_tipo_producto integer not null identity(1,1),
    nom_tipo_producto varchar(255) not null,
    constraint PK__tipos_productos__END primary key(nro_tipo_producto)
);
go

create table dbo.tipos_productos_marcas
(
    nro_marca integer not null,
    nro_tipo_producto integer not null,
    vigente bit not null,
    constraint PK__tipos_productos_marcas__END primary key(nro_marca, nro_tipo_producto),
    constraint FK__tipos_productos_marcas__marcas_productos__END foreign key(nro_marca) references dbo.marcas_productos,
    constraint FK__tipos_productos_marcas__tipos_productos__END foreign key(nro_tipo_producto) references dbo.tipos_productos
);
go

-- Tabla: productos
create table dbo.productos
(
    cod_barra varchar(13) not null,
    nom_producto varchar(255) not null,
    desc_producto varchar(500) not null,
    nro_categoria integer not null,
    imagen varchar(255) not null,
    nro_marca integer not null,
    nro_tipo_producto integer not null,
    vigente bit not null default 1,
    constraint PK__productos__END primary key(cod_barra),
    constraint FK__productos__categorias_productos__END foreign key(nro_categoria) references dbo.categorias_productos,
    constraint FK__productos__marcas_productos__END foreign key(nro_marca) references dbo.marcas_productos,
    constraint FK__productos__tipos_productos__END foreign key(nro_tipo_producto) references dbo.tipos_productos
);
go

create table dbo.productos_supermercados
(
    nro_supermercado integer not null,
    nro_sucursal integer not null,
    cod_barra varchar(13) not null,
    precio decimal(10, 2) null,
    fecha_ult_actualizacion date not null,
    constraint PK__productos_supermercados__END primary key(nro_supermercado, nro_sucursal, cod_barra),
    constraint FK__productos_supermercados__supermercados__END foreign key(nro_supermercado) references dbo.supermercados,
    constraint FK__productos_supermercados__sucursales__END foreign key(nro_supermercado, nro_sucursal) references dbo.sucursales,
    constraint FK__productos_supermercados__productos__END foreign key(cod_barra) references dbo.productos
);
go

create table dbo.idiomas
(
    cod_idioma integer not null identity(1,1),
    nom_idioma varchar(100) not null,
    constraint PK__idiomas__END primary key(cod_idioma)
);
go

insert into dbo.idiomas (nom_idioma) values
('Español'),
('Inglés');
go

create table dbo.idioma_rubros_productos
(
    nro_rubro integer not null,
    cod_idioma integer not null,
    rubro varchar(100) not null,
    constraint PK__idioma_rubros_productos__END primary key(nro_rubro, cod_idioma),
    constraint FK__idioma_rubros_productos__rubros_productos__END foreign key(nro_rubro) references dbo.rubros_productos,
    constraint FK__idioma_rubros_productos__idiomas__END foreign key(cod_idioma) references dbo.idiomas
);
go

insert into idioma_rubros_productos (nro_rubro, cod_idioma, rubro) values
(1, 1, 'Panificados y cereales'),
(1, 2, 'Baked goods and cereals'),
(2, 1, 'Tubérculos y legumbres'),
(2, 2, 'Tubers and legumes'),
(3, 1, 'Frutas y verduras'),
(3, 2, 'Fruits and vegetables'),
(4, 1, 'Carnes y proteínas'),
(4, 2, 'Meats and proteins'),
(5, 1, 'Lácteos y derivados'),
(5, 2, 'Dairy and derivatives'),
(6, 1, 'Aceites y grasas'),
(6, 2, 'Oils and fats'),
(7, 1, 'Azúcares y dulces'),
(7, 2, 'Sugars and sweets'),
(8, 1, 'Bebidas'),
(8, 2, 'Drinks');
go

create table dbo.idiomas_categorias_productos
(
    nro_categoria integer not null,
    cod_idioma integer not null,
    categoria varchar(100) not null,
    constraint PK__idiomas_categorias_productos__END primary key(nro_categoria, cod_idioma),
    constraint FK__idiomas_categorias_productos__categorias_productos__END foreign key(nro_categoria) references dbo.categorias_productos,
    constraint FK__idiomas_categorias_productos__idiomas__END foreign key(cod_idioma) references dbo.idiomas
);
go

insert into idiomas_categorias_productos (nro_categoria, cod_idioma, categoria) values
-- Categorías para Panificados y cereales
(1, 1, 'Pan'),
(1, 2, 'Bread'),
(2, 1, 'Galletitas saladas y dulces'),
(2, 2, 'Savory and sweet cookies'),
(3, 1, 'Arroz'),
(3, 2, 'Rice'),
(4, 1, 'Harina de trigo y de maíz'),
(4, 2, 'Wheat and corn flour'),
(5, 1, 'Fideos'),
(5, 2, 'Noodles'),

-- Categorías para Tubérculos y legumbres
(6, 1, 'Papa'),
(6, 2, 'Potato'),
(7, 1, 'Batata'),
(7, 2, 'Sweet potato'),
(8, 1, 'Legumbres secas (como arvejas y lentejas)'),
(8, 2, 'Dried legumes (such as peas and lentils)'),

-- Categorías para Frutas y verduras
(9, 1, 'Hortalizas'),
(9, 2, 'Vegetables'),
(10, 1, 'Frutas variadas'),
(10, 2, 'Various fruits'),

-- Categorías para Carnes y proteínas
(11, 1, 'Carnes rojas'),
(11, 2, 'Red meats'),
(12, 1, 'Carnes blancas'),
(12, 2, 'White meats'),
(13, 1, 'Huevos'),
(13, 2, 'Eggs'),

-- Categorías para Lácteos y derivados
(14, 1, 'Leche'),
(14, 2, 'Milk'),
(15, 1, 'Queso'),
(15, 2, 'Cheese'),

-- Categorías para Aceites y grasas
(16, 1, 'Aceites comestibles'),
(16, 2, 'Edible oils'),

-- Categorías para Azúcares y dulces
(17, 1, 'Azúcar'),
(17, 2, 'Sugar'),
(18, 1, 'Dulces'),
(18, 2, 'Sweets'),

-- Categorías para Bebidas
(19, 1, 'Bebidas edulcoradas'),
(19, 2, 'Sweetened beverages'),
(20, 1, 'Bebidas no edulcoradas'),
(20, 2, 'Unsweetened beverages'),
(21, 1, 'Café'),
(21, 2, 'Coffee'),
(22, 1, 'Té'),
(22, 2, 'Tea'),
(23, 1, 'Yerba mate'),
(23, 2, 'Mate tea');
go

--select * from idiomas_tipos_productos
create table dbo.idiomas_tipos_productos (
    nro_tipo_producto integer not null,
    cod_idioma integer not null,
    tipo_producto varchar(100) not null,
    constraint PK__idiomas_tipos_productos__END primary key(nro_tipo_producto, cod_idioma),
    constraint FK__idiomas_tipos_productos__tipos_productos__END foreign key(nro_tipo_producto) references dbo.tipos_productos,
    constraint FK__idiomas_tipos_productos__idiomas__END foreign key(cod_idioma) references dbo.idiomas
);
go

insert into idiomas_tipos_productos (nro_tipo_producto, cod_idioma, tipo_producto) values
(1, 1, 'Congelados'),
(1, 2, 'Frozen'),
(2, 1, 'Ecológicos'),
(2, 2, 'Eco-friendly'),
(3, 1, 'Light'),
(3, 2, 'Low-fat'),
(4, 1, 'Sin TACC'),
(4, 2, 'Gluten-free'),
(5, 1, 'Sin categoría'),
(5, 2, 'Uncategorized');
go