import  React, { useRef } from 'react'
import { v4 as uuidV4 } from 'uuid'

interface ILogin {
  onIdSubmit: Function,
}

export default function Login({
  onIdSubmit
}:ILogin){
  const idRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event){
    event.preventDefault();

    onIdSubmit(idRef.current!.value)
    console.log('lmao');
  }

  function createNewId() {
    onIdSubmit(uuidV4())
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <form className='w-1/2' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 mb-3'>
          <label className='text-white font-bold'>Enter your id</label>
          <input 
            type="text" 
            placeholder="Type you id" 
            ref={idRef} 
            required 
            className='px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-zinc-900 placeholder:text-zinc-500 text-white'
            />
        </div>
        <div className='w-full flex gap-2'>
          <button 
            type='submit'
            className='w-full flex justify-center items-center px-3 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-400'
          >
            Login
          </button>
          <button 
            className='w-full flex justify-center items-center px-3 py-2 rounded-lg bg-violet-800 text-white hover:bg-violet-400'
            onClick={createNewId}
          >
            Create a new id
          </button>
        </div>
      </form>
    </div>
  )
}