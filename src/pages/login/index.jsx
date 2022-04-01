import { useState } from "react";
import { useHistory } from "react-router-dom";
function Login() {
    const history = useHistory();
    const [username,setUsername] = useState("admin");
    const [password,setPassword] = useState("123456")
    const handleLogin = (e)=>{
      e.preventDefault();
      console.log("username",username);
      console.log("password",password);
      if(username=="admin"&&password=="123456"){
        localStorage.setItem("isLogin",true);
        history.push("/");
      }else{
        localStorage.setItem("isLogin",false);
      }
    }
    return (
      <div className="box-main">
        <div className="box-login">
            <form onSubmit={(e)=>handleLogin(e)}>
              <div className="box-login-logo">
                    <img src="./images/logo_sistech.jpg"/>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type={"text"} onChange={(e)=>setUsername(e.target.value)} defaultValue={username} className="form-control" placeholder="Username ... "/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type={"password"} onChange={(e)=>setPassword(e.target.value)} defaultValue={password} className="form-control" placeholder="Password ... "/>
                </div>
                <div className="form-group">
                    <button type="sumbit" className="btn  btn-primary btn-block">Login</button>
                </div>
            </form>
        </div>
      </div>
    );
  }
  export default Login;