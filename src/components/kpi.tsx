export default function kpi({data}: {data:{ msj:string, kpi:any }}) {
    return (
        <div className=" flex gap-5 items-center rounded-2xl text-xl bg-emerald-700 p-5">
            <h2 className="font-medium">{data.msj}</h2>
            <p>{data.kpi}</p>
        </div>
    )
}