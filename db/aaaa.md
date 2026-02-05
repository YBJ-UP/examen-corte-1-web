# triple t sahur  
# ESCENARIO  
  
Eres parte de coordinación académica. Necesitan un dashboard de reportes para identificar rendimiento, reprobación, asistencia y alumnos en riesgo. Tu app debe permitir filtrar por periodo y buscar alumnos, además de paginar resultados.
# DISEÑO DE BASE DE DATOS  
## TABLAS
1. estudiantes(id, nombre, correo, programa, anno_inscripcion)
2. maestros(id, nombre, correo)
3. cursos(id, codigo, nombre, creditos)
4. grupos(id, id_curso, id_maestro, periodo)
5. inscripciones(id, id_estudiante, id_grupo, fecha_inscripcion)
6. calificaciones(id, id_inscripcion, parcial1, parcial2, final)
7. asistencia(id, enrollment_id, fecha, asistencia)
## REPORTES (VIEWS)
1. vw_course_performance: 1 fila por course+term. Promedios y reprobados (CASE). Filtro por periodo y/o programa.
2. vw_teacher_load (HAVING): carga por docente+periodo (grupos, alumnos_totales, promedio_general). Paginable.
3. vw_students_at_risk (CTE): alumnos con promedio bajo o asistencia baja. Búsqueda por name/email y paginación.
4. vw_attendance_by_group (CASE/COALESCE): asistencia promedio por grupo (term).
5. vw_rank_students (Window): ranking por program y term
6. (RANK/ROW_NUMBER).
## ROL app
Sólo tendrá permiso de SELECT sobre las views