import Construyendo from "@/components/construccion"
import { query } from "@/lib/db"
import { reporte1 } from "@/shared/interfaces/reporte";

export const dynamic = 'force-dynamic';

export default async function reporte_1 () {
    const view = await query('SELECT * FROM vw_rendimiento_curso');
    if (!view.rows) {
        throw new Error('Error al conseguir los datos');
    }
    const reporte:reporte1[] = view.rows;
    console.log(reporte);
    return (
        <div>
            <div className="grid grid-cols-5">
                <p>CURSO</p>
                <p>PERIODO</p>
                <p>PROGRAMA</p>
                <p>PROMEDIO</p>
                <p>REPROBADOS</p>
            </div>
            {reporte.map((rep) => (
                <div key={rep.codigo}>
                    <div>rep.curso</div>
                </div>
            ))}
            <Construyendo />
        </div>
    )
}