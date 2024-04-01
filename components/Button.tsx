interface input{
      name:String,
      type: "button" | "submit" | "reset",
}

function Button({type,name}:input) {
  return (
      <div className=" bg-primary text-white items-center flex p-2 rounded-lg hover:bg-secondary my-2">
            <button type={type} className="w-full" >
              {name}
            </button>
      </div>
  )
}

export default Button