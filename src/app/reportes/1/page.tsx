import { getReporte1, reporte1 } from "@/shared/interfaces/reporte_1";

export const dynamic = 'force-dynamic';

export default async function reporte_1 () {
    const reporte:reporte1[] = await getReporte1()
    return (
        <div className="flex flex-col m-10">
            <h1 className="text-2xl font-bold">Rendimiento del curso</h1>
            <p>Promedio general del curso y número de reprobados.</p>

            <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                <p>CURSO</p>
                <p>PERIODO</p>
                <p>PROGRAMA</p>
                <p>PROMEDIO</p>
                <p>REPROBADOS</p>
            </div>
            {reporte.map((rep) => (
                <div key={rep.codigo} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                    <p>{rep.curso}</p>
                    <p>{rep.periodo}</p>
                    <p>{rep.programa}</p>
                    <p>{rep.promedio}</p>
                    <p>{rep.reprobados}</p>
                </div>
            ))}
        </div>
    )
}