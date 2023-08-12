import { useState, useEffect } from 'react';
import Select from 'react-select';

function Student() {

    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [course, setCourse] = useState([]);

    const options = courses.map(course => {
        return {value: course.name, label: course.name};
    })

    useEffect(() => {
        getCourses();
    }, []);

    async function getCourses() {
        let courses = await fetch('http://localhost:9000/api/course');
        courses = await courses.json();
        setCourses(courses);
    }

    async function saveStudent(e) {
        e.preventDefault();
        const student = {
            name,
            lastName,
            age,
            course
        }
        const response = await fetch('http://localhost:9000/api/student', {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.status == 200) {
            alert("SE HA AGREGADO CORRECTAMENTE");
        } else {
            alert("HUBO UN ERROR");
        }

        setAge(0);
        setName('');
        setLastName('');
    }

    function handleChange(value){
        setCourse(value);
    }

    return (
        <>
            <div className="md:w-1/2 lg:w-2/5 mx-5">
                <p className="text-center text-2xl font-bold mt-5 mb-2">Añade Estudiantes</p>
                <form className="bg-white rounded-lg py-10 px-5 shadow-sm xl:ml-14 mb-10">
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="name">Nombre del Estudiante</label>
                        <input className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" type="text" id="name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="lastName">Apellidos</label>
                        <input className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" type="text" id="lastName" placeholder="Apellidos" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="email">Edad</label>
                        <input className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" type="text" id="age" placeholder="Edad"
                            value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="course">Curso</label>
                        <Select
                            value={course}
                            onChange={handleChange}
                            isMulti
                            options={options}
                        />
                    </div>

                    <input className="bg-indigo-600 w-full text-white uppercase font-bold p-3 hover:bg-indigo-700 transition-colors cursor-pointer" type="submit" onClick={saveStudent} value="Agregar Estudiante" />
                </form>
            </div>
        </>
    );
}

export default Student;