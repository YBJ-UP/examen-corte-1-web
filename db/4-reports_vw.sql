--VIEW 1
--UNA FILA POR CURSO + PERIODO
--PROMEDIOS Y REPROBADOS CON CASE
--FILTRO POR PERIODO Y/O PROGRAMA
CREATE OR REPLACE VIEW vw_rendimiento_curso AS
    SELECT
        c.nombre as curso,
        g.periodo,
        e.programa,
        ROUND((ca.parcial_1 + ca.parcial_2 + ca.final)/3.0,2) AS promedio,
        COUNT(CASE WHEN ((ca.parcial_1 + ca.parcial_2 + ca.final)/3.0 > 70) THEN 1 END) AS reprobados
    FROM cursos c
    JOIN grupos g ON c.id = g.id_curso
    JOIN inscripciones i ON i.id_grupo = g.id
    JOIN calificaciones ca ON ca.id_inscripcion = i.id
    JOIN estudiantes e ON e.id = i.id_estudiante
    GROUP BY c.nombre;

-- toma curso y periodo, programa pq lo pide y calificaciones pq la view es de calificaciones, las inscripciones pq las calificaciones van ligadas a esas