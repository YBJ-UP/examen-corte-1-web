import Image from "next/image";

export default function construyendo() {
    return (
        <div className="flex flex-col items-center m-10">
            <Image
                src="/chambeador.jpg"
                alt="En construcción..."
                width={500}
                height={500}
            />
            <p>Página en construcción...</p>
        </div>
    );
}