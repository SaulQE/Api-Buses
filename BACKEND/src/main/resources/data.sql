-- Insertar marcas sin duplicados
INSERT IGNORE INTO marcas (id, nombre) VALUES (default, 'Volvo');
INSERT IGNORE INTO marcas (id, nombre) VALUES (default, 'Scania');
INSERT IGNORE INTO marcas (id, nombre) VALUES (default, 'Fiat');

-- Insertar roles sin duplicados
INSERT IGNORE INTO roles (id, nombre) VALUES (default, 'BASIC');
INSERT IGNORE INTO roles (id, nombre) VALUES (default, 'ADMIN');
INSERT IGNORE INTO roles (id, nombre) VALUES (default, 'DBA');
