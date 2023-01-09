export function Attribute({attribute,value}){
    return <div className="h-[150px] w-fit min-w-[135px] rounded flex flex-col p-4 bg-blue-300">
        <p className="text-5xl flex-[3] flex items-center justify-start font-bold">{Math.floor(value)}</p>
        <p className="text-md flex-1 font-medium">{attribute}</p>
    </div>
}