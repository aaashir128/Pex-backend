import React from 'react'
import { useEffect } from 'react'
import './ermodal.css'

const ERModal = ({op,setop,head,msg}) => {
    useEffect(()=>{
        console.log(op,setop,head,msg);
    },[])
  return (
     <div style={{display:`${op?"flex":"none"}`}} className="containeri" >
        <div className="inner">
            <div className="modali">
                <div className="headeri">
                    <div className="headerinner">
                        <div className="text">{head}</div>
                        {/* <div className="cross">X</div> */}
                    </div>
                </div>
                <div className="bodyContainer">
                    <div className="bodyInner">
                        {msg}
                    </div>
                </div>
                <div className="footeri">
                    <div className="footerInner">
                        <div className="footerbutton" onClick={()=>{setop(false)}} >Close</div>
                    </div>
                </div>
            </div>
        </div>
     </div>
  )
}

export default ERModal