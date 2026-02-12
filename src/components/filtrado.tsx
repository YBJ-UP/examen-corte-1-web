'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function filtrado ({programas}:{programas:{programa:string}[]}) {
    const parametros = useSearchParams()
    const params = new URLSearchParams(parametros)
    const ruta = usePathname()
    const { replace } = useRouter()

    function manejarPrograma(input:string) {
        if (input){
            params.set("programa", input)
        } else {
            params.delete('programa')
        }

        replace(`${ruta}?${params.toString()}`)
    }

    function manejarPeriodo(input:string) {
        if (input) {
            params.set('periodo', input)
        }
    }

    return (
        <div className="flex gap-5 my-5">
            <div className="flex gap-5 items-center">
                <label htmlFor="programa">Seleccionar programa:</label>
                <select name="programa" id="programa" className="bg-black border-2 rounded-2xl px-5 py-2" onChange={(e) => {manejarPrograma(e.target.value.trim())}}>
                    <option value="">-</option>
                    {programas.map((programa, key:number) => (
                        <option key={key} value={programa.programa}>{programa.programa}</option>
                    ))}
                </select>
            </div>
            <div className="flex gap-5 items-center">
                <label htmlFor="periodo">Seleccionar periodo:</label>
                <input type="number" name="periodo" id="periodo" placeholder="0" className="bg-black border-2 rounded-2xl px-5 py-2"/>
            </div>
        </div>
    )
}