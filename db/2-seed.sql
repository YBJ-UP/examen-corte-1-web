INSERT INTO estudiantes (nombre, correo, programa) VALUES
    ("Yael Betanzos Jiménez", "yael@gmail.com", "Sofsgüers"), --1
    ("Fulano de Fulán", "fulano@gmail.com", "Lage"), --2
    ("Juán Juán Juárez Jiménez", "juan@gmail.com", "Petro"), --3
    ("Pablo Petanzos Pascal", "pablo@gmail.com", "Ambiental"), --4
    ("Federico Fazbear", "federico@gmail.com", "Electricista"); --5

INSERT INTO maestros (nombre, correo) VALUES
    ("Profe 1", "one@gmail.com"), --1
    ("Profe 2", "zwei@gmail.com"), --2
    ("Profe 3", "tres@gmail.com"), --3
    ("Profe 4", "quattro@gmail.com"), --4
    ("Profe 5", "pente@gmail.com"); --5

INSERT INTO cursos (codigo, nombre, creditos) VALUES
    ("AWOS", "Aplicaciones Web Orientadas a Servicios", 40), --1
    ("EDD", "Estructura De Datos", 40), --2
    ("BD", "Bases de Datos", 40), --3
    ("I", "Inglés", 20), --4
    ("ED", "Ecuaciones diferenciales", 10), --5
    ("OTHR", "Materia x", 10), --6
    ("OTR", "Materia y", 10); --7

INSERT INTO grupos (id_curso, id_maestro, periodo) VALUES
    (1, 1, 5), --awos 1
    (2, 2, 3), --edd 2
    (3, 3, 3), --bd 3
    (4, 4, 5), --i 4
    (5, 5, 5), --ed 5
    (6, 2, 3), --x 6
    (7, 4, 3); --y 7

INSERT INTO inscripciones (id_estudiante, id_grupo) VALUES --ya me dio lata pero pues no quiero documentar ia
    (1, 1), --1
    (1, 4), --2
    (1, 5), --3
    (2, 2), --4
    (2, 3), --5
    (2, 6), --6
    (2, 7), --7
    (3, 1), --8
    (3, 4), --9
    (3, 5), --10
    (4, 2), --11
    (4, 3), --12
    (4, 6), --13
    (4, 7), --14
    (5, 1), --15
    (5, 4), --16
    (5, 5); --17

INSERT INTO calificaciones (id_inscripcion, parcial_1, parcial_2, final) VALUES
    (1, 80, 90, 100), --1
    (2, 100, 100, 100), --2
    (3, 89, 90, 90), --3
    (4, 98, 75, 67), --4
    (5, 84, 74, 98), --5
    (6, 85, 86, 98), --6
    (7, 86, 84, 86), --7
    (8, 57, 56, 69), --8
    (9, 88, 68, 86), --9
    (10, 76, 57, 65), --10
    (11, 97, 75, 95), --11
    (12, 78, 89, 67), --12
    (13, 68, 97, 70), --13
    (14, 94, 78, 89), --14
    (15, 83, 79, 78), --15
    (16, 68, 78, 68), --16
    (17, 78, 98, 85); --17

INSERT INTO asistencia (id_inscripcion, fecha, asistencia) VALUES
    (1, '2024-02-01', TRUE),
    (1, '2024-02-02', TRUE),
    (1, '2024-02-03', FALSE),
    (2, '2024-02-01', TRUE),
    (2, '2024-02-02', FALSE),
    (2, '2024-02-03', TRUE),
    (3, '2024-02-01', TRUE),
    (3, '2024-02-02', TRUE),
    (3, '2024-02-03', TRUE),
    (4, '2024-02-01', FALSE),
    (4, '2024-02-02', FALSE),
    (4, '2024-02-03', TRUE),
    (5, '2024-02-01', FALSE),
    (5, '2024-02-02', FALSE),
    (5, '2024-02-03', TRUE),
    (6, '2024-02-01', FALSE),
    (6, '2024-02-02', FALSE),
    (6, '2024-02-03', TRUE),
    (7, '2024-02-01', FALSE),
    (7, '2024-02-02', FALSE),
    (7, '2024-02-03', TRUE),
    (8, '2024-02-01', FALSE),
    (8, '2024-02-02', FALSE),
    (8, '2024-02-03', TRUE),
    (9, '2024-02-01', FALSE), -- ya no quieroooooooooo
    (9, '2024-02-02', FALSE),
    (9, '2024-02-03', TRUE),
    (10, '2024-02-01', FALSE),
    (10, '2024-02-02', FALSE),
    (10, '2024-02-03', TRUE),
    (11, '2024-02-01', FALSE),
    (11, '2024-02-02', FALSE),
    (11, '2024-02-03', TRUE),
    (12, '2024-02-01', FALSE),
    (12, '2024-02-02', FALSE),
    (12, '2024-02-03', TRUE),
    (13, '2024-02-01', FALSE),
    (13, '2024-02-02', FALSE),
    (13, '2024-02-03', TRUE),
    (14, '2024-02-01', FALSE),
    (14, '2024-02-02', FALSE),
    (14, '2024-02-03', TRUE),
    (15, '2024-02-01', FALSE),
    (15, '2024-02-02', FALSE),
    (15, '2024-02-03', TRUE),
    (16, '2024-02-01', FALSE),
    (16, '2024-02-02', FALSE),
    (16, '2024-02-03', TRUE),
    (17, '2024-02-01', FALSE),
    (17, '2024-02-02', FALSE),
    (17, '2024-02-03', TRUE);