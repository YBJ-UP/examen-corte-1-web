--VIEW 1
--UNA FILA POR CURSO + PERIODO
--PROMEDIOS Y REPROBADOS CON CASE
--FILTRO POR PERIODO Y/O PROGRAMA
CREATE OR REPLACE VIEW vw_rendimiento_curso AS
    SELECT
        c.nombre as curso,
        g.periodo,
        e.programa,
        ROUND(AVG((ca.parcial_1 + ca.parcial_2 + ca.final)/3.0),2) AS promedio,
        COUNT(CASE WHEN ((ca.parcial_1 + ca.parcial_2 + ca.final)/3.0 > 70) THEN 1 END) AS reprobados
    FROM cursos c
    JOIN grupos g ON c.id = g.id_curso
    JOIN inscripciones i ON i.id_grupo = g.id
    JOIN calificaciones ca ON ca.id_inscripcion = i.id
    JOIN estudiantes e ON e.id = i.id_estudiante
    GROUP BY c.nombre, g.periodo, e.programa
    ORDER BY e.programa;

--prueba
SELECT * FROM vw_rendimiento_curso;

-- toma curso y periodo, programa pq lo pide y calificaciones pq la view es de calificaciones, las inscripciones pq las calificaciones van ligadas a esas

--VIEW 2
--CARGA DE DOCENTE + PERIODO
--ATRIBUTOS grupos, alumnos_totales (supongo que por periodo), promedio_general
--DEBE DE TENER UN HAVING
CREATE OR REPLACE VIEW vw_carga_maestro AS
    SELECT
        m.nombre AS maestro,
        g.periodo,
        COUNT(DISTINCT g.id) AS grupos,
        COUNT(DISTINCT i.id) AS alumnos,
        ROUND(AVG((ca.parcial_1 + ca.parcial_2 + ca.final)/3.0),2) as promedio_general
    FROM maestros m
    JOIN grupos g ON g.id_maestro = m.id
    JOIN inscripciones i ON i.id_grupo = g.id
    JOIN calificaciones ca ON ca.id_inscripcion = i.id
    GROUP BY m.nombre, g.periodo
    ORDER BY m.nombre;

SELECT * FROM vw_carga_maestro;

--VIEW 3
--ALUMNOS CON PROMEDIO O ASISTENCIAS BAJAS
--BUSQUEDA POR NOMBRE Y CORREO + PAGINACION
--DEBE LLEVAR CTE
--ahorita lo hago

--VIEW 4
--ASISTENCIA PROMEDIO POR GRUPO + PERIODO (supongo que porcentaje pq si no como seria)
--DEBE DE TENER CASE/COALESCE
--asistencias pasa primero por inscripcion y dps por grupo
CREATE OR REPLACE VIEW vw_asistencia_por_grupo AS
    SELECT
        g.id as grupo,
        COALESCE( ROUND( AVG( CASE WHEN a.asistencia=TRUE THEN 1 ELSE 0 END ), 2 )*100, 0 ) as promedio_asistencias
    FROM grupos g
    JOIN inscripciones i ON i.id_grupo = g.id
    JOIN asistencias a ON a.id_inscripcion = i.id
    GROUP BY g.id
    ORDER BY g.id;

SELECT * FROM vw_asistencia_por_grupo;

--VIEW 5
--RANKING POR PROGRAMA Y PERIODO (supongo que de calificaciones)
--DEBE DE TENER RANK() o alguna cosa asi y algo que se llama PARTITION BY creo
CREATE OR REPLACE VIEW vw_tablero_estudiantes AS
    SELECT
        e.nombre AS estudiante,
        e.programa,
        g.periodo,
        ROUND( AVG( (ca.parcial_1 + ca.parcial_2 + ca.final)/3.0 ) ,2) as promedio,
        RANK() OVER ( ORDER BY ROUND( AVG( (ca.parcial_1 + ca.parcial_2 + ca.final)/3.0 ) ,2) DESC ) AS lugar
    FROM estudiantes e
    JOIN inscripciones i ON e.id = i.id_estudiante
    JOIN calificaciones ca ON ca.id_inscripcion = i.id
    JOIN grupos g ON g.id = i.id_grupo
    GROUP BY e.nombre, e.programa, g.periodo;

SELECT * FROM vw_tablero_estudiantes;