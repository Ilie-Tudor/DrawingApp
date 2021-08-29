create database DrawingAppDB;
create extension if not exists "uuid-ossp";
create table users(
	user_id uuid primary key default uuid_generate_v4(),
	user_name varchar(255) not null,
	user_email varchar(255) not null,
	user_password varchar(255) not null
)
create table whiteboards(
	whiteboard_id serial primary key,
	whiteboard_name varchar(255) not null,
	creation_date date not null default CURRENT_DATE,
	whiteboard_content text
	user_id uuid,
		CONSTRAINT fk_user_id
		  	FOREIGN KEY(user_id) 
		  		REFERENCES users(user_id)
)



select * from users where user_email = $1 and user_name = $2;

select * from whiteboards;