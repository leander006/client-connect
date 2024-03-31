import React from 'react'

function ChatSkeleton() {
  return (
      <div className="flex  items-center rounded-md animate-pulse bg-gray-300 my-1 cursor-pointer space-x-2 p-3">
            <div className=" w-8 h-8 rounded-full bg-gray-400" ></div>
            <h1 className=" capitalize md:text-xl w-1/2 h-4 bg-gray-400"></h1>
      </div>
  )
}

export default ChatSkeleton