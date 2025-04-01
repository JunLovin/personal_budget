import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

function Budget() {
    const [data, setData] = useState(null)
    const [recargarDatos, setRecargarDatos] = useState(0)
    const navigate = useNavigate()

    const dataFetched = async (url) => {
        try {
            const respuesta = await fetch(url, { method: 'GET'  } )
            const respuestaJson = await respuesta.json()
            setData(respuestaJson)
            console.log(respuestaJson)
        } catch (err) {
            console.error(err)
        }
    }
    
    useEffect(() => {
        dataFetched("http://localhost:3000/envelopes")
    }, [recargarDatos])
    
    const eliminarSobre = async (id) => {
        try {
            const respuesta = await fetch(`http://localhost:3000/envelopes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (respuesta.ok) {
                if (respuesta.status === 204) {
                    setData(prev => prev.filter(element => element.id !== id))
                    console.log("Sobre eliminado")
                    navigate(0)
                } else {
                    const respuestaJson = await respuesta.json()
                    setData(respuestaJson)
                    console.log("Se eliminó: ", respuestaJson)
                } 
            } else {
                console.log("Error al eliminar el presupuesto")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleRecargarDatos = () => {
        setRecargarDatos(prev => prev + 1)
    }

    const handleUrl = (url) => {
        navigate(url)
    }

    if (data === null) {
        return (
            <div className=" text-6xl font-extrabold absolute top-[50%] left-[50%] translate-[-50%]">Cargando...</div>
        )
    }
    
    return (
        <>
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Presupuesto Personal</h1>
            
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Presupuesto</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((element) => (
                            <tr key={element.id} className="hover:bg-gray-100">
                                <td className="py-4 px-6">{element.id}</td>
                                <td className="py-4 px-6">{element.nombre}</td>
                                <td className="py-4 px-6">${element.presupuesto}</td>
                                <td className="py-4 px-6">
                                    <button className="bg-blue-500 rounded-xl text-white cursor-pointer hover:bg-blue-400 active:bg-blue-500 transition-colors duration-200 px-3 py-2" onClick={() => handleUrl(`/envelopes/${element.id}`)}>Detalles</button>
                                    </td>
                                <td className="py-4 px-6">
                                    <button className="bg-red-500 rounded-xl text-white cursor-pointer hover:bg-red-400 active:bg-red-500 transition-colors duration-200 px-3 py-2" onClick={() => {
                                        eliminarSobre(element.id)
                                    }}>Eliminar Presupuesto</button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <Outlet context={{ handleRecargarDatos }}/>
        </>
    )
}

export default Budget