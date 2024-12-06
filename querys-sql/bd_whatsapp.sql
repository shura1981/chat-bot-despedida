-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-12-2024 a las 15:45:35
-- Versión del servidor: 11.4.3-MariaDB-1
-- Versión de PHP: 7.3.33-21+ubuntu24.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_whatsapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_chats`
--

CREATE TABLE `tb_chats` (
  `id` bigint(20) NOT NULL,
  `tipo` enum('TEXT','MEDIA','BOTH','') NOT NULL DEFAULT 'TEXT',
  `mensaje` text DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `desde` varchar(12) NOT NULL,
  `para` varchar(12) NOT NULL,
  `content_type` enum('TEXT','IMAGE','AUDIO','VIDEO','PDF','EXCEL','WORD','FILE') NOT NULL DEFAULT 'TEXT',
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `dispositivo` varchar(20) NOT NULL DEFAULT 'api_rest',
  `name` varchar(50) DEFAULT NULL,
  `port` int(11) NOT NULL DEFAULT 8999
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_chats`
--
ALTER TABLE `tb_chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `desde` (`desde`),
  ADD KEY `para` (`para`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_chats`
--
ALTER TABLE `tb_chats`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
