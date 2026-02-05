DROP ROLE IF EXISTS app;

CREATE ROLE app WITH 
LOGIN 
PASSWORD '12345678'
NOSUPERUSER
NOCREATEDB
NOCREATEROLE
INHERIT;

GRANT USAGE ON SCHEMA public TO app;
GRANT SELECT ON vw_rendimiento_curso TO app;
-- dar permiso para los reportes (cuando los haga)