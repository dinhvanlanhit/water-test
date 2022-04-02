import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import moment from 'moment';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { vi,en } from '../../lang';
import axiosClient from '../../axiosClient';
function Home() {
  const [langFlag,setLangFlag ]=useState(()=>{
     let _langFlag = localStorage.getItem("langFlag");
     if(_langFlag==undefined||null){
       return "en";
     }else{
      return _langFlag;
     }
  });
  const [lang,setLang]=useState(en);
  const [statusViewDetailChlorine, setStatusViewDetailChlorine] = useState(false);
  const [detailChlorine, setDetailChlorine] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [viewItemDetail, setViewItemDetail] = useState(null);
  const [listData, setListData] = useState([]);
  const [isLoading,setLoading]= useState(true);
  // Hàm chọn ngôn ngữ 
  const handleChangeLang=(flag)=>{
    setLangFlag(flag);
    setLang(flag=='en'?en:vi);
    localStorage.setItem("langFlag",flag);
  }
  /// Hàm gọi Api tu serve //////
  const getListData = async () => {
    const result = await axiosClient.get("/stations/list?fbclid=IwAR1ohNwD8c6PsB-FII0iTWDOVSk1rVMSl0Smrh-Wtg3N06dZyQ6skx-RLM4");
    if (result.length > 0) {
      setListData(result);
      setViewItemDetail(result[0]);
      setActiveMenu(result[0].stationID);
      setStatusViewDetailChlorine(false);
      setLoading(false);
    } else {
      setListData([]);
      setStatusViewDetailChlorine(false);
      setLoading(false);
    }
  }
  /// Hàm xem thông tin chi tiết
  const handleViewItemDetail = (payload) => {
    setLoading(true);
    setTimeout(()=>{
      setStatusViewDetailChlorine(false);
      setActiveMenu(payload.stationID)
      setViewItemDetail(payload);
      setLoading(false);
    },200)
  }
  const handleViewDetailChlorine = (payload) => {
    setDetailChlorine(payload);
    console.log(detailChlorine);
    setStatusViewDetailChlorine(true);
  }
  const renderItem = () => {
    return (
      <div className='container'>
        {viewItemDetail ? <>
          <h5 className="address-text"><img src='./images/map.png'></img><span>{viewItemDetail.stationAddress}</span></h5>
          <div className="row">
            {viewItemDetail.processingSystems.map((child, key) => {
              return (<div className="column" key={key} >
                <div className="card" >
                  <h3 className=' text-center title'>{child.processingSystemName}</h3>
                  <div className='from-group'>
                    <label>{lang.len}</label>
                    <div className="progress-light-grey">
                      <div className="progress-blue progress-center" style={{ width: child.waterLevel + '%' }}>{child.waterLevel}m</div>
                    </div>
                  </div>
                  <div className='from-group'>
                  <label>{lang.pres}</label>
                    <div className="progress-light-grey">
                      <div className="progress-red progress-center" style={{ width: child.waterPressure + '%' }}>{child.waterPressure}pa</div>
                    </div>
                  </div>
                  <div className='from-group'>
                  <label>{lang.cloConcen}</label>
                    <div className="progress-light-grey">
                      <div className="progress-green progress-center" style={{ width: child.chlorineConcentration + '%' }}>{child.chlorineConcentration}%</div>
                    </div>
                  </div>
                  <div className='from-group text-center main-detail'>
                    <u> <p onClick={(e) => handleViewDetailChlorine(child)} className='button-view-detail'>{lang.cloHist}</p></u>
                  </div>
                </div>
              </div>)
            })}
          </div>
        </> : <></>}
      </div>
    )
  }
  const renderItemDetail = () => {
    return (
      <div className='container'>
        {Object.keys(detailChlorine).length > 0 ? <>
          <table className='table'>
            <tr>
              <th><img onClick={(e)=>setStatusViewDetailChlorine(false)} className='prev' src="./images/prev.png"/></th>
              <th className='text-center'><u><b>{detailChlorine.processingSystemName}</b></u></th>
              <th className='float-right'><img onClick={(e)=>setStatusViewDetailChlorine(false)} className='prev' src="./images/add.png"/></th>
            </tr>
          </table>
          <table className='chlorine'>
            <thead>
              <tr>
                <th className='text-center'>{lang.tableTime}</th>
                <th className='text-center'>{lang.tableEmp}</th>
                <th className='text-center'>{lang.tableCloAmount}</th>
              </tr>
            </thead>
            <tbody>
              {detailChlorine.chlorineInjections.map((item, key) => {
                return (<tr key={key}>
                  <td className='text-center'>{moment(item.injectionTime).format('HH:mm:ss DD/MM/YYYY')}</td>
                  <td className='text-center'>{item.employeeName}</td>
                  <td className='text-center'>{item.chlorineVolume}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </> : <></>}
      </div>
    )
  }
  const handleLogin = ()=>{ localStorage.clear();}
  const loaDing =()=>{
     return(<div class="__loader __loader-default is-active" data-text="" ></div>);
  }
  useEffect(() => {
    getListData();
    setLang(langFlag=='en'?en:vi);
  }, []);
  return (
    <>
      {isLoading?loaDing():<></>}
      <div className="header">
            <div className="header-left">
                    <img className="login-logo" src="./images/logo_sistech.jpg" alt="Sistech logo"/>
            </div>
            <div className="header-center">
                <h1 className="header-title"><a href="/">{lang.mainTitle}</a></h1>
            </div>
            <div className="header-right">
                <h6 className="logout-text"> 
                    <Link onClick={()=>handleLogin()} to="/login"> <img src='https://iconarchive.com/download/i86056/graphicloads/100-flat-2/inside-logout.ico'/> 
                    {lang.logOut}
                    </Link>
                    <br/>
                    <span className={'lang-text '+(langFlag=='vi'?'active':'')} onClick={(e)=>handleChangeLang('vi')}>Vietnamese</span>,
                    <span className={'lang-text '+(langFlag=='en'?'active':'')} onClick={(e)=>handleChangeLang('en')}>English</span>
                </h6>
            </div>
      </div>
      <div className="sidebar">
        <div className='scrollmenu'>
          {listData.map((item, key) => {
            return (<a key={key} onClick={(e) => handleViewItemDetail(item)} className={activeMenu == item.stationID ? 'active' : ''}>{item.stationName} </a>)
          })}
        </div>
      </div>
      <div className="content">
        {statusViewDetailChlorine ? renderItemDetail() : renderItem()}
      </div>
    </>
  );
}
export default Home;