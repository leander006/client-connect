import React from 'react'

function EmailSkeleton() {
  return (
      <div className="flex justify-center animate-pulse items-center h-full">
      <div className="flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
          <div className="flex flex-col w-full p-5">
                  <div className='w-full h-6 bg-gray-400'></div>
                  <div className=" bg-gray-400 text-white items-center flex p-2 rounded-lg hover:bg-secondary my-2">
                        <button type="button" className="w-full h-9"></button>
                  </div>
          </div>
      </div>
</div>
  )
}

export default EmailSkeleton