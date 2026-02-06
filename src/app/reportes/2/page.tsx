import { paginarRep2, reporte2 } from "@/shared/interfaces/reporte_2"
import { paginaSchema } from "@/shared/interfaces/pagina"
import Paginacion from "@/components/paginacion"

export const dynamic='force-dynamic'

export default async function reporte_2 ({ searchParams }: { searchParams:{[key:string]: string} }) {
    const paginaUnparsed = await searchParams
    const paginaParsed = paginaSchema.parse(paginaUnparsed)
    const res = await paginarRep2(paginaParsed)
    if (!res.ok) {
        throw new Error(res.mensaje)
    }
    const { data, pagination } = res
    return (
        <div className="m-10">
            <h1 className="text-2xl font-bold">Carga del maestro</h1>
            <p>Cuántos grupos y alumnos están bajo la tutela de cada profesor.</p>

            <div>
                <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                    <p>Maestro</p>
                    <p>Periodo</p>
                    <p>Grupos</p>
                    <p>Alumnos</p>
                    <p>Promedio</p>
                </div>
                {data.map((dato:reporte2, key:number) => (
                    <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                        <p>{dato.maestro}</p>
                        <p>{dato.periodo}</p>
                        <p>{dato.grupos}</p>
                        <p>{dato.alumnos}</p>
                        <p>{dato.promedio}</p>
                    </div>
                ))}
            </div>

            <Paginacion paginaActual={pagination.pagina} paginasTotales={pagination.totalPaginas} ruta="/reportes/2"/>
        </div>
    )
}