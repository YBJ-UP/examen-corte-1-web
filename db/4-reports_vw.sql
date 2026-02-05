--VIEW 1
--UNA FILA POR CURSO + PERIODO
--PROMEDIOS Y REPROBADOS CON CASE
--FILTRO POR PERIODO Y/O PROGRAMA
CREATE OR REPLACE VIEW vw_rendimiento_curso AS
    SELECT
        c.nombre as curso,
        g.periodo,
        e.programa,
        COUNT(CASE WHEN ((ca.parcial_1 + ca.parcial_2 + ca.final)/3.0 > 70) THEN 1 END) AS reprobados

-- toma curso y periodo, programa pq lo pide y calificaciones pq la view es de calificaciones