import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {vi,en} from "../../lang"
function Login() {
    const [langFlag,setLangFlag ]=useState(()=>{
        let _langFlag = localStorage.getItem("langFlag");
        if(_langFlag==undefined||null){
          return "en";
        }else{
        return _langFlag;
      }
    });
    const [lang,setLang]=useState(en);
    const handleChangeLang=(flag)=>{
      setLangFlag(flag);
      setLang(flag=='en'?en:vi);
      localStorage.setItem("langFlag",flag);
    }
    const history = useHistory();
    const [messageToLogin,setMssageToLogin]= useState(null);
    const [username,setUsername] = useState("admin");
    const [password,setPassword] = useState("123456")
    const handleLogin = (e)=>{
      e.preventDefault();
      if(username=="admin"&&password=="123456"){
        localStorage.setItem("isLogin",true);
        setMssageToLogin(null);
        history.push("/");
      }else{
        localStorage.setItem("isLogin",false);
        setMssageToLogin(null);
        setMssageToLogin(lang.messageToLogin);
      }
    }
    useEffect(()=>{
      setLang(langFlag=='en'?en:vi);
    },[])
    return (
      <div className="box-main">
        <div className="box-login">
            <form onSubmit={(e)=>handleLogin(e)}>
                <div className="box-login-logo">
                    <img src="./images/logo_sistech.jpg"/>
                </div>
                <div className="form-group">
                  <h3 className="text-center">{lang.mainTitle}</h3>
                </div>
                {messageToLogin?<div className="alert alert-danger" role="alert"> {lang.messageToLogin}</div>:<></>}
                <div className="form-group" >
                    <select defaultValue={langFlag} onChange={(e)=>handleChangeLang(e.target.value)} className="form-control">
                      <option value="vi">Vietnamese</option>
                      <option value="en">English</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>{lang.username}</label>
                    <input type={"text"} onChange={(e)=>setUsername(e.target.value)} defaultValue={username} className="form-control" placeholder={lang.username+"..."}/>
                </div>
                <div className="form-group">
                    <label>{lang.password}</label>
                    <input type={"password"} onChange={(e)=>setPassword(e.target.value)} defaultValue={password} className="form-control" placeholder={lang.username+"..."}/>
                </div>
                <div className="form-group">
                    <button type="sumbit" className="btn  btn-primary btn-block">{lang.logIn}</button>
                </div>
            </form>
        </div>
      </div>
    );
  }
  export default Login;