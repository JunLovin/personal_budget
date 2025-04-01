import { useNavigate, Outlet } from "react-router";

function Header() {
    const navigate = useNavigate()

    const handleUrl = (url) => {
        navigate(url)
    }

    return (
        <>
        <span className="absolute right-4 bottom-4">Con ♥️ y ☕ por <a href="https://github.com/Junlovin" className="hover:underline underline-offset-2">JunLovin</a></span>
        <header className="w-full h-20 flex justify-between items-center bg-blue-500 text-white px-8">
            <div className="header-left">
                <h1 className=" font-bold text-4xl cursor-pointer" onClick={() => handleUrl('/')}>Presupuesto Personal</h1>
            </div>
            <div className="header-right text-xl font-semibold">
                <ul className="flex gap-12">
                    <li className="relative cursor-pointer" onClick={() => handleUrl('/transfer')}>Transferir</li>
                    <li className="relative cursor-pointer" onClick={() => handleUrl('/envelopes/create')}>Crear Presupuesto</li>
                    <li className="relative cursor-pointer" onClick={() => handleUrl('/envelopes')}>Presupuestos</li>
                </ul>
            </div>
        </header>

        <div className="outlet-container flex justify-center items-center min-h-[90dvh] w-full flex-col gap-12">
            <Outlet />
        </div>
        </>
    )
}

export default Header;