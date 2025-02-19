import {Link} from 'react-router-dom';
export default function Signup() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id='username' className="bg-slate-100 p-3 rounded-lg"/>
        <input type="email" placeholder="email" id='email' className="bg-slate-100 p-3 rounded-lg"/>
        <input type="password" placeholder="password" id='password' className="bg-slate-100 p-3 rounded-lg"/>
        <button className="bg-slate-700 p-3 rounded-lg uppercase text-white tracking-[1.8px] hover:backdrop-opacity-95">Sign up</button>
      </form>
      <div className='flex gap-3 mt-3'>
        <p>Have an account?</p>
        <Link to='/signin'><span className="text-blue-500">Sign in</span></Link>
      </div>
    </div>
  )
}
