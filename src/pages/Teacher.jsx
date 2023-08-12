import { useState, useEffect } from 'react';

function Teacher() {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        getTeachers();
    }, []);

    async function saveTeacher(e){
        e.preventDefault();
        const teacher = {
            name,
            lastName,
            age
        }
        const response = await fetch('http://localhost:9000/api/teacher',{
            method: 'POST',
            body: JSON.stringify(teacher),
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if(response.status == 200){
            alert("SE HA AGREGADO CORRECTAMENTE");
        }else{
            alert("HUBO UN ERROR");
        }

        setAge(0);
        setName('');
        setLastName('');
    }

    async function getTeachers() {
        let teachers = await fetch('http://localhost:9000/api/teacher');
        teachers = await teachers.json();
        setTeachers(teachers)
    }

    return (
        <>
            <div className="w-screen md:w-2/2 lg:w-2/5 mx-5">
            <p className="text-center text-2xl font-bold mt-5 mb-2">Añade Instructores</p>
                <form className="bg-white rounded-lg py-10 px-5 shadow-sm xl:ml-14 mb-10">
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="name">Nombre del Instructor</label>
                        <input className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" type="text" id="name" placeholder="Nombre"
                            value={name} onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="lastName">Apellidos</label>
                        <input className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" type="text" id="lastName" placeholder="Apellidos" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="age">Edad</label>
                        <input className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" type="text" id="age" placeholder="Edad del instructor"
                        value={age} onChange={(e)=> setAge(e.target.value)}
                        />
                    </div>
                    
                    <input className="bg-indigo-600 w-full text-white uppercase font-bold p-3 hover:bg-indigo-700 transition-colors cursor-pointer" type="submit" onClick={saveTeacher} value="Agregar Instructor" />
                </form>
            </div>
        </>
    );
}

export default Teacher;