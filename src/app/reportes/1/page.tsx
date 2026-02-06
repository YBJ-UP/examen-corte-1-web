import Construyendo from "@/components/construccion"
import { query } from "@/lib/db"
import { reporte1 } from "@/shared/interfaces/reporte_1";

export const dynamic = 'force-dynamic';

export default async function reporte_1 () {
    const view = await query('SELECT * FROM vw_rendimiento_curso');
    if (!view.rows) {
        throw new Error('Error al conseguir los datos');
    }
    const reporte:reporte1[] = view.rows;
    return (
        <div className="flex flex-col m-10">
            <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                <p>CURSO</p>
                <p>PERIODO</p>
                <p>PROGRAMA</p>
                <p>PROMEDIO</p>
                <p>REPROBADOS</p>
            </div>
            {reporte.map((rep) => (
                <div key={rep.codigo} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                    <div>{rep.curso}</div>
                    <div>{rep.periodo}</div>
                    <div>{rep.programa}</div>
                    <div>{rep.promedio}</div>
                    <div>{rep.reprobados}</div>
                </div>
            ))}
            <Construyendo />
        </div>
    )
}