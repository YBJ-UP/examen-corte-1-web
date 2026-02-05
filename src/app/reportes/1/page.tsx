import Construyendo from "@/components/construccion"
import { query } from "@/lib/db"

export const dynamic = 'force-dynamic';

export default async function reporte1 () {
    const view = await query('SELECT * FROM vw_rendimiento_curso');
    if (!view.rows) {
        throw new Error('jjjjjjj');
    }
    const reporte = view.rows;
    console.log(reporte);
    return (
        <div>
            <Construyendo />
        </div>
    )
}