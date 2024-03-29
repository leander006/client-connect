

interface data{
      name:string,
      type:string,
      onChange:any
}

function Input({name,type,onChange}:data) {
  return (
    <div>
            <label className="mb-2">P{name}</label>
      <input
        className="w-full h-12 mb-4 rounded-md p-3 md:mb-8  border border-black"
        onChange={onChange}
        type={type}
        required
      />
    </div>
  )
}

export default Input