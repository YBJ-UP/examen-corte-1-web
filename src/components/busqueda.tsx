'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function busqueda() {
    const parametro = useSearchParams()
    const params = new URLSearchParams(parametro)
    const ruta = usePathname()
    const {replace} = useRouter()

    function manejarBusqueda(termino:string) {
        console.log(termino)

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
            <input type="text" placeholder="Buscar..." 
                onChange={ (e) => { manejarBusqueda(e.target.value) } }
                defaultValue={parametro.get('query')?.toString()}
            />
        </div>
    )
}