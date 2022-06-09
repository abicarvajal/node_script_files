/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2012                    */
/* Created on:     2/6/2022 18:32:01                            */
/*==============================================================*/


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('USUARIO') and o.name = 'FK_USUARIO_RELATIONS_CUENTA')
alter table USUARIO
   drop constraint FK_USUARIO_RELATIONS_CUENTA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CUENTA')
            and   type = 'U')
   drop table CUENTA
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('USUARIO')
            and   name  = 'RELATIONSHIP_1_FK'
            and   indid > 0
            and   indid < 255)
   drop index USUARIO.RELATIONSHIP_1_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('USUARIO')
            and   type = 'U')
   drop table USUARIO
go

/*==============================================================*/
/* Table: CUENTA                                                */
/*==============================================================*/
create table CUENTA (
   NUMEROCUENTA         varchar(124)         null,
   TIPOCUENTA           varchar(64)          null,
   SALDO                decimal              null,
   IDCUENTA             int                  not null,
   constraint PK_CUENTA primary key nonclustered (IDCUENTA)
)
go

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO (
   ID                   int                  not null,
   IDCUENTA             int                  not null,
   NOMBRE               varchar(124)         null,
   CI                   varchar(124)         null,
   EDAD                 int                  null,
   constraint PK_USUARIO primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_1_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_1_FK on USUARIO (
IDCUENTA ASC
)
go

alter table USUARIO
   add constraint FK_USUARIO_RELATIONS_CUENTA foreign key (IDCUENTA)
      references CUENTA (IDCUENTA)
go

