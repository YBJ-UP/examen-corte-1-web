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
        <div className="flex flex-row justify-center gap-6">
            {
                !primeraPagina && <Link href={`${ruta}?page=${paginaActual-1}`}>Página anterior</Link>
            }
            <p>{paginaActual}</p>
            {
                !ultimaPagina && <Link href={`${ruta}?page=${paginaActual+1}`}>Siguiente página</Link>
            }
        </div>
    )
}