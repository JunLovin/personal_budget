import { useState, useEffect } from 'react'
import { useParams, useOutletContext, useNavigate } from "react-router"

function BudgetDetails() {
    const [modoEditar, setModoEditar] = useState(false)
    const [detalles, setDetalles] = useState(null)
    const [error, setError] = useState(false)
    const [cargando, setCargando] = useState(false)
    const [sobre, setSobre] = useState({
        nombre: '',
        presupuesto: 0
    })
    const { id } = useParams()
    const { handleRecargarDatos } = useOutletContext()
    const navigate = useNavigate()

    const fetchEnvelopeById = async (id) => {
        setCargando(true)
        try {
            const respuesta = await fetch(`http://localhost:3000/envelopes/${id}`, { method: 'GET' })
            if (!respuesta.ok) {
                setError(true)
                setDetalles(null)
                return
            }
            const respuestaJson = await respuesta.json()
            if (!respuestaJson || !respuestaJson.id) {
                setError(true)
                setDetalles(null)
                return
            }
            setDetalles(respuestaJson)
            setError(false)
            console.log(respuestaJson)
        } catch (err) {
            console.error(err)
            setError(true)
            setDetalles(null)
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        fetchEnvelopeById(id || 1)
    }, [id])

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                navigate('/envelopes')
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [error, navigate])

    useEffect(() => {
        if (detalles) {
            setSobre({
                nombre: detalles.nombre,
                presupuesto: detalles.presupuesto
            })
        }
    }, [detalles])

    if (cargando) {
        return (
            <div className="text-4xl font-bold text-center my-10">Cargando detalles...</div>
        )
    }

    if (error || !detalles) {
        return (
            <div className="text-center my-10">
                <div className="text-4xl font-bold text-red-500 mb-4">
                    El presupuesto no existe
                </div>
                <p className="text-xl mb-6">
                    Este presupuesto ha sido eliminado o no existe. Serás redirigido a la página principal.
                </p>
            </div>
        )
    }

    const handleModoEditar = () => {
        setModoEditar(!modoEditar)
    }

    const handleEditarInput = (e) => {
        setSobre(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const actualizarInfo = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3000/envelopes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sobre)
            })
            if (!respuesta.ok) {
                throw new Error("Ocurrió un error")
            }
            handleRecargarDatos()
            const respuestaJson = await respuesta.json()
            console.log("Poyaaaa!: ", respuestaJson)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
        <h2 className="text-center text-4xl font-bold">{detalles.nombre}</h2>
        <table className="w-2xl bg-white">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Nombre</th>
                        <th className="py-3 px-6 text-left">Presupuesto</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-100">
                            <td className="py-4 px-6">{detalles.id}</td>
                            <td className="py-4 px-6">{detalles.nombre}</td>
                            <td className="py-4 px-6">${detalles.presupuesto}</td>
                        </tr>
                </tbody>
        </table>
        <button className="border-2 border-blue-500 px-6 py-3 hover:bg-blue-500 transition-colors duration-200 rounded-full hover:text-white hover:border-white cursor-pointer active:bg-blue-600" onClick={handleModoEditar}>Editar Presupuesto</button>
        {modoEditar && (
            <>
            <div className="form-container flex flex-col items-center w-[30rem] gap-8 mb-12">
                <div className="nombre flex gap-2 justify-around w-full items-center">
                    <label htmlFor="name" className="font-bold text-xl">Nombre del presupuesto:</label>
                    <input className="border-neutral-400 outline-0 border-2 px-2 h-10 rounded-xl" id="name" name="nombre" value={sobre.nombre} onChange={handleEditarInput}></input>
                </div>
                <div className="presupuesto flex gap-2 justify-around w-full items-center">
                    <label htmlFor="presupuesto" className="text-xl font-bold">Valor del presupuesto:</label>
                    <input className="border-neutral-400 rounded-xl h-10 border-2 px-2" id="presupuesto" name="presupuesto" value={sobre.presupuesto} onChange={handleEditarInput}></input>
                </div>
                <div className="submit">
                    <button className="bg-blue-500 text-white outline-0 hover:bg-white hover:text-blue-500 transition-colors duration-200 border-2 py-2 px-6 rounded-full cursor-pointer" onClick={() => {
                        actualizarInfo()
                        setModoEditar(false)
                        }}>Submit</button>
                </div>
            </div>
            </>
        )}
        </>
    )
}

export default BudgetDetails