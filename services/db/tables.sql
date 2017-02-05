/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de cr�ation :  16/01/2017 17:27:33                      */
/*==============================================================*/


drop table if exists CATEGORY;

drop table if exists CONTAIN;

drop table if exists MANAGE;

drop table if exists ORDERS;

drop table if exists PLACE;

drop table if exists PRODUCT;

drop table if exists PROVIDER;

drop table if exists REQUEST;

drop table if exists SUBCATEGORY;

drop table if exists USER;

/*==============================================================*/
/* Table : CATEGORY                                             */
/*==============================================================*/
create table CATEGORY
(
   CATEGORYNUMBER       int not null auto_increment,
   CATEGORYNAME         text,
   primary key (CATEGORYNUMBER)
);

/*==============================================================*/
/* Table : CONTAIN                                              */
/*==============================================================*/
create table CONTAIN
(
   ORDERNUMBER          int not null,
   PRODUCTNUMBER        int not null,
   DLC                  float,
   primary key (ORDERNUMBER, PRODUCTNUMBER)
);

/*==============================================================*/
/* Table : MANAGE                                               */
/*==============================================================*/
create table MANAGE
(
   USERNUMBER           int not null,
   CATEGORYNUMBER       int not null,
   primary key (USERNUMBER, CATEGORYNUMBER)
);

/*==============================================================*/
/* Table : ORDERS                                              */
/*==============================================================*/
create table ORDERS
(
   ORDERNUMBER          int not null auto_increment,
   STATUS               text,
   QUANTITYNUMBER       int,
   DELIVERYDATE         date,
   primary key (ORDERNUMBER)
);

/*==============================================================*/
/* Table : PLACE                                                */
/*==============================================================*/
create table PLACE
(
   PLACENUMBER          int not null auto_increment,
   PLACENAME            text,
   PLACEFLOOR           text,
   PLACETYPE            text,
   primary key (PLACENUMBER)
);

/*==============================================================*/
/* Table : PRODUCT                                              */
/*==============================================================*/
create table PRODUCT
(
   PRODUCTNUMBER        int not null auto_increment,
   CATEGORYNUMBER       int not null,
   PROVIDERNUMBER       int not null,
   SUBCATEGORYNUMBER    int not null,
   PLACENUMBER          int not null,
   PRODUCTNAME          text,
   PRODUCTUNIT          text,
   STOCKQUANTITY        int,
   QUANTITYTHRESHOLD    int,
   PRODUCTPRICE         float,
   primary key (PRODUCTNUMBER)
);

/*==============================================================*/
/* Table : PROVIDER                                             */
/*==============================================================*/
create table PROVIDER
(
   PROVIDERNUMBER       int not null auto_increment,
   PROVIDERNAME         text,
   PROVIDERADRESS       text,
   PROVIDERPOSTCODE     text,
   PROVIDERCITY         text,
   PROVIDERPHONE        text,
   PROVIDERFAX          text,
   PROVIDERMAIL         text,
   primary key (PROVIDERNUMBER)
);

/*==============================================================*/
/* Table : REQUEST                                              */
/*==============================================================*/
create table REQUEST
(
   REQUESTNUMBER        int not null auto_increment,
   USERNUMBER           int not null,
   PRODUCTNUMBER        int not null,
   REQUESTDATE          date,
   REQUESTQUANTITY      float,
   primary key (REQUESTNUMBER)
);

/*==============================================================*/
/* Table : SUBCATEGORY                                          */
/*==============================================================*/
create table SUBCATEGORY
(
   SUBCATEGORYNUMBER    int not null auto_increment,
   SUBCATEGORYNAME      text,
   CATEGORYNUMBER       int not null,
   primary key (SUBCATEGORYNUMBER)
);

/*==============================================================*/
/* Table : USER                                                 */
/*==============================================================*/
create table USER
(
   USERNUMBER           int not null auto_increment,
   USERNAME             text,
   TITLE                text,
   ROLE                 int,
   EMAIL                text,
   PASSWORD             text,
   primary key (USERNUMBER)
);

alter table CONTAIN add constraint FK_CONTAIN foreign key (ORDERNUMBER)
      references ORDERS (ORDERNUMBER) on delete restrict on update restrict;

alter table CONTAIN add constraint FK_CONTAIN2 foreign key (PRODUCTNUMBER)
      references PRODUCT (PRODUCTNUMBER) on delete restrict on update restrict;

alter table MANAGE add constraint FK_MANAGE foreign key (USERNUMBER)
      references USER (USERNUMBER) on delete restrict on update restrict;

alter table MANAGE add constraint FK_MANAGE2 foreign key (CATEGORYNUMBER)
      references CATEGORY (CATEGORYNUMBER) on delete restrict on update restrict;

alter table PRODUCT add constraint FK_BELONG foreign key (CATEGORYNUMBER)
      references CATEGORY (CATEGORYNUMBER) on delete restrict on update restrict;

alter table PRODUCT add constraint FK_IS foreign key (SUBCATEGORYNUMBER)
      references SUBCATEGORY (SUBCATEGORYNUMBER) on delete restrict on update restrict;

alter table PRODUCT add constraint FK_PROVIDE foreign key (PROVIDERNUMBER)
      references PROVIDER (PROVIDERNUMBER) on delete restrict on update restrict;

alter table PRODUCT add constraint FK_STOCK foreign key (PLACENUMBER)
      references PLACE (PLACENUMBER) on delete restrict on update restrict;

alter table REQUEST add constraint FK_ASK foreign key (USERNUMBER)
      references USER (USERNUMBER) on delete restrict on update restrict;

alter table REQUEST add constraint FK_CONCERN foreign key (PRODUCTNUMBER)
      references PRODUCT (PRODUCTNUMBER) on delete restrict on update restrict;

alter table SUBCATEGORY add constraint FK_BELONG2 foreign key (CATEGORYNUMBER)
      references CATEGORY (CATEGORYNUMBER) on delete restrict on update restrict;
