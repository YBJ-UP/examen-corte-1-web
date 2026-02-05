import Link from "next/link";
import reporte from "@/shared/interfaces/reporte";

export default function Carta({ reporte }: { reporte:reporte }) {
    return (
        <Link href={`/reportes/${reporte.numero}`} className="bg-amber-600 flex flex-col gap-2.5 p-5 rounded-2xl hover:bg-amber-500">
            <h2 className="text-xl">Título: {reporte.titulo}</h2>
            <p>{reporte.descripcion}</p>
        </Link>
    )
}