import { query } from "@/lib/db"
import { reporte2 } from "@/shared/interfaces/reporte_2"

export const dynamic='force-dynamic'

export default async function reporte_2 () {
    const view = await query('SELECT * FROM vw_carga_maestro;')
    if (!view.rows) {
        throw new Error('Error al conseguir los reportes')
    }
    const reporte:reporte2[] = view.rows
    return (
        <div>
            <h1 className="text-2xl font-bold">Carga del maestro</h1>
            <p>Cuántos grupos y alumnos están bajo la tutela de cada profesor.</p>
            
            <p>{reporte[0].alumnos}</p>
        </div>
    )
}