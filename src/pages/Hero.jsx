function Hero() {
    return (
        <>
        <div className="presentation absolute left-[50%] top-[50%] translate-[-50%] font-normal flex flex-col gap-1 items-center text-center">
            <h2 className="font-extrabold text-4xl leading-normal mb-3">¡Bienvenido a mi proyecto "Personal Budget"!</h2>
            <p>Este proyecto es una aplicación web que te permite llevar un registro de tus gastos y presupuestos personales. Puedes crear presupuestos, agregar gastos y ver un resumen de tus ingresos y gastos.</p>
            <p>¡Comienza a utilizar la aplicación ahora mismo y lleva un control preciso de tus finanzas!</p>
            <p>El proyecto es de <a href="https://codecademy.com" target="_blank" className="hover:underline font-semibold underline-offset-2">CodeCademy</a>, si gustas date una vuelta y revisa todas las especificaciones para que puedas ver de qué es capaz el proyecto.</p>
            <div className="button mt-4">
                <button className="bg-blue-500 hover:bg-white border-white border-2 hover:border-blue-500 transition-colors duration-200 text-white hover:text-black px-12 py-2 h-[60px] text-xl rounded-full cursor-pointer active:bg-neutral-50" onClick={() => {
                    window.open("https://github.com/Junlovin/personal_budget", "_blank")
                }}>Repositorio en GitHub</button>
            </div>
        </div> 
        </>
    )
}

export default Hero