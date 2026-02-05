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
    (11, 100, 100, 100), --11
    (12, 100, 100, 100), --12
    (13, 100, 100, 100), --13
    (14, 100, 100, 100), --14
    (15, 100, 100, 100), --15
    (16, 100, 100, 100), --16
    (17, 100, 100, 100), --17