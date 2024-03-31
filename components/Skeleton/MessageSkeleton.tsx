import React from 'react'

function MessageSkeleton() {
  return (
      <div className={`capitalize animate-pulse p-1 space-y-1 w-1/2 flex flex-col md:text-xl m-2 my-6`}>
      <div className="flex items-center space-x-2 w-full">
            <div className="w-9 h-9 rounded-full bg-gray-500 " ></div>
            <h1 className='w-full h-6 bg-gray-500'></h1>
      </div>
      <div className='w-full h-6 bg-gray-500'></div>
</div>
  )
}

export default MessageSkeleton