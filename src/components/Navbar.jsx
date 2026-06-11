
import github from "../assets/github.png"
const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-14 px-4 sm:px-12 md:px-24 lg:px-40 xl:px-60 bg-linear-to-r from-indigo-400 to-cyan-400 text-white font-bold text-xl sm:text-2xl'>
     
      <h1><span>&lt;</span> SecureKey <span>/</span> <span>&gt;</span></h1>
      <a href="https://github.com/profsumedh-byte/Secure-Key"><div className="flex justify-between gap-2.5 items-center" ><span>GitHub</span><span><img className="h-7 w-7" src={github} alt="github_logo" /></span></div></a>
    </div>
  )
}

export default Navbar

