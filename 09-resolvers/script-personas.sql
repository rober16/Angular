use das
go

drop table if exists dbo.otras_actividades_personas
drop table if exists dbo.actividades_personas
drop table if exists dbo.equipos_personas
drop table if exists dbo.personas
drop table if exists dbo.actividades
drop table if exists dbo.equipos
drop table if exists dbo.generos
drop table if exists dbo.nacionalidades
go

/* ------------------------------------------
   Tabla: nacionalidades
   ------------------------------------------ */
create table dbo.nacionalidades
(
 cod_nacionalidad		varchar(3)			not null
						constraint PK__nacionalidades___END primary key,
 nom_nacionalidad		varchar(50)			not null
)
go

insert into dbo.nacionalidades(cod_nacionalidad, nom_nacionalidad)
values('AR', 'ARGENTINA'),
	  ('BO', 'BOLIVIANA'),
	  ('BR', 'BRASILEÑA'),
	  ('CH', 'CHILENA'),
	  ('CO', 'COLOMBIANA'),
	  ('EC', 'ECUATORIANA'),
	  ('PE', 'PERUANA'),
	  ('PY', 'PARAGUAYA'),
	  ('UY', 'URUGUAYA'),
	  ('VE', 'VENEZOLANA')
go

/* ------------------------------------------
   Tabla: generos
   ------------------------------------------ */
create table dbo.generos
(
 cod_genero				varchar(2)			not null
						constraint PK__generos__END primary key,
 nom_genero				varchar(20)			not null
)	
go

insert into dbo.generos(cod_genero, nom_genero)
values('F', 'Femenino'),
      ('M', 'Masculino'),
	  ('X', 'No binario')
go

/* ------------------------------------------
   Tabla: equipos
   ------------------------------------------ */
create table dbo.equipos
(
 nro_equipo				smallint			not null
						constraint PK__equipos__END primary key,
 nom_equipo				varchar(50)			not null
)
go

insert into dbo.equipos(nro_equipo, nom_equipo)
values(1, 'ASOCIACIÓN ATLÉTICA ARGENTINOS JUNIORS'),
      (2, 'CLUB ATLÉTICO BELGRANO DE CÓRDOBA'),
      (3, 'CLUB ATLÉTICO BOCA JUNIOR'),
	  (4, 'CLUB ATLÉTICO INDEPENDIENTE'),
	  (5, 'INSTITUTO ATLÉTICO CENTRAL CÓRDOBA'),
	  (6, 'RACING CLUB'),
	  (7, 'CLUB ATLÉTICO RIVER PLATE'),
	  (8, 'CLUB ATLÉTICO SAN LORENZO DE ALMAGRO'),
	  (9, 'CLUB ATLÉTICO TALLERES'),
	  (10, 'CLUB ATLÉTICO VELEZ SARSFIELD')
go

/* ------------------------------------------
   Tabla: actividades
   ------------------------------------------ */
create table dbo.actividades
(
 nro_actividad				smallint		not null
							constraint PK__actividades__END primary key,
 nom_actividad				varchar(40)		not null
)
go

insert into dbo.actividades(nro_actividad, nom_actividad)
values(1, 'Bailar'),
      (2, 'Cantar'),
      (3, 'Hacer deportes'),
      (4, 'Leer'),
      (5, 'Meditar'),
      (6, 'Pescar'),
      (7, 'Ver televisión')
go

/* ------------------------------------------
   Tabla: personas
   ------------------------------------------ */
create table dbo.personas
(
 nro_persona				integer			not null identity
							constraint PK__personas__END primary key,
 apellido					varchar(40)		not null,
 nombre						varchar(100)	not null,
 clave						varchar(20)		not null,
 correo						varchar(255)	not null,
 cod_genero					varchar(2)		null
							constraint FK__personas__generos__END references dbo.generos,
 fecha_nacimiento			date			null,
 cod_nacionalidad			varchar(3)		null
							constraint FK__personas__nacionalidades__END references dbo.nacionalidades
)
go

/* ------------------------------------------
   Tabla: equipos_personas
   ------------------------------------------ */
