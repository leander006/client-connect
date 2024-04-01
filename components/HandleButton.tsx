

      interface inputType{
            name:String,
            onClick:any
      }
      

function HandleButton({name,onClick}:inputType) {

        return (
            <div className=" bg-primary text-white items-center flex p-2 rounded-lg hover:bg-secondary my-2">
                  <button onClick={onClick} type="button" className="w-full" >
                    {name}
                  </button>
            </div>
        )
}

export default HandleButton