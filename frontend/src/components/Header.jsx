import {Link} from 'react-router-dom';
import { GiAstronautHelmet } from "react-icons/gi";

export default function Header() {
  return (
    <nav className="bg-slate-200 ">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
                <GiAstronautHelmet className='text-3xl'/>
            </Link>
            <ul className="flex gap-4">
                <Link to='/'> <li>Home</li> </Link>
                <Link to='/about'> <li>About</li> </Link>
                <Link to='/signup'> <li>Sign In</li> </Link>
            </ul>
        </div>
    </nav>
  )
}