create table dbo.equipos_personas
(
 nro_persona				integer			not null
							constraint FK__equipos_personas__personas__END references dbo.personas 
							on delete cascade
							on update cascade,
 nro_equipo					smallint		not null
							constraint FK__equipos_personas__equipos__END references dbo.equipos,
 constraint PK__equipos_personas__END 
			primary key (nro_persona, nro_equipo)
)
go

/* ------------------------------------------
   Tabla: actividades_personas
   ------------------------------------------ */
create table dbo.actividades_personas
(
 nro_persona				integer			not null
							constraint FK__actividades_personas__personas__END references dbo.personas
							on delete cascade
							on update cascade,
 nro_actividad				smallint		not null
							constraint FK__actividades_personas__actividades__END references dbo.actividades,
 constraint PK__actividades_personas__END 
			primary key (nro_persona, nro_actividad)
)
go

/* ------------------------------------------
   Tabla: otras_actividades_personas
   ------------------------------------------ */
create table dbo.otras_actividades_personas
(
 nro_persona				integer			not null
							constraint FK__otras_actividades_personas__personas__END references dbo.personas
							on delete cascade
							on update cascade,
 actividades				varchar(4000)	not null,
 constraint PK__otras_actividades_personas__END 
			primary key (nro_persona)
)
go

/* ------------------------------------------
   Procedimientos: get_nacionalidades
   ------------------------------------------ */
create or alter procedure dbo.get_nacionalidades
as
begin

  select codigo   = cod_nacionalidad,
         nombre   = nom_nacionalidad,
		 selected = convert(bit, iif(cod_nacionalidad = 'AR', 1, 0))
    from dbo.nacionalidades (nolock)
   order by nom_nacionalidad

end
go

-- execute dbo.get_nacionalidades

/* ------------------------------------------
   Procedimientos: get_generos
   ------------------------------------------ */
create or alter procedure dbo.get_generos
as
begin

  select codigo   = cod_genero,
         nombre   = nom_genero,
		 selected = convert(bit, iif(cod_genero = 'F', 1, 0))
    from dbo.generos (nolock)
   order by nom_genero

end
go

-- execute dbo.get_generos

/* ------------------------------------------
   Procedimientos: get_equipos
   ------------------------------------------ */
create or alter procedure dbo.get_equipos
as
begin

  select id     = nro_equipo,
         nombre = nom_equipo
    from dbo.equipos (nolock)
   order by nom_equipo

end
go

-- execute dbo.get_equipos

/* ------------------------------------------
   Procedimientos: get_actividades
   ------------------------------------------ */
create or alter procedure dbo.get_actividades
as
begin

  select id     = nro_actividad,
         nombre = nom_actividad 
    from dbo.actividades (nolock)
   order by nom_actividad

end
go

-- execute dbo.get_hobbies

/* ------------------------------------------
   Procedimientos: get_personas
   ------------------------------------------ */
create or alter procedure dbo.get_personas
as
begin

  select apellido        = p.apellido,
         nombre          = p.nombre,
		 clave           = p.clave,
		 correo          = p.correo,
		 nomGenero       = g.nom_genero,
		 fechaNacimiento = p.fecha_nacimiento,
		 nomNacionalidad = n.nom_nacionalidad,
		 nroPersona      = p.nro_persona,
		 idPersona       = convert(varchar(1024), encryptbypassphrase(convert(varchar(3), nro_persona), convert(varchar(3), nro_persona)), 2)
    from dbo.personas p (nolock)
	     left join dbo.generos g (nolock)
		   on p.cod_genero       = g.cod_genero
		 left join dbo.nacionalidades n (nolock)
		   on p.cod_nacionalidad = n.cod_nacionalidad
   order by apellido,
            nombre

end
go

-- execute dbo.get_personas

/* ------------------------------------------
   Procedimientos: get_datos_persona
   ------------------------------------------ */
