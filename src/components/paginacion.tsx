import Link from "next/link"

interface paginaInterfaz {
    paginaActual: number,
    paginasTotales: number,
    ruta: string
}

export default async function paginacion({ paginaActual, paginasTotales, ruta }:paginaInterfaz) {
    const primeraPagina: boolean = paginaActual == 1
    const ultimaPagina: boolean = paginaActual == paginasTotales
    console.log(paginaActual, paginasTotales, ruta, primeraPagina, ultimaPagina)
    return (
        <div className="flex flex-row justify-center">
            {
                !primeraPagina && <div>
                    <p>Se puede retroceder</p>
                </div>
            }
            <p>{paginaActual}</p>
            {
                !ultimaPagina && <Link href={`${ruta}?page=${paginaActual+1}`}>ncdsnalas</Link>
            }
        </div>
    )
}