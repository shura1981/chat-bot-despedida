-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-12-2024 a las 16:55:46
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
-- Base de datos: `bd_campaigns`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_employees`
--

CREATE TABLE `tb_employees` (
  `id` bigint(20) NOT NULL,
  `id_empleado` bigint(20) NOT NULL,
  `celular` varchar(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `external` tinyint(4) NOT NULL DEFAULT 0,
  `amarillo` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_employees`
--

INSERT INTO `tb_employees` (`id`, `id_empleado`, `celular`, `nombre`, `external`, `amarillo`) VALUES
(1, 1118300773, '3148262540', 'ARROYO VERGARA JOSE ANDUIR', 0, 0),
(2, 1151936325, '3245882106', 'BETANCOURTH GERMAN ', 0, 0),
(3, 1143988875, '3183199700', 'LLANTEN GALINDEZ ANGIE VANESSA', 0, 0),
(4, 1006371344, '3126956801', 'LOZANO VALENCIA LUISA FERNANDA', 0, 0),
(5, 1061807851, '3134435320', 'ZUNIGA BUITRON NATALIA ANGELICA', 0, 0),
(6, 1006308780, '3027690809', 'ADARME MELO JEYSON ESNEYDER', 0, 0),
(7, 1114831781, '3163687673', 'ALBORNOZ  JUAN SEBASTIAN', 0, 0),
(8, 1113690538, '3188048931', 'ALBORNOZ ESCANDON BRAYAN STEVENS', 0, 0),
(9, 1114830323, '3147210524', 'BENAVIDES MUNOZ JAIRO YESSID', 0, 0),
(10, 1114834316, '3162327375', 'CAICEDO MAZO YESSICA ', 0, 0),
(11, 1143950975, '3173566343', 'CEPEDA MONTANO CARLOS ANDRES', 0, 0),
(12, 1113670394, '3116594218', 'CHAMPUTIS MONTOYA CARLOS ANDRES', 0, 0),
(13, 1143932369, '3042095653', 'CORTES KARINA ', 0, 0),
(14, 1143875881, '3167957198', 'GARCIA SALAS LUZ MARINA', 0, 0),
(15, 1006017708, '3178000615', 'HOYOS RENTERIA KEVIN FERNANDO', 0, 0),
(16, 1143870029, '3157370912', 'HURTADO GIRALDO ANA CAROLINA', 0, 0),
(17, 1114838453, '3103676038', 'IZQUIERDO PERDOMO WILSON ANDRES', 0, 0),
(18, 1118287130, '3116545451', 'MARTINEZ RIOS ANGELA MARIA', 0, 0),
(19, 1113541319, '3212382015', 'MOLANO GARCES JOHAN FERNANDO', 0, 0),
(20, 1006180084, '3214330286', 'NARVAEZ LUCIO STIVEN ALEJANDRO', 0, 0),
(21, 1113537146, '3107376082', 'OLAVE GOMEZ LUIS ARMANDO', 0, 0),
(22, 1113621297, '3185985202', 'PENA PIZARRO DIEGO FERNANDO', 0, 0),
(23, 1005943865, '3122056874', 'RAMIREZ GRAJALES JOHAN ', 0, 0),
(24, 1005705235, '3182854272', 'RIVERA GUZMAN STEWART EDUARDO', 0, 0),
(25, 1144180420, '3002263990', 'RODRIGUEZ VERGARA WILSON HERNEY', 0, 0),
(26, 1113639567, '3155745297', 'ROJAS GRANADA MARIA CONSTANZA', 0, 0),
(27, 1118311844, '3046217746', 'SANTIUSTI CAICEDO JOHN EDWARD', 0, 0),
(28, 1005706894, '3166732356', 'SANTIUSTI CAICEDO JUAN SEBASTIAN', 0, 0),
(29, 1004631604, '3153955378', 'TELLO DELGADO GUSTAVO ADOLFO', 0, 0),
(30, 1118299098, '3043493708', 'VILLAMIZAR CORREA BRYAN DANILO', 0, 0),
(31, 833104, '3006989966', 'ABREU ANGELES JOSE MIGUEL ', 0, 0),
(32, 94432109, '3116399941', 'ACOSTA MONTOYA JULIO CESAR', 0, 0),
(33, 1143836091, '3207502567', 'ALZATE CANO LINA VANESSA', 0, 0),
(34, 1113665389, '3216663018', 'ANGELICA PIEDRAHITA ANDREA PAOLA', 0, 0),
(35, 6382627, '3146408229', 'ARAMBURO RIVERA ANDRES ADOLFO', 0, 0),
(36, 94404273, '3007517328', 'BARRERA  GOMEZ JOHN ADRIANO', 0, 0),
(37, 1151939183, '3003931895', 'BENAVIDES JURADO INGRID VANESSA', 0, 0),
(38, 1151966319, '3116154746', 'BENITO NASPIRAN MICHAEL KENDY', 0, 0),
(39, 1114822363, '3162730325', 'CAICEDO MOSQUERA MARIA ELENA', 0, 0),
(40, 29363140, '3215422313', 'CARMONA ARAGON XIMENA', 0, 0),
(41, 79778447, '3217601441', 'CASTIBLANCO GOMEZ RICHARD SEGUNDO', 0, 0),
(42, 1118287862, '3112289990', 'CASTILLO OSORIO DAVID STEVEN', 0, 0),
(43, 1109184569, '3225816773', 'CASTRO CIFUENTES DIANA NICOLL ', 0, 0),
(44, 1130655735, '3027496022', 'CEBALLOS CARVAJAL DIANA CAROLINA', 0, 0),
(45, 29123363, '3184723022', 'CERON VIVAS ASTRID', 0, 0),
(46, 1143850289, '3053356875', 'CHILITO RODRIGUEZ JUAN MANUEL', 0, 0),
(47, 1143980072, '3016463720', 'CUERO LONDOÑO JUAN CARLOS', 0, 0),
(48, 1108334002, '3178223582', 'CUERO LONDONO CRISTIAN DAVID', 0, 0),
(49, 1144027080, '3008748071', 'DELGADO ANDRES MAURICIO', 0, 0),
(50, 1232405004, '3154979908', 'DURAN ALEMAN MARJORIE DANIELA ', 0, 0),
(51, 1113640894, '3194743919', 'FAJARDO ROJAS DEISY ESMERALDA', 0, 0),
(52, 1143852256, '3006387522', 'GALLEGO BELALCAZAR LAURA MILENA', 0, 0),
(53, 1130585518, '3217601449', 'GARCIA URBANO LUIS MIGUEL', 0, 0),
(54, 1130619588, '3108953470', 'GIRALDO MUÑOZ EDUARD ESTEBAN', 0, 0),
(55, 94071106, '3116399942', 'GIRON MUÑOZ FABIO NELSON', 0, 0),
(56, 4697258, '3126596740', 'GOMEZ PARRA ALEX', 0, 0),
(57, 66971450, '3175131233', 'GOMEZ VELEZ CLAUDIA PATRICIA ', 0, 0),
(58, 14623985, '3216236082', 'GORDILLO CERTUCHE JUAN CARLOS', 0, 0),
(59, 94460511, '3016208727', 'GORDILLO GOMEZ JULIAN ANDRES', 0, 0),
(60, 66786313, '3182854272', 'GUZMAN RODRIGUEZ YAZMIN', 0, 0),
(61, 31323108, '3174733798', 'HERRERA MELLIZO YULLY ANDREA', 0, 0),
(62, 16458652, '3045995747', 'LOPEZ GOMEZ ALEJANDRO', 0, 0),
(63, 1113635395, '3168940178', 'MERCADO ACOSTA BRIAN', 0, 0),
(64, 1151941139, '3226351709', 'MOSQUERA CORDOBA LINA MARCELA', 0, 0),
(65, 94064491, '3205556962', 'ORTEGA TAMAYO JORGE ANDRES ', 0, 0),
(66, 1002975857, '3122027383', 'ORTIZ MAYORGA KEVIN STIVEN', 0, 0),
(67, 1064429386, '3234510451', 'OSNAS OSNAS MILDRED TULIA', 0, 0),
(68, 6394880, '3175346352', 'REALPE PARRA STEVEN HERMINSUL', 0, 0),
(69, 31881733, '3117028887', 'RIVAS BERMUDEZ ESPERANZA', 0, 0),
(70, 1107054225, '3217601443', 'RODRIGUEZ DIAZ JESSICA FERNANDA', 0, 0),
(71, 16286023, '3006336915', 'ROSAS TASCON LLAMPIER', 0, 0),
(72, 1130608878, '3226054275', 'SOTELO MARTINEZ LUCELLY', 0, 0),
(73, 25298237, '3216248143', 'SOTELO MARTINEZ LUZ MARY', 0, 0),
(74, 1114727754, '3014260585', 'TABARES CABRERA JOHN ESTEBAN', 0, 0),
(75, 1107057970, '3175175100', 'TAMAYO PALACIOS ANDRES FELIPE', 0, 0),
(76, 94556402, '3122027384', 'TOVAR PEÑA ANDRES FERNANDO', 0, 0),
(77, 1130632271, '3207579146', 'TRUJILLO ANDRADE JOHN WILSON', 0, 0),
(78, 16759976, '3116497092', 'VALENCIA LOPEZ JOHN JAMES', 0, 0),
(79, 1006100881, '3223598662', 'VILLADA CASTILLO MARIANA', 0, 0),
(80, 1004342178, '3185157557', ' ANGULO ANGULO BRAYAN ALEXIS', 0, 0),
(81, 1007735699, '3144128193', 'ANGULO RENTERIA CARLOS ANDRES', 0, 0),
(82, 9521466, '3117644198', 'ARANGUREN JOYA MARCO FIDEL', 0, 0),
(83, 1118298321, '3146136695', 'BRAVO SUAREZ JHONN MICHAEL', 0, 0),
(84, 1118296481, '3103904187', 'BURBANO BUSTAMANTE RICARDO ALFONSO', 0, 0),
(85, 1144037809, '3146078491', 'CAMPO CABRERA RUBEN DARIO', 0, 0),
(86, 1114836815, '3206875172', 'CHAMORRO ADARME JHON ALEXANDER', 0, 0),
(87, 16823806, '3104011016', 'CHICANGANA PALECHOR ELIECER', 0, 0),
(88, 1144190999, '3183360282', 'ERAZO GONZALEZ OMAR YAMIL ', 0, 0),
(89, 1143839039, '3175633483', 'ENRIQUEZ BAÑOL FRANCISCO ANTONIO', 0, 0),
(90, 66842455, '3147582197', 'GRANDA PARRA LUZ STELLA', 0, 0),
(91, 1144109189, '3004755565', 'GUTIERREZ CRUZ LUIS ENRIQUE', 0, 0),
(92, 1140416116, '3104585985', 'LUNA HERNANDEZ LAURA GABRIELA ', 0, 0),
(93, 14608479, '3152912092', 'LOPEZ RODRIGUEZ HECTOR FABIO', 0, 0),
(94, 1113688120, '3106728094', 'LOZADA ROJAS LENIX GEOVANNY', 0, 0),
(95, 1006341969, '3205163516', 'MENDEZ TAMAYO DEIBY JOAN', 0, 0),
(96, 1143985950, '3216487531', 'MORALES  HERRERA VICTOR MANUEL', 0, 0),
(97, 14677842, '3215321373', 'MORENO CUMACO ROBINSON', 0, 0),
(98, 76047309, '3182222602', 'MUÑOZ EIDER JAIR ', 0, 0),
(99, 1002917367, '3213336779', 'NARVAEZ ZAMBRANO SEBASTIAN ', 0, 0),
(100, 1118292193, '3163485418', 'NIEVA MOTATO BRIGIETTE MARCELA', 0, 0),
(101, 94417403, '3155293033', 'ORTEGA LUIS ALFREDO', 0, 0),
(102, 1144146999, '3186215009', 'PALECHOR GALVEZ JAIRO ALEJANDRO', 0, 0),
(103, 1077974450, '3196076609', 'PASCUAS DIAZ JUAN DAVID', 0, 0),
(104, 1144099114, '3116533833', 'PATIÑO GONZALEZ ANDRES FELIPE ', 0, 0),
(105, 94510701, '3206533163', 'PATIÑO LOPEZ JAIRO ANIBAL', 0, 0),
(106, 1115078665, '3163929885', 'POSADA ORTIZ ANDRES MAURICIO', 0, 0),
(107, 31324488, '3217265314', 'RIOS MORALES JULIE ANDREA', 0, 0),
(108, 1113659785, '3185276731', 'SAAVEDRA GUZMAN NAILA ALEXANDRA ', 0, 0),
(109, 1143935664, '3216925345', 'SALAZAR FIGUEROA LUIS FELIPE', 0, 0),
(110, 16804148, '3004580379', 'SPADAFORA LONDOÑO JAIME', 0, 0),
(111, 94064073, '3157958381', 'SUAZA REINA HECTOR FABIO', 0, 0),
(112, 94509501, '3005144562', 'TAMAYO ZAPATA WILLIAM', 0, 0),
(113, 1114091828, '3234731541', 'VALENCIA CAICEDO YORMAN STIVEN', 0, 0),
(114, 1113541293, '3113931754', 'VASQUEZ RAMOS VALENTINA ', 0, 0),
(115, 1113665037, '3147439291', 'VELASQUEZ GARCIA JAIRO ALONSO', 0, 0),
(116, 1151942956, '3168223255', 'VILLA MONTOYA JORGE ARLED', 0, 0),
(117, 1144045415, '3105790467', 'ZAMORA DIAZ MARIA ELENA', 0, 0),
(118, 29899444, '3153559506', 'OSORNO SANDRA ', 0, 0),
(119, 1151949275, '3183886668', 'CARABALI DAGOBERTO ', 0, 0),
(120, 1143865005, '3125179591', 'JESSICA QUIÑONES ALVAREZ', 0, 0),
(121, 17627674, '3152823331', 'CUENCA ALFREDO ', 0, 0),
(185, 1143160747, '3127137193', 'BELENO MEJIA LORENA MARCELA', 1, 1),
(186, 1014248928, '3138443776', 'BELLO TELLEZ CRISTIAN ANDRES', 1, 0),
(187, 1057581030, '3229421749', 'CHAPARRO PESCADOR JHON HENRY', 1, 0),
(188, 1013104555, '3209683161', 'DIAZ CRUZ JUAN ESTEBAN', 1, 0),
(189, 1192751743, '3158253776', 'ESPINOSA ROZO JHONNATAN STEVEN', 1, 0),
(190, 1128456907, '3124708535', 'FLOREZ HERNANDEZ LAURA GISELA', 1, 0),
(191, 1000857534, '3058616010', 'LOPEZ MARTIN GERSON FELIPE', 1, 0),
(192, 1020442547, '3128743092', 'MARTINEZ CORREA ELIZABETH ', 1, 0),
(193, 1018508555, '3215877589', 'MORENO TORRES JULIAN ', 1, 0),
(194, 1024541957, '3197772383', 'PENALOZA HERNANDEZ HEIDER ROLANDO', 1, 0),
(195, 1127617380, '3204742324', 'RAMIREZ BECERRA PATRICIA CAROLINA', 1, 0),
(196, 1007689654, '3023281737', 'ROCHA LOAIZA JHON JAIRO', 1, 0),
(197, 1088355817, '3225683320', 'SUAREZ CANO SEBASTIAN ', 1, 0),
(198, 1088019186, '3016831655', 'ALVAREZ CHAVES MICHAEL STEVEN ', 1, 0),
(199, 1018484983, '3222234542', 'ARIAS CARDENAS MIGUEL ANGEL', 1, 0),
(200, 1018513475, '3184004073', 'BRIÑEZ LARA CAMILO ANDRES', 1, 0),
(201, 71752335, '3217997725', 'BUITRAGO JARAMILLO JHON JAIRO', 1, 0),
(202, 8433728, '3217601448', 'CAÑAS TABARES JHON FREDY', 1, 0),
(203, 1090174048, '3125713162', 'CASTIBLANCO GAITAN MANUEL FERNANDO', 1, 0),
(204, 79218898, '3105792976', 'CASTIBLANCO LLANOS GERMAN', 1, 0),
(205, 1042445380, '3002827457', 'CASTRO RAMIREZ ROSA MILENA', 1, 1),
(206, 53100857, '3134953177', 'CORTES HERNANDEZ MONICA', 1, 0),
(207, 72273113, '3045733902', 'DORIA DE LEON JEIFRE', 1, 1),
(208, 1232405006, '3188869326', 'DURAN ALEMAN EMILY MARIA ', 1, 0),
(209, 1043877604, '3007572949', 'FLOREZ CASTILLO MARCELO ALEXANDER', 1, 1),
(210, 1017233546, '3102968303', 'GIL ROJAS LAURA', 1, 0),
(211, 1143438079, '3014607558', 'GUERRERO  COBA JESUS ALBERTO', 1, 1),
(212, 1111454444, '3143807838', 'HENAO OSORIO CRISTIAN ANDRES', 1, 0),
(213, 16287526, '3017635920', 'JIMENEZ ADOLFO', 1, 0),
(214, 88000943, '3023282693', 'LAGOS GUTIERREZ ANTONIO', 1, 0),
(215, 1053617375, '3195813424', 'LARA GARCIA NIXON BERNABE', 1, 0),
(216, 1017183643, '3003757513', 'LOPERA CASTAÑEDA JAVIER ALONSO', 1, 0),
(217, 1038770605, '3226261267', 'MARIN JIMENEZ CARLOS ANDRES', 1, 0),
(218, 1045706398, '3045735731', 'MARTINEZ TAPIERO IAN SAMIR', 1, 1),
(219, 1140881529, '3004627005', 'MAURY BLANCO VIVIAN ALEJANDRA', 1, 1),
(220, 1127621441, '3222862231', 'MOLINA BUITRAGO MAYDEL ANDREA', 1, 0),
(221, 1014248351, '3057497855', 'MOLINA SANCHEZ BRIAN FERNELY', 1, 0),
(222, 1000832014, '3046008982', 'MORA CAÑON MICHEL ARTURO', 1, 0),
(223, 1104071324, '3209771019', 'MURCIA GONZALEZ DIEGO FERNANDO', 1, 0),
(224, 1026266622, '3232244517', 'NARANJO CARDENAS GABRIEL ALEJANDRO', 1, 0),
(225, 1102372510, '3156598469', 'NOBLES FIGUEROA JAVIER ENRIQUE', 1, 0),
(226, 1214726250, '3014264263', 'OCAMPO VASQUEZ JUAN ESTEBAN ', 1, 0),
(227, 1040737640, '3041014398', 'ORTIZ MARTINEZ ALEXANDER', 1, 0),
(228, 1143133771, '3024161133', 'OSPINO ACUÑA OCTAVIO ALBERTO', 1, 1),
(229, 80248562, '3046008995', 'PALACIO NIÑO FABIO ERNESTO', 1, 0),
(230, 1090503719, '3135936747', 'PARDO BLANCO MARBEL YULIANA', 1, 0),
(231, 1094368244, '3132442362', 'RAMIREZ VERA JESUS MANUEL', 1, 0),
(232, 1010244591, '3160535361', 'ROA SUAREZ LUISA FERNANDA', 1, 0),
(233, 1033787591, '3227856053', 'RODRIGUEZ ENCISO MARIA ALEJANDRA', 1, 0),
(234, 1014212729, '3114497530', 'ROSERO MORENO JHAN FERNEY', 1, 0),
(235, 1013346366, '3002569992', 'TORRES CORREA EDWIN ', 1, 0),
(236, 1012319431, '3229411047', 'TRONCOSO LEGRO DANIEL ', 1, 0),
(237, 72157604, '3217601447', 'VALENCIA MONTOYA CARLOS ARLES', 1, 1),
(238, 1001853978, '3022652754', 'VALENCIA MOZO DIEGO ANDRES', 1, 1),
(239, 1193565969, '3042433072', 'VALENCIA VILLEGAS MARIAM JULIANA', 1, 0),
(240, 1090364711, '3045735738', 'VARGAS SANDOVAL SERGIO GEOVANNI', 1, 0),
(241, 1038767874, '3134851721', 'VELEZ CANO ANDRES DAVID', 1, 0),
(242, 91487843, '3118713131', 'VERA JAIMES GUBERTH JOSE', 1, 0),
(243, 1010093313, '3203812005', 'VERA TORRES ANA VALENTINA', 1, 0),
(244, 1090518225, '3023874854', 'VILLAMIZAR GIL IVAN ERNESTO', 1, 0),
(245, 1090370678, '3195325846', 'VILLAMIZAR JAIME NELSON AUGUSTO', 1, 0),
(246, 1000522123, '3024934836', 'MORALES CHIQUIZA JUAN SEBASTIAN', 1, 0),
(247, 1030688430, '3013262261', 'CABRERA VALERA DILAN STIVEN', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_employees`
--
ALTER TABLE `tb_employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_employees`
--
ALTER TABLE `tb_employees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
