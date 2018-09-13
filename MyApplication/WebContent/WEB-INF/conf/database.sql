-- Version 1.0
-- MySQL

-- Create database
CREATE DATABASE baby_db;

-- Using database
USE baby_db;

-- Customer table
CREATE TABLE `customer` (
`userId` char(20) NOT NULL,
`password` char(10) DEFAULT NULL,
`name` char(20) DEFAULT NULL
);