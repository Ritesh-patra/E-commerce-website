import React from 'react'

function Register() {
    const handleSubmit = () => {

  }
  return (
    <div className='border-t'>
      <form onSubmit={ handleSubmit } className='py-6 pt-10 flex flex-col justify-center gap-2 items-center sm:max-w-[480px] w-full mx-auto'>
        <div className='inline-flex items-center gap-2 pt-10 p-6'>
          <h1 className='prata-regular text-3xl'>Sign Up</h1>
          <hr className='w-14 border-none h-[4px] bg-gray-700'/>
        </div>
        <input type="text" className='border border-gray-400 w-full  p-2 h-10 mb-4' placeholder='Full Name'/>
        <input type="email" className='border border-gray-400 w-full  p-2 h-10 mb-4' placeholder='Email'/>
        <input type="text" className='border border-gray-400 w-full  p-2 h-10 mb-2' placeholder='Password'/>
        <button className='px-8 py-2 bg-black text-white'>Sign in</button>
      </form>
    </div>
  )
}

export default Register
