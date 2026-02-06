import Construyendo from "@/components/construccion"
import { query } from "@/lib/db"
import { reporte5Type } from "@/shared/interfaces/reporte_5"

export const dynamic = 'force-dynamic'

export default async function reporte_5 () {
    const res = await query('SELECT * FROM vw_tablero_estudiantes;')
    if (!res.rows){ throw new Error('Error al conseguir los datos') }
    const data:reporte5Type[] = res.rows
    return (
        <div className="m-10">
            <h1 className="text-2xl font-bold">Tablero de estudiantes</h1>
            <p>Ordena a los alumnos según sus calificaciones, los separa por programa educativo.</p>

            <div>
                <p>Esto era el cuadro de busqueda</p>
            </div>

            <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                <p>Estudiante</p>
                <p>Programa</p>
                <p>Periodo</p>
                <p>Promedio</p>
                <p>Lugar</p>
            </div>
            {data.map((dato, key:number) => (
                <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                    <p>{dato.estudiante}</p>
                    <p>{dato.programa}</p>
                    <p>{dato.periodo}</p>
                    <p>{dato.promedio}</p>
                    <p>{dato.lugar}</p>
                </div>
            ))}
        </div>
    )
}