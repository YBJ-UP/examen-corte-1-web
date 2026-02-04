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
    ("ED", "Ecuaciones diferenciales", 10); --5
    ("OTHR", "Materia x", 10); --6
    ("OTR", "Materia y", 10); --7

INSERT INTO grupos (id_curso, id_maestro, periodo) VALUES
    (1, 1, 5), --awos 1
    (2, 2, 3), --edd 2
    (3, 3, 3), --bd 3
    (4, 4, 5), --i 4
    (5, 5, 5); --ed 5
    (6, 2, 3); --x 6
    (7, 4, 3); --y 7

INSERT INTO inscripciones (id_estudiante, id_grupo) VALUES --ya me dio lata pero pues no quiero documentar ia
    (1, 1),
    (1, 4),
    (1, 5),
    (2, 2),
    (2, 3),
    (2, 6),
    (2, 7),
    (3, 1),
    (3, 4),
    (3, 5),
    (4, 2),
    (4, 3),
    (4, 6),
    (4, 7),
    (5, 1),
    (5, 4),
    (5, 5);

