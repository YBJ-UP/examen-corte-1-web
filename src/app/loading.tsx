import Image from "next/image"

export default function loading() {
    return (
        <div className="flex flex-col items-center m-10">
            <Image src='/perropensando.jpg' alt="Cargando..." width={250} height={500} className="rounded-2xl" />
            <h1 className="text-2xl font-bold">Cargando...</h1>
        </div>
    )
}