'use client'

import { useSearchParams } from "next/navigation";

export default function busqueda() {
    const parametro = useSearchParams()
    const busqueda = parametro.get('nombre')
    console.log(busqueda)

    return (
        <div>
            {busqueda? <p>{busqueda}</p> : <p>No hay búsqueda</p>}
        </div>
    )
}