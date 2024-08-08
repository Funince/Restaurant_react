create database restaurante;
USE restaurante;
-- Crear la tabla meseros
CREATE TABLE meseros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    DNI CHAR(8) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE meseros ADD CONSTRAINT unique_DNI UNIQUE (DNI);

-- Crear la tabla clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear la tabla puntuación
CREATE TABLE puntuaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_mesero INT NOT NULL,
    id_cliente INT NOT NULL,
    amabilidad INT NOT NULL,
    eficiencia INT NOT NULL,
    presentacion INT NOT NULL,
    conocimiento_menu INT NOT NULL,
	tiempo_espera INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mesero) REFERENCES meseros(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Insertar datos en la tabla meseros
INSERT INTO meseros (nombres, apellidos, DNI) VALUES 
('Juan', 'Pérez', '12345678'),
('Ana', 'García', '23456789'),
('Luis', 'Martínez', '34567890'),
('María', 'López', '45678901'),
('Carlos', 'González', '56789012'),
('Lucía', 'Fernández', '67890123'),
('Pedro', 'Sánchez', '78901234'),
('Elena', 'Ramírez', '89012345'),
('Miguel', 'Torres', '90123456'),
('Laura', 'Jiménez', '01234567');

-- Insertar datos en la tabla clientes
INSERT INTO clientes () VALUES 
(), (), (), (), (), (), (), (), (), ();

-- Insertar datos en la tabla puntuacion
INSERT INTO puntuaciones (id_mesero, id_cliente, amabilidad, eficiencia, presentacion, conocimiento_menu, tiempo_espera) VALUES 
(1, 1, 8, 9, 7, 8, 10),
(2, 2, 7, 6, 8, 9, 9),
(3, 3, 9, 8, 8, 7, 8),
(4, 4, 6, 7, 7, 8, 7),
(5, 5, 8, 9, 9, 9, 10),
(6, 6, 7, 7, 6, 7, 8),
(7, 7, 9, 9, 8, 8, 9),
(8, 8, 6, 7, 8, 7, 6),
(9, 9, 8, 8, 7, 8, 9),
(10, 10, 7, 9, 9, 8, 10),
(1, 2, 1, 1, 1, 1, 1);

select*from puntuaciones;

SELECT
    meseros.nombres AS mesero_nombres,
    meseros.apellidos AS mesero_apellidos,
    puntuaciones.amabilidad,
    puntuaciones.eficiencia,
    puntuaciones.presentacion,
    puntuaciones.conocimiento_menu,
    puntuaciones.tiempo_espera
FROM 
    puntuaciones
JOIN 
    meseros ON puntuaciones.id_mesero = meseros.id
JOIN 
    clientes ON puntuaciones.id_cliente = clientes.id;
    
CREATE VIEW PromediosPuntuacionesPorID AS
SELECT 
    id_mesero,
    ROUND(AVG(amabilidad), 2) AS avg_amabilidad,
    ROUND(AVG(eficiencia), 2) AS avg_eficiencia,
    ROUND(AVG(presentacion), 2) AS avg_presentacion,
    ROUND(AVG(conocimiento_menu), 2) AS avg_conocimiento_menu,
    ROUND(AVG(tiempo_espera), 2) AS avg_tiempo_espera,
    COUNT(*) AS total_clientes
FROM Puntuaciones
GROUP BY id_mesero;
SELECT * FROM PromediosPuntuacionesPorID

