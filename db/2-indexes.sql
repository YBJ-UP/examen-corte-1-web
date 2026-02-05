-- ============================================
-- ÍNDICES (para optimizar consultas)
-- ============================================

--Índice para búsquedas de inscripciones por estudiante
CREATE INDEX idx_inscripciones_estudiante ON inscripciones(id_estudiante);

-- Índice para búsquedas de inscripciones por grupo
CREATE INDEX idx_inscripciones_grupo ON inscripciones(id_grupo);

--Índice para búsquedas de cursos por maestro
CREATE INDEX idx_cursos_maestro ON cursos(id_maestro);