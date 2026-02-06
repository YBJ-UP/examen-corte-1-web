import { paginarRep2 } from "@/shared/interfaces/reporte_2"

export const dynamic='force-dynamic'

export default async function reporte_2 () {
    const view = await paginarRep2()
    if (!view.ok) {
        throw new Error('Error al conseguir los reportes')
    }
    const reporte = await view.json()
    console.log(reporte.data)
    return (
        <div>
            <h1 className="text-2xl font-bold">Carga del maestro</h1>
            <p>Cuántos grupos y alumnos están bajo la tutela de cada profesor.</p>
        </div>
    )
}