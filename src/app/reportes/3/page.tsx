import Paginacion from "@/components/paginacion"
import Busqueda from "@/components/busqueda"
import { Suspense } from "react"
import { paginaSchema } from "@/shared/interfaces/pagina"
import { paginarRep3, reporte3Type } from "@/shared/interfaces/reporte_3"

export const dynamic = 'force-dynamic'

export default async function reporte_3 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const searchParams = await props.searchParams
    const paginaUnparsed = searchParams?.page || {page:'1'}
    const paginaParsed = paginaSchema.parse(paginaUnparsed)
    const res = await paginarRep3(paginaParsed)
    if (!res.ok) {
        throw new Error(res.mensaje)
    }
    const { data, pagination } = res
    return (
        <>
            <div className="m-10">
                <Suspense fallback={<p>Búsqueda</p>}>
                    <Busqueda />
                </Suspense>
                <h1 className="text-2xl font-bold">Alumnos preocupantes</h1>
                <p>Alumnos con calificaciones bajas o pocas asistencias.</p>

                <div className="my-5">
                    <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                        <p>Nombre del alumno</p>
                        <p>Correo electrónico</p>
                        <p>Promedio de calificaciones</p>
                        <p>Promedio de asistencias</p>
                    </div>
                    {data.map((dato:reporte3Type, key:number) => (
                        <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                            <p>{dato.nombre}</p>
                            <p>{dato.correo}</p>
                            <p>{dato.promedio_calificaciones}</p>
                            <p>{dato.promedio_asistencias}</p>
                        </div>
                    ))}
                </div>

                <Paginacion paginaActual={pagination.pagina} paginasTotales={pagination.totalPaginas} ruta="/reportes/3"/>
            </div>
        </>
    )
}