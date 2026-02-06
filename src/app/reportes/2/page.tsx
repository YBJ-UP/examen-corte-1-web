import { paginarRep2 } from "@/shared/interfaces/reporte_2"
import { paginaSchema } from "@/shared/interfaces/pagina"
import Paginacion from "@/components/paginacion"

export const dynamic='force-dynamic'

export default async function reporte_2 ({ searchParams }: { searchParams:number }) {
    const paginaUnparsed = await searchParams
    const paginaParsed = paginaSchema.parse(paginaUnparsed)
    const res = await paginarRep2(paginaParsed)
    if (!res.ok) {
        throw new Error('Error al conseguir los reportes')
    }
    const { data, pagination } = await res.json()
    console.log(data)
    return (
        <div>
            <h1 className="text-2xl font-bold">Carga del maestro</h1>
            <p>Cuántos grupos y alumnos están bajo la tutela de cada profesor.</p>

            <div>
                {data.map((dato:any) => (
                    <div key={dato.maestro}>
                        <p>{dato.maestro}</p>
                    </div>
                ))}
            </div>

            <Paginacion paginaActual={pagination.pagina} paginasTotales={pagination.totalPaginas} ruta="/reportes/2"/>
        </div>
    )
}