'use client'

import { useState } from "react"

export default function filtrado ({programas}:{programas:{programa:string}[]}) {
    const [prog, setProg] = useState<string>('')

    function selecProg(input:React.ChangeEvent<HTMLSelectElement>) {
        const select = input.target.value
        setProg(select)
        console.log(prog)
    }

    return (
        <div className="flex gap-5 my-5">
            <div className="flex gap-5 items-center">
                <label htmlFor="programa">Seleccionar programa:</label>
                <select name="programa" id="programa" className="bg-black border-2 rounded-2xl px-5 py-2" onChange={selecProg}>
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