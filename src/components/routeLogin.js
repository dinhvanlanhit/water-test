
import  React, { useEffect } from  "react";
import { Route, Redirect } from  "react-router-dom";
const  RouteLogin = (props) => {
    const condition = localStorage.getItem("isLogin");
    useEffect(()=>{
       
    },[props])
    return  (condition=="true"||condition==true)?(<Route  path={props.path}  exact={props.exact} component={props.component} />) :  ( <Redirect to={{ pathname: '/login', state: { from: props.location } }} />);
};
export  default  RouteLogin;