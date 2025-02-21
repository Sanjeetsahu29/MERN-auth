import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({})
  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');
  const navigate = useNavigate();
  function handleChange(e){
    setFormData({...formData, [e.target.id] : e.target.value})
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    // setError(false);
    try{
      setLoading(true);
      const response = await fetch('api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData),
      })
      console.log(response);
      
      const data = await response.json();
      console.log(data)
      setLoading(false);
      // setMessage(data.message);
      if(data.success === false){
        // setError(true);
        return;
      }
      navigate('/signin');
    }catch(error){
      setLoading(false);
      // setError(true);
      console.log(error);
    }
}
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" 
          placeholder="Username" 
          id='username' 
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <input type="email" 
          placeholder="email" 
          id='email' 
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input type="password" 
          placeholder="password" 
          id='password' 
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg uppercase text-white tracking-[1.8px] hover:backdrop-opacity-95 cursor-pointer disabled:opacity-80">
          {loading ? 'Loading...': 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-3 mt-3'>
        <p>Have an account?</p>
        <Link to='/signin'><span className="text-blue-500">Sign in</span></Link>
      </div>
      {/* <p className={`mt-2 text-[13px] ${message.includes('success') ?  'text-green-500':'text-red-700'  }` }>{message}</p> */}
    </div>
  )
}