create or alter procedure dbo.get_datos_persona
(
 @id_persona	varchar(1024)
)
as
begin

  declare @id_persona_binary varbinary(1024) = convert(varbinary(1024), '0x' + @id_persona, 1)

  select apellido         = p.apellido,
         nombre           = p.nombre,
		 clave            = p.clave,
		 correo           = p.correo,
		 codGenero        = p.cod_genero,
		 fechaNacimiento  = p.fecha_nacimiento,
		 codNacionalidad  = p.cod_nacionalidad,
		 equiposJson      = (select '[' + string_agg(convert(varchar(5), e.nro_equipo), ', ') + ']'
		                       from dbo.equipos_personas e (nolock)
						  	  where e.nro_persona = p.nro_persona),
		 actividadesJson  = (select '[' + string_agg(convert(varchar(5), a.nro_actividad), ', ') + ']'
		                        from dbo.actividades_personas a (nolock)
						  	   where a.nro_persona = p.nro_persona),
		 otrasActividades = oa.actividades,
		 nroPersona       = p.nro_persona
    from dbo.personas p (nolock)
	     left join dbo.otras_actividades_personas oa (nolock)
		   on p.nro_persona = oa.nro_persona
   where p.nro_persona = convert(varchar(1024), decryptbypassphrase(convert(varchar(3), p.nro_persona), @id_persona_binary))
   order by apellido,
            nombre

end
go

-- execute dbo.get_datos_persona @id_persona='02000000CF8A677316D85B2753CEAD6124AD2A302BE289C5A13DD6844252ECEBB0B264D0'

/* ------------------------------------------
   Procedimientos: ins_persona
   ------------------------------------------ */
create or alter procedure dbo.ins_persona
(
 @apellido			varchar(40),
 @nombre			varchar(100),
 @clave				varchar(20),
 @correo			varchar(255),
 @cod_genero		varchar(2)		= null,
 @fecha_nacimiento	date			= null,
 @cod_nacionalidad	varchar(3)		= null,
 @equipos			varchar(4000)	= null,
 @actividades		varchar(4000)	= null,
 @otras_actividades	varchar(4000)	= null
)
as
begin

  set nocount on

  declare @nro_persona integer

  if ltrim(rtrim(@cod_genero)) = ''
     set @cod_genero = null
  if ltrim(rtrim(@fecha_nacimiento)) = ''
     set @fecha_nacimiento = null
  if ltrim(rtrim(@cod_nacionalidad)) = ''
     set @cod_nacionalidad = null
  if ltrim(rtrim(@equipos)) = ''
     set @equipos = null
  if ltrim(rtrim(@actividades)) = ''
     set @actividades = null
  if ltrim(rtrim(@otras_actividades)) = ''
     set @otras_actividades = null

  declare @eq table
  (
   nro_equipo		smallint
  )

  declare @act table
  (
   nro_actividad	smallint
  )

  insert into @eq(nro_equipo)
  select nro_equipo
    from openjson(@equipos) 
    with(
	     nro_equipo		smallint '$'
        ) 

  insert into @act(nro_actividad)
  select nro_actividad
    from openjson(@actividades)
    with(
	     nro_actividad	smallint '$'
        ) 

  insert into dbo.personas(apellido, nombre, clave, correo, cod_genero, fecha_nacimiento, cod_nacionalidad)
  values(@apellido, @nombre, @clave, @correo, @cod_genero, @fecha_nacimiento, @cod_nacionalidad)

  set @nro_persona = @@identity

  insert into dbo.equipos_personas(nro_persona, nro_equipo)
  select @nro_persona,
         nro_equipo
	from @eq

  insert into dbo.actividades_personas(nro_persona, nro_actividad)
  select @nro_persona,
         nro_actividad
	from @act

  if @otras_actividades is not null 
     insert into dbo.otras_actividades_personas(nro_persona, actividades)
	 values(@nro_persona, @otras_actividades)

  set nocount off

end
go

-- execute dbo.ins_persona @apellido='APELLIDO1', @nombre='NOMBRE1', @clave='123456', @correo='apenom1@ubp.edu.ar', @cod_genero='F', @cod_nacionalidad='AR', @fecha_nacimiento='1990-10-10', @equipos='[2,3]', @actividades='[1,2]'
-- execute dbo.ins_persona @apellido='APELLIDO2', @nombre='NOMBRE2', @clave='123456', @correo='apenom2@ubp.edu.ar'

/* ------------------------------------------
   Procedimientos: act_persona
   ------------------------------------------ */
