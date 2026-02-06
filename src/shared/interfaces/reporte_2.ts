import { query } from "@/lib/db"
import z from "zod"

const reporte2Schema = z.object({
    nombre: z.string().min(1).max(100),
    periodo: z.number().min(1).max(15),
    grupos: z.number().min(1),
    alumnos: z.number().min(0),
    promedio: z.number().min(0).max(100)
})

type reporte2 = z.infer<typeof reporte2Schema>

export async function paginarRep2 () {
    const pagina = 1
    const view = query('SELECT * FROM vw_carga_maestro LIMIT $1 OFFSET $2', [10, (pagina-1)*10])
    return view
}