import { Link} from 'react-router-dom'
function Header(){
    const handleLogin = ()=>{ localStorage.clear();}
    return(
        <div className="header">
            <div className="header-left">
                    <img className="login-logo" src="./images/logo_sistech.jpg" alt="Sistech logo"/>
            </div>
            <div className="header-center">
                <h1 className="header-title"><Link to="/">Water treatment monitoring program</Link></h1>
            </div>
            <div className="header-right">
                <h6 className="logout-text"> 
                    <Link onClick={()=>handleLogin()} to="/login"> <img src='https://iconarchive.com/download/i86056/graphicloads/100-flat-2/inside-logout.ico'/> Đăng xuất</Link>
                    <br/>
                    <a className="lang-text" href="">Viêt nam</a> , <a className="lang-text" href="">Tiếng anh</a>
                </h6>
            </div>
        </div>
    )
}
export default Header