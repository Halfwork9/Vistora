import React from 'react'

const Loading = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center mt-40">
  <div className="w-20 h-20 border-4 border-transparent text-[#6A1B9A] text-4xl animate-spin flex items-center justify-center border-t-[#6A1B9A] rounded-full">
    <div className="w-16 h-16 border-4 border-transparent text-[#CE93D8] text-4xl animate-spin flex items-center justify-center border-t-[#CE93D8] rounded-full"></div>
  </div>
</div>

  )
}

export default Loading;