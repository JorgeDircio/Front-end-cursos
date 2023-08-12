import { useState, useEffect } from 'react';

function Course() {

    const [name, setName] = useState('');
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState(false);


    useEffect(() => {
        getTeachers();
    }, []);

    async function addCourse() {
        const course = {
            name,
            teacher,
            day,
            hour,
            duration
        }

        const response = await fetch('http://localhost:9000/api/course', {
            method: 'POST',
            body: JSON.stringify(course),
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

        setName('');
        setHour('');
        setDuration('');
    }

    async function getTeachers() {
        let teachers = await fetch('http://localhost:9000/api/teacher');
        teachers = await teachers.json();
        setTeachers(teachers)
    }

    async function getCourses() {
        let courses = await fetch('http://localhost:9000/api/course');
        courses = await courses.json();
        setCourses(courses)
    }

    async function saveCourse(e) {
        e.preventDefault();
        await getCourses();
        if ([name, day, hour, teacher, duration].includes('')) {
            setError(true);
            return;
        }
        const equalsTeacher = courses.filter(course => course.teacher == teacher).find( course => course.day == day && course.hour == hour);
        
        if(!equalsTeacher){
            addCourse();
        }else{
            alert("Este instructor ya tiene este DIA Y HORA ASIGNADO")
        }
        
        setError(false);
    }

    return (
        <>
            <div className="md:w-1/2 lg:w-2/5 mx-5">
                {
                    teachers.filter(teacher => teacher.age > 30).map(item => item.name)
                }
                <p className="text-center text-2xl font-bold mt-5 mb-2">Añade Cursos</p>
                <form className="bg-white rounded-lg py-10 px-5 shadow-sm xl:ml-14 mb-10">
                    {
                        error &&
                        <div className='bg-red-800 text-white rounded-md text-center uppercase font-bold p-3 mb-3'>
                            <p>Todos los campos son obligatorios</p>
                        </div>
                    }
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="name">Nombre del Curso</label>
                        <input className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" type="text" id="name" placeholder="Nombre"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="teacher">Instructor</label>
                        <select defaultValue={'default'} onChange={e => setTeacher(e.target.value)} className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" name="teacher">
                            <option value="default">Seleccionar un instructor</option>
                            {
                                teachers.map((teacher) => {
                                    return (<option key={teacher._id} value={teacher._id}>{teacher.name} {teacher.lastName}</option>);
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="day">Dia de la semana</label>
                        <select defaultValue={'default'} onChange={e => setDay(e.target.value)} id="day" className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2">
                            <option value="default">Seleccionar un dia de la semana</option>
                            <option value="lunes">Lunes</option>
                            <option value="martes">Martes</option>
                            <option value="miercoles">Miercoles</option>
                            <option value="jueves">Jueves</option>
                            <option value="viernes">Viernes</option>
                            <option value="sabado">Sabado</option>
                            <option value="domingo">Domingo</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="hout">Hora del curso</label>
                        <input className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" type="time" id="hour" placeholder="Hora del curso"
                            value={hour} onChange={(e) => setHour(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block uppercase font-bold text-gray-700" htmlFor="duration">Duración</label>
                        <input className="w-full p-2 mt-2 rounded-md placeholder-gray-400 border-2" type="text" id="duration" placeholder="Duracion del curso"
                            value={duration} onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>

                    <input className="bg-indigo-600 w-full text-white uppercase font-bold p-3 hover:bg-indigo-700 transition-colors cursor-pointer" type="submit" value="Agregar Curso" onClick={saveCourse} />
                </form>
            </div>
        </>
    );
}

export default Course;