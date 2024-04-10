

interface data{
      name:string,
      type:string,
      onChange:any
      value?:string
      needed?:boolean
}

function Input({name,type,onChange,value,needed}:data) {
  return (
    <div className="text-primary mb-3 space-y-2">
            <label className="mb-2 capitalize">{name}</label>
            <input
              className="w-full h-12 mb-4 focus:outline-none rounded-md p-3 md:mb-8  border border-black"
              onChange={onChange}
              type={type}
              value={value}
            />
    </div>
  )
}

export default Input