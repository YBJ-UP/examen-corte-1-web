'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default async function busqueda() {
    const parametro = useSearchParams()

    function manejarBusqueda(termino:string) {
        const params = new URLSearchParams(parametro)
        const ruta = usePathname()
        const {replace} = useRouter()

        if (termino) {
            params.set('nombre', termino)
        } else {
            params.delete('nombre')
        }
        console.log(termino)
        replace(`${ruta}?${params.toString()}`)
    }

    const busqueda = parametro.get('nombre')
    console.log(busqueda)

    return (
        <div>
            <input type="text" placeholder="Buscar..." onChange={ (e) => { manejarBusqueda(e.target.value) } } />
        </div>
    )
}