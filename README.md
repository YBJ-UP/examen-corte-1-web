## Inicializar el proyecto

Este proyecto es despegable con Docker compose y se puede iniciar con el siguiente comando:

```bash
docker compose up --build
```

Una vez inicializado, abra [http://localhost:3000](http://localhost:3000) en su navegador para ver el proyecto.


# Índices

La base de datos de este proyecto cuenta con 3 índices:
## idx_inscripciones_estudiante
Creado con la consulta:
```sql
CREATE INDEX idx_inscripciones_estudiante ON inscripciones(id_estudiante);
```
### Verificación
Con la consulta:
```sql
-- Esta consulta une inscripciones según el id del estudiante
EXPLAIN ANALYZE SELECT * FROM vw_estudiantes_preocupantes;
```
Se obtiene el siguiente resultado:
```
                                                                                                                          QUERY PLAN                                                                               

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 HashAggregate  (cost=67.68..69.96 rows=28 width=500) (actual time=0.424..0.434 rows=4 loops=1)
   Group Key: e.nombre, e.correo
   Filter: ((round(avg(((((ca.parcial_1 + ca.parcial_2) + ca.final))::numeric / 3.0)), 2) < '70'::numeric) OR (round(((((sum(CASE WHEN asis.asistencia THEN 1 ELSE 0 END))::numeric * 1.0) / (count(asis.id))::numeric) * '100'::numeric), 2) < '70'::numeric))
   Batches: 1  Memory Usage: 24kB
   Rows Removed by Filter: 1
   ->  Nested Loop  (cost=23.19..66.53 rows=51 width=453) (actual time=0.311..0.372 rows=51 loops=1)
         ->  Hash Join  (cost=23.05..56.93 rows=51 width=21) (actual time=0.232..0.246 rows=51 loops=1)
               Hash Cond: (ca.id_inscripcion = i.id)
               ->  Seq Scan on calificaciones ca  (cost=0.00..27.00 rows=1700 width=16) (actual time=0.033..0.035 rows=17 loops=1)
               ->  Hash  (cost=22.41..22.41 rows=51 width=17) (actual time=0.161..0.162 rows=51 loops=1)
                     Buckets: 1024  Batches: 1  Memory Usage: 11kB
                     ->  Nested Loop  (cost=0.16..22.41 rows=51 width=17) (actual time=0.089..0.136 rows=51 loops=1)
                           ->  Seq Scan on asistencias asis  (cost=0.00..1.51 rows=51 width=9) (actual time=0.004..0.007 rows=51 loops=1)
                           ->  Memoize  (cost=0.16..1.12 rows=1 width=8) (actual time=0.002..0.002 rows=1 loops=51)
                                 Cache Key: asis.id_inscripcion
                                 Cache Mode: logical
                                 Hits: 34  Misses: 17  Evictions: 0  Overflows: 0  Memory Usage: 2kB
                                 ->  Index Scan using inscripciones_pkey on inscripciones i  (cost=0.15..1.11 rows=1 width=8) (actual time=0.005..0.005 rows=1 loops=17)
                                       Index Cond: (id = asis.id_inscripcion)
         ->  Index Scan using estudiantes_pkey on estudiantes e  (cost=0.14..0.19 rows=1 width=440) (actual time=0.002..0.002 rows=1 loops=51)
               Index Cond: (id = i.id_estudiante)
 Planning Time: 7.336 ms
 Execution Time: 0.960 ms
```
Con la consulta:
```sql
EXPLAIN ANALYZE SELECT * FROM vw_estudiantes_preocupantes WHERE promedio_calificaciones < 60;
```
Se obtiene:
```
                                                                                                                                                                             QUERY PLAN                             

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 HashAggregate  (cost=67.68..69.88 rows=9 width=500) (actual time=0.337..0.340 rows=0 loops=1)
   Group Key: e.nombre, e.correo
   Filter: ((round(avg(((((ca.parcial_1 + ca.parcial_2) + ca.final))::numeric / 3.0)), 2) < '60'::numeric) AND ((round(avg(((((ca.parcial_1 + ca.parcial_2) + ca.final))::numeric / 3.0)), 2) < '70'::numeric) OR (r HashAggregate  (cost=67.68..69.88 rows=9 width=500) (actual time=0.337..0.340 rows=0 loops=1)
 HashAggregate  (cost=67.68..69.88 rows=9 width=500) (actual time=0.337..0.340 rows=0 loops=1)
 HashAggregate  (cost=67.68..69.88 rows=9 width=500) (actual time=0.337..0.340 rows=0 loops=1)
   Group Key: e.nombre, e.correo
   Filter: ((round(avg(((((ca.parcial_1 + ca.parcial_2) + ca.final))::numeric / 3.0)), 2) < '60'::numeric) AND ((round(avg(((((ca.parcial_1 + ca.parcial_2) + ca.final))::numeric / 3.0)), 2) < '70'::numeric) OR (round(((((sum(CASE WHEN asis.asistencia THEN 1 ELSE 0 END))::numeric * 1.0) / (count(asis.id))::numeric) * '100'::numeric), 2) < '70'::numeric)))
   Batches: 1  Memory Usage: 24kB
   Rows Removed by Filter: 5
   ->  Nested Loop  (cost=23.19..66.53 rows=51 width=453) (actual time=0.225..0.286 rows=51 loops=1)
         ->  Hash Join  (cost=23.05..56.93 rows=51 width=21) (actual time=0.195..0.209 rows=51 loops=1)
               Hash Cond: (ca.id_inscripcion = i.id)
               ->  Seq Scan on calificaciones ca  (cost=0.00..27.00 rows=1700 width=16) (actual time=0.027..0.029 rows=17 loops=1)
               ->  Hash  (cost=22.41..22.41 rows=51 width=17) (actual time=0.114..0.115 rows=51 loops=1)
                     Buckets: 1024  Batches: 1  Memory Usage: 11kB
                     ->  Nested Loop  (cost=0.16..22.41 rows=51 width=17) (actual time=0.046..0.088 rows=51 loops=1)
                           ->  Seq Scan on asistencias asis  (cost=0.00..1.51 rows=51 width=9) (actual time=0.008..0.012 rows=51 loops=1)
                           ->  Memoize  (cost=0.16..1.12 rows=1 width=8) (actual time=0.001..0.001 rows=1 loops=51)
                                 Cache Key: asis.id_inscripcion
                                 Cache Mode: logical
                                 Hits: 34  Misses: 17  Evictions: 0  Overflows: 0  Memory Usage: 2kB
                                 ->  Index Scan using inscripciones_pkey on inscripciones i  (cost=0.15..1.11 rows=1 width=8) (actual time=0.003..0.003 rows=1 loops=17)
                                       Index Cond: (id = asis.id_inscripcion)
         ->  Index Scan using estudiantes_pkey on estudiantes e  (cost=0.14..0.19 rows=1 width=440) (actual time=0.001..0.001 rows=1 loops=51)
               Index Cond: (id = i.id_estudiante)
 Planning Time: 0.695 ms
 Execution Time: 0.638 ms
(23 rows)
```
## idx_inscripciones_grupo
Creado con la consulta:
```sql
CREATE INDEX idx_inscripciones_grupo ON inscripciones(id_grupo);
```
a
## idx_grupos_maestro
Creado con la consutla:
```sql
CREATE INDEX idx_grupos_maestro ON grupos(id_maestro);
```
a