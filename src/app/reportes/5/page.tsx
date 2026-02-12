import Filtrado from "@/components/filtrado"
import { getProgramas, getReporte5, reporte5Type } from "@/shared/interfaces/reporte_5"

export const dynamic = 'force-dynamic'

export default async function reporte_5 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const data:reporte5Type[] = await getReporte5(props)
    const programas = await getProgramas()
    return (
        <div className="m-10">
            <h1 className="text-2xl font-bold">Tablero de estudiantes</h1>
            <p>Ordena a los alumnos según sus calificaciones, los separa por programa educativo.</p>

            <Filtrado programas={programas}/>

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