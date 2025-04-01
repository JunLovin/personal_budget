const todosLosSobres = [
    {
        id: 1,
        nombre: "Comida",
        presupuesto: 500
    },
    {
        id: 2,
        nombre: "Transporte",
        presupuesto: 200
    },
    {
        id: 3,
        nombre: "Entretenimiento",
        presupuesto: 150
    },
    {
        id: 4,
        nombre: "Servicios",
        presupuesto: 300
    },
    {
        id: 5,
        nombre: "Ahorros",
        presupuesto: 400
    }
]

const encontrarPorId = (id) => {
    const sobreIndex = todosLosSobres.findIndex(sobre => sobre.id === id)
    if (sobreIndex === -1) {
        const error = new Error("No se encontró el sobre")
        error.status = 404
        throw error
    } else {
        return todosLosSobres[sobreIndex]
    }
}

const crearSobre = (nombre, presupuesto) => {
    if (!nombre || !presupuesto) {
        const error = new Error("Faltan datos")
        error.status = 400
        throw error
    }
    const nuevoSobre = {
        id: todosLosSobres.length + 1,
        nombre: nombre,
        presupuesto: presupuesto
    }
    todosLosSobres.push(nuevoSobre)
    return nuevoSobre
}

const actualizarSobre = (id, nuevosDatos) => {
    let sobre = encontrarPorId(id)
    if (!nuevosDatos.nombre || !nuevosDatos.presupuesto) {
        const error = new Error("Faltan datos")
        error.status = 400
        throw error
    }
    sobre.nombre = nuevosDatos.nombre
    sobre.presupuesto = nuevosDatos.presupuesto
    return sobre
}

const eliminarSobre = (id) => {
    let sobre = encontrarPorId(id)
    const sobreIndex = todosLosSobres.indexOf(sobre)
    todosLosSobres.splice(sobreIndex, 1)
    return sobre
}

const enviarDinero = (desde, para, cantidad) => {
    cantidad = Number(cantidad)

    if (!cantidad || cantidad <= 0) {
        const error = new Error("Cantidad inválida")
        error.status = 400
        throw error
    }

    let sobreDesde = encontrarPorId(desde)
    let sobrePara = encontrarPorId(para)

    if (sobreDesde.presupuesto < cantidad) {
        const error = new Error("No hay suficiente dinero")
        error.status = 400
        throw error 
    }

    sobreDesde.presupuesto -= cantidad
    sobrePara.presupuesto += cantidad

    return {
        status: "Transferencia realizada con éxito",
        desde: sobreDesde,
        para: sobrePara
    }
}

export { encontrarPorId, todosLosSobres, crearSobre, actualizarSobre, eliminarSobre, enviarDinero }