create or alter procedure dbo.act_persona
(
 @nro_persona		integer,
 @apellido			varchar(40),
 @nombre			varchar(100),
 @clave				varchar(20),
 @correo			varchar(255),
 @cod_genero		varchar(2)		= null,
 @fecha_nacimiento	date			= null,
 @cod_nacionalidad	varchar(3)		= null,
 @equipos			varchar(4000)	= null,
 @actividades		varchar(4000)	= null,
 @otras_actividades	varchar(4000)	= null
)
as
begin

  set nocount on

  if ltrim(rtrim(@cod_genero)) = ''
     set @cod_genero = null
  if ltrim(rtrim(@fecha_nacimiento)) = ''
     set @fecha_nacimiento = null
  if ltrim(rtrim(@cod_nacionalidad)) = ''
     set @cod_nacionalidad = null
  if ltrim(rtrim(@equipos)) = ''
     set @equipos = null
  if ltrim(rtrim(@actividades)) = ''
     set @actividades = null
  if ltrim(rtrim(@otras_actividades)) = ''
     set @otras_actividades = null

  declare @eq table
  (
   nro_equipo		smallint
  )

  declare @act table
  (
   nro_actividad	smallint
  )

  insert into @eq(nro_equipo)
  select nro_equipo
    from openjson(@equipos) 
    with(
	     nro_equipo		smallint '$'
        ) 

  insert into @act(nro_actividad)
  select nro_actividad
    from openjson(@actividades)
    with(
	     nro_actividad	smallint '$'
        ) 

  update dbo.personas
     set apellido         = @apellido, 
	     nombre           = @nombre, 
		 clave            = @clave, 
		 correo           = @correo, 
		 cod_genero       = @cod_genero, 
		 fecha_nacimiento = @fecha_nacimiento, 
		 cod_nacionalidad = @cod_nacionalidad
   where nro_persona = @nro_persona

  insert into dbo.equipos_personas(nro_persona, nro_equipo)
  select @nro_persona,
         e.nro_equipo
	from @eq e
   where not exists(select *
                      from dbo.equipos_personas ep
					 where ep.nro_persona = @nro_persona
					   and ep.nro_equipo  = e.nro_equipo)

  delete ep
    from dbo.equipos_personas ep
   where ep.nro_persona = @nro_persona
     and not exists(select *
	                  from @eq e
					 where e.nro_equipo = ep.nro_equipo)

  insert into dbo.actividades_personas(nro_persona, nro_actividad)
  select @nro_persona,
         a.nro_actividad
	from @act a
   where not exists(select *
                      from dbo.actividades_personas ap
					 where ap.nro_persona   = @nro_persona
					   and ap.nro_actividad = a.nro_actividad)

  delete ap
    from dbo.actividades_personas ap
   where ap.nro_persona = @nro_persona
     and not exists(select *
	                  from @act a
					 where a.nro_actividad = ap.nro_actividad)

  if @otras_actividades is not null 
     begin
	   if not exists(select *
	                   from dbo.otras_actividades_personas
				      where nro_persona = @nro_persona)
          insert into dbo.otras_actividades_personas(nro_persona, actividades)
	      values(@nro_persona, @otras_actividades)
       else
	      update dbo.otras_actividades_personas
		     set actividades = @otras_actividades
		   where nro_persona = @nro_persona
     end
  else if exists(select *
	               from dbo.otras_actividades_personas
				  where nro_persona = @nro_persona)
     delete
	   from dbo.otras_actividades_personas
	  where nro_persona = @nro_persona

  set nocount off

end
go

-- execute dbo.act_persona @nro_persona=1, @apellido='APELLIDO', @nombre='NOMBRE', @clave='123456', @correo='apenom@ubp.edu.ar', @cod_genero='F', @cod_nacionalidad='AR', @fecha_nacimiento='', @equipos='[1,2]', @actividades='[1]', @otras_actividades="OTRAS ACTIVIDADES..."

/* ------------------------------------------
   Procedimientos: del_persona
   ------------------------------------------ */
create or alter procedure dbo.del_persona
(
 @id_persona	varchar(1024)
)
as
begin

  set nocount on

  declare @id_persona_binary varbinary(1024) = convert(varbinary(1024), '0x' + @id_persona, 1)

  delete
    from dbo.personas
   where nro_persona = convert(varchar(1024), decryptbypassphrase(convert(varchar(3), nro_persona), @id_persona_binary))

  set nocount off

end
go

-- execute dbo.del_persona @id_persona='02000000E379D2A04ECF209485E3355D275A2BBF67568ED07062E4DD8F27343A0BAE52D7'