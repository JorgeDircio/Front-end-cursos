import { NavLink } from "react-router-dom";

export default function NavBar() {


    function button() {
        const menu = document.querySelector('#menu');
        menu.classList.toggle('hidden')
    }

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">Cursos Online</span>
                </div>
                <div className="block lg:hidden">
                    <button onClick={() => button()} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div id='menu' className="w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden">
                    <div className="text-sm lg:flex-grow">
                        <NavLink to='/' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Cronograma
                        </NavLink>
                        <NavLink to='/student' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Estudiantes
                        </NavLink>
                        <NavLink to='/teacher' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Instructores
                        </NavLink>
                        <NavLink to='/course' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Cursos
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}
