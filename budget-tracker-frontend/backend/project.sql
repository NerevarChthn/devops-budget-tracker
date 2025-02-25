create database budget; 

use budget;

create table planning (
id int NOT NULL AUTO_INCREMENT,
date DATE NOT NULL,
money float NOT NULL,
intake bool NOT NULL,
description varchar(250),
PRIMARY KEY (ID)
);

insert into planning (date, money, intake, description) value (NOW(), 12.45, true, 'TEST');
insert into planning (date, money, intake, description) value (NOW(), 5.78, false, 'TEST2');