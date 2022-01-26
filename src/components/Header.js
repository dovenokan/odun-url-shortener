import {useNavigate} from 'react-router-dom'
////////////////////////////////////////////////////////////////////////////////////////////////////
function Header() {
    const navigate = useNavigate()
////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <img onClick={()=>navigate("/")} className="w-20 mx-auto" src={require("./img/odun.png")} alt="odun" />
            <h1 className="text-3xl font-medium text-gray-500">
              ODUN URL SHORTENER
            </h1>
            <h2 className="text-2xl font-medium text-gray-800">
              <span className="text-gray-400 rounded px-1">SHORTEN.</span>
              <span className="text-gray-400 rounded px-1">VISIT.</span>
              <span className="text-gray-400 rounded px-1">UPDATE.</span>
              <span className="block text-gray-400 text-sm rounded px-1">WE RESPECT YOUR PRIVACY</span>
            </h2>
        </>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////
export default Header
