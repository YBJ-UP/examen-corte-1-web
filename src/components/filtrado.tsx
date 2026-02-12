'use client'

export default function filtrado ({programas}:{programas:{programa:string}[]}) {
    return (
        <div className="flex gap-5 my-5 items-center">
            <label htmlFor="programa">Seleccionar programa:</label>
            <select name="programa" id="programa" className="bg-black border-2 rounded-2xl px-5 py-2">
                <option value="">-</option>
                {programas.map((programa, key:number) => (
                    <option key={key} value={programa.programa}>{programa.programa}</option>
                ))}
            </select>
        </div>
    )
}