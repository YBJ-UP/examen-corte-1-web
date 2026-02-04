-- ============================================
-- SCHEMA.SQL - Definición de Estructura
-- ============================================
-- Equipo: Yael Betanzos Jiménez
-- Fecha: Hoy
-- Dominio: Dashboard de coordinación académica
-- ============================================

-- Limpiar tablas si existen (útil para desarrollo)
-- CUIDADO: Esto borra todos los datos
DROP TABLE IF EXISTS tabla_relacion CASCADE;
DROP TABLE IF EXISTS tabla_hija CASCADE;
DROP TABLE IF EXISTS tabla_padre CASCADE;

CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    programa VARCHAR(100) NOT NULL, --como la carrera
    anno_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE maestros (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(100) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    creditos INTEGER NOT NULL
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

-- Índice para búsquedas por usuario en órdenes
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);

-- Índice para búsquedas por categoría en productos
CREATE INDEX idx_productos_categoria_id ON productos(categoria_id);

-- Índice para búsquedas por status de orden
CREATE INDEX idx_ordenes_status ON ordenes(status);

-- ============================================
-- COMENTARIOS DE TABLAS (documentación en BD)
-- ============================================

COMMENT ON TABLE categorias IS 'Catálogo de categorías de productos';
COMMENT ON TABLE usuarios IS 'Usuarios del sistema';
COMMENT ON TABLE productos IS 'Catálogo de productos disponibles';
COMMENT ON TABLE ordenes IS 'Órdenes/pedidos de los usuarios';
COMMENT ON TABLE orden_detalles IS 'Detalle de productos por orden';

-- ============================================
-- FIN DEL SCHEMA
-- ============================================
-- Para ejecutar: \i db/schema.sql