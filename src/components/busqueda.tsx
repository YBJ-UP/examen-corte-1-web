'use client'

import { useSearchParams } from "next/navigation";

export default async function busqueda() {
    const parametro = useSearchParams()

    function manejarBusqueda(param:string) {
        console.log(param)
    }

    const busqueda = parametro.get('nombre')
    console.log(busqueda)

    return (
        <div>
            <input type="text" placeholder="Buscar..." onChange={ (e) => { manejarBusqueda(e.target.value) } } />
        </div>
    )
}