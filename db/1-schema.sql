-- ============================================
-- SCHEMA.SQL - Definición de Estructura
-- ============================================
-- Equipo: Yael Betanzos Jiménez
-- Fecha: Hoy
-- Dominio: Dashboard de coordinación académica
-- ============================================

-- Limpiar tablas si existen (útil para desarrollo)
-- CUIDADO: Esto borra todos los datos
DROP TABLE IF EXISTS estudiantes CASCADE; --no se que hace el cascade ya se me olvido ahi despues se cambia
DROP TABLE IF EXISTS maestros CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;
DROP TABLE IF EXISTS grupos CASCADE;
DROP TABLE IF EXISTS inscripciones CASCADE;
DROP TABLE IF EXISTS calificaciones CASCADE;
DROP TABLE IF EXISTS asistencia CASCADE;

CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    programa VARCHAR(100) NOT NULL, --como el nombre de la carrera
    anno_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE maestros (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL
);

CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(5) NOT NULL UNIQUE, --supongo que una abreviacion del nombre (como AWOS para esta materia)
    nombre VARCHAR(100) NOT NULL,
    creditos INTEGER NOT NULL CHECK (creditos > 0) --no se como medir esto
);

CREATE TABLE grupos (
    id SERIAL PRIMARY KEY,
    id_curso INTEGER NOT NULL REFERENCES cursos(id),
    id_maestro INTEGER NOT NULL REFERENCES maestros(id),
    periodo INTEGER NOT NULL CHECK (periodo > 0 AND periodo <=15) --este es el cuatri (digamos que va de 1 a 15)
);

CREATE TABLE inscripciones (
    id SERIAL PRIMARY KEY,
    id_estudiante INTEGER NOT NULL REFERENCES estudiantes(id),
    id_grupo INTEGER NOT NULL REFERENCES grupos(id),
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE calificaciones ( --calificaciones de 0 a 100
    id SERIAL PRIMARY KEY,
    id_inscripcion INTEGER NOT NULL REFERENCES inscripciones(id),
    parcial_1 INTEGER CHECK (parcial_1 >= 0 AND parcial_1 <= 100),
    parcial_2 INTEGER CHECK (parcial_2 >= 0 AND parcial_2 <= 100),
    final INTEGER CHECK (final >= 0 AND final <= 100)
);

CREATE TABLE asistencia (
    id SERIAL PRIMARY KEY,
    id_inscripcion INTEGER NOT NULL REFERENCES inscripciones(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    asistencia BOOLEAN
);

-- ESTUDIANTES HASTA ACÁ


-- ============================================
-- ÍNDICES (para optimizar consultas)
-- ============================================

--Índice para búsquedas de inscripciones por estudiante
CREATE INDEX idx_inscripciones_estudiante ON inscripciones(id_estudiante);

-- Índice para búsquedas de inscripciones por grupo
CREATE INDEX idx_inscripciones_grupo ON inscripciones(id_grupo);

--Índice para búsquedas de cursos por maestro
CREATE INDEX idx_cursos_maestro ON cursos(id_maestro);

-- ============================================
-- COMENTARIOS DE TABLAS (documentación en BD)
-- ============================================

COMMENT ON TABLE estudiantes IS 'Estudiantes en la escuela';
COMMENT ON TABLE maestros IS 'Docentes en la escuela';
COMMENT ON TABLE cursos IS 'Las materias que existen';
COMMENT ON TABLE grupos IS 'Grupos que existen, de qué materia son y qué docente la da';
COMMENT ON TABLE inscripciones IS 'Alumnos inscritos a un grupo y la fecha en la que se inscribieron';
COMMENT ON TABLE calificaciones IS 'Calificación de cada alumno por parcial, toma la inscripción y no el alumno en sí';
COMMENT ON TABLE asistencia IS 'Si un estudiante asistio a una clase en un día dado';

-- ============================================
-- FIN DEL SCHEMA
-- ============================================
-- Para ejecutar: \i db/schema.sql