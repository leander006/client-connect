

interface data{
      name:string,
      type:string,
      onChange:any
}

function Input({name,type,onChange}:data) {

  return (
    <div className="text-primary space-y-2">
            <label className="mb-2 capitalize">{name}</label>
            <input
              className="w-full h-12 mb-4 focus:outline-none rounded-md p-3 md:mb-8  border border-black"
              onChange={onChange}
              type={type}
              required
            />
    </div>
  )
}

export default Input