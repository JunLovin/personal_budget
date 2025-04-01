import { useState } from "react"
import { useNavigate } from "react-router"

function CreateEnvelope() {
    const [sobre, setSobre] = useState({
        nombre: "",
        presupuesto: 0
    })
    const navigate = useNavigate()

    const crearPresupuesto = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3000/envelopes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sobre)
            })
            const respuestaJson = await respuesta.json()
            if (await respuestaJson) {
                alert("Se creó")
            }
            console.log("Se creó: ", respuestaJson)
            navigate('/envelopes')
        } catch (err) {
            console.error(err)
        }
    }

    const actualizarSobre = (e) => {
        setSobre(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
        <div className="create-envelope-container w-full min-h-[90dvh] flex flex-col gap-8 items-center mt-8">
            <div className="create-envelope-title">
                <h2 className="font-bold text-4xl">Crear Presupuesto</h2>
            </div>
            <div className="create-envelope-form">
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8 items-center">
                    <div className="create-envelope-form-name flex gap-3">
                        <label htmlFor="name" className="font-bold text-xl">Nombre del presupuesto:</label>
                        <input className="border-neutral-400 outline-0 border-2 px-2 h-10 rounded-xl" value={sobre.nombre} id="name" onChange={actualizarSobre} name="nombre" type="text"></input>
                    </div>
                    <div className="create-envelope-form-presupuesto flex gap-3">
                        <label htmlFor="presupuesto" className="text-xl font-bold">Valor del presupuesto:</label>
                        <input className="border-neutral-400 rounded-xl h-10 border-2 px-2" value={sobre.presupuesto} id="presupuesto" onChange={actualizarSobre} name="presupuesto" type="number"></input>
                    </div>
                    <div className="create-envelope-form-submit">
                        <button className="bg-blue-500 text-white outline-0 hover:bg-white hover:text-blue-500 transition-colors duration-200 border-2 py-2 px-6 rounded-full cursor-pointer" onClick={crearPresupuesto}>Crear Presupuesto</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default CreateEnvelope