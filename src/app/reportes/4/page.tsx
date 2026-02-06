import { query } from "@/lib/db"
import { reporte4Type } from "@/shared/interfaces/reporte_4"

export const dynamic = 'force-dynamic'

export default async function reporte_4 () {
    const res = await query('SELECT * FROM vw_asistencia_por_grupo;')
    if (!res.rows){
        throw new Error('Error al obtener los datos')
    }
    const data:reporte4Type[] = res.rows
    return (
        <div className="flex flex-col m-10">
            <h1 className="text-2xl font-bold">Asistencias por grupo</h1>
            <p>Porcentaje de asistencias por cada grupo.</p>

            <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                <p>Grupo</p>
                <p>Periodo</p>
                <p>Promedio de asistencias</p>
            </div>
            {data.map((dato, key:number) => (
                <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                    <p>{dato.grupo}</p>
                    <p>{dato.periodo}</p>
                    <p>{dato.promedio_asistencias}</p>
                </div>
            ))}
        </div>
    )
}