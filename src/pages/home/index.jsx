import React, { useRef,useEffect,useState, useLayoutEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../../components/header';
import axiosClient from '../../axiosClient';
function Home() {
  const [activeMenu,setActiveMenu] = useState(null);
  const [viewItemDetail,setViewItemDetail] = useState(null);
  const [listData,setListData] = useState([]);
  const getListData =async()=>{
    const result =  await axiosClient.get("/stations/list?fbclid=IwAR1ohNwD8c6PsB-FII0iTWDOVSk1rVMSl0Smrh-Wtg3N06dZyQ6skx-RLM4");
    if(result.length>0){
      setListData(result);
      setViewItemDetail(result[0]);
      setActiveMenu(result[0].stationID);
      
    }else{
      setListData([]);
    }
  }
  const handleViewItemDetail =(payload)=>{
    setActiveMenu(payload.stationID)
    setViewItemDetail(payload);
  }
  useEffect(()=>{
    getListData();
  },[]);
  return (
    <>
        <Header/>
       
            <div className="sidebar">
           
                  {listData.map((item,key)=>{
                     return (<a key={key} onClick={(e)=>handleViewItemDetail(item)} className={activeMenu==item.stationID?'active':''}>{item.stationName} </a>)
                  })}
               
            </div>
            <div className="content">
                  {viewItemDetail?<>
                   <h5 className="address-text"><img src='./images/map.png'></img><span>{viewItemDetail.stationAddress}</span></h5>
                    <div className="box-wapper wapper-box-main-adrress">
                        {viewItemDetail.processingSystems.map((child,key)=>{
                            return(
                              <div className='box-adrress-item' key={key}>
                                  <h3 className='title'>{child.processingSystemName}</h3>
                                  <div className='from-group'>
                                      <label>Water level</label>
                                      <div className="progress-light-grey">
                                        <div className="progress-blue progress-center" style={{width: child.waterLevel+'%'}}>{child.waterLevel}m</div>
                                      </div>
                                  </div>
                                  <div className='from-group'>
                                      <label>Pressure</label>
                                      <div className="progress-light-grey">
                                        <div className="progress-red progress-center" style={{width: child.waterPressure+'%'}}>{child.waterPressure}pa</div>
                                      </div>
                                  </div>
                                  <div className='from-group'>
                                      <label>Chlorine Concentration</label>
                                      <div className="progress-light-grey">
                                        <div className="progress-green progress-center" style={{width: child.chlorineConcentration+'%'}}>{child.chlorineConcentration}%</div>
                                      </div>
                                  </div>
                                  <div className='from-group text-center main-detail'>
                                     <u> <p className='button-view-detail'>Chlorine Injections List</p></u>
                                  </div>
                              </div>
                            )
                        })}
                    </div>
                  </>:<></>}
                 
            </div>
    </>
  );
}
export default Home;