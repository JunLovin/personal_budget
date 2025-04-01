import { useState, useEffect } from 'react'

function Transfer() {
    const [sobreDe, setSobreDe] = useState(1)
    const [sobrePara, setSobrePara] = useState(1)
    const [cantidad, setCantidad] = useState(0)
    const [sobresData, setSobresData] = useState(null)

    const envelopesFetch = async (url) => {
        try {
            const respuesta = await fetch(url, { method: 'GET'  } )
            const respuestaJson = await respuesta.json()
            setSobresData(respuestaJson)
            console.log(respuestaJson)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        envelopesFetch("http://localhost:3000/envelopes")
    }, [])

    const transferirDinero = async (de, para) => {
        try {
            const respuesta = await fetch(`http://localhost:3000/envelopes/transferir/${de}/${para}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cantidad: Number(cantidad)
                })
            })
            if (!respuesta.ok) {
                throw new Error('Error al transferir dinero')
            }
            const respuestaJson = await respuesta.json()
            console.log(`Transferencia exitosa: ${respuestaJson}`)
            envelopesFetch("http://localhost:3000/envelopes")
            alert("Transferencia realizada con éxito")
        } catch (err) {
            console.error(err)
            alert("Error al realizar la transferencia: " + err.message)
        }
    }

    const cambiarCantidad = (e) => {
        setCantidad(e.target.value)
    }

    const cambiarSobreDe = (e) => {
        setSobreDe(Number(e.target.value))
        console.log("Sobre de:", sobreDe)
    }

    const cambiarSobrePara = (e) => {
        setSobrePara(Number(e.target.value)) 
    }

    useEffect(() => {
        console.log("Sobre de:", sobreDe)
        console.log("Sobre para:", sobrePara)
        console.log("Cantidad:", cantidad)
    }, [sobreDe, sobrePara])

    return (
        <>
        <div className="transfer-container min-h-[90dvh] mt-8 flex flex-col items-center gap-8">
            <div className="transfer-title">
                <h2 className="font-bold text-4xl">Tranferir dinero entre presupuestos</h2>
            </div>
            <div className="transfer-envelopes-container">
                <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-12 items-center">
                    <div className="de-envelope flex gap-2">
                        <label htmlFor="de-envelope" className="font-bold text-xl">De:</label>
                        <select id="de-envelope" name="de-envelope" onChange={cambiarSobreDe} className="text-center">
                            {sobresData && sobresData.map((sobre) => {
                                return (
                                    <option key={sobre.id} value={sobre.id}>{sobre.nombre}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="para-envelope flex gap-2">
                    <label htmlFor="para-envelope" className="font-bold text-xl">Para:</label>
                        <select id="para-envelope" name="para-envelope" onChange={cambiarSobrePara} className="text-center">
                            {sobresData && sobresData.map((sobre) => {
                                return (
                                    <option key={sobre.id} value={sobre.id}>{sobre.nombre}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="transfer-amount flex gap-2">
                        <label htmlFor="transfer-amount" className="font-bold text-xl">Cantidad:</label>
                        <input type="number" id="transfer-amount" name="transfer-amount" className="border-neutral-300 border-2 outline-0 px-2 py-1" value={cantidad} onChange={cambiarCantidad} />
                    </div>
                    <div className="transfer-submit">
                        <button type="submit" className="bg-blue-500 text-white outline-0 hover:bg-white hover:text-blue-500 transition-colors duration-200 border-2 py-2 px-6 rounded-full cursor-pointer" onClick={() => {
                            transferirDinero(sobreDe, sobrePara)
                        }}>Transferir</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Transfer