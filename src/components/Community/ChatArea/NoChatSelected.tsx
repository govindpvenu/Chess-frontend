import { MessagesSquare  } from "lucide-react"

export const NoChatSelected = () => {

    return (
      <div className='flex items-center justify-center w-full h-full'>
        <div className='px-4 text-center sm: text-lg md:text-xl text-gray-200 font-semibold flex flex-col
        items-center gap-2'>
          <p>Select a chat to start messaging</p>
          <MessagesSquare  className='text-3x1 md:text-6x1 text-center' />
        </div>
      </div>
    );
  };