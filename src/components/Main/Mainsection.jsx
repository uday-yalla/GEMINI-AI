import React, { useContext } from 'react'
import'./Mainsection.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context-api/Contextapi'
const Mainsection = () => {

   //--destructured elements of context provider---//

  const{ 
         sendData,
         recentPrompt,
         showResult,
         Loading,
         resultData,
         Input,
         setInput,
         toggleTheme,
        
                 }=useContext(Context);
   
    //-----------//------------//
  return (
        <div className="main-section">
            <div className="nav">
                <p>GeminiAI</p>
                <img onClick={()=>toggleTheme()}id="theme-icon"src={assets.theme_icn}alt="" />
              <img src={assets.user_icn} alt="" />
            </div>
             <div className="Main-container">
            {!showResult?<> 
              <div className="Main-Text">
                <p><span>Hello,</span></p>
                <p>How Can I Help You Today?</p>
              </div>
              <div className="Main-Cards">
                <div className="Card">
                  <p>Suggest Me How To Use Camera with reference pictures?</p>
                  <img src={assets.camera_icn}  />
                </div>
                <div className="Card">
                  <p>Briefly summarize this concept:Global Warming</p>
                  <img src={assets.bulb_icn}  />
                </div>
                <div className="Card">
                  <p>Walk me trough how to apply for new role in  any industry</p>
                  <img src={assets.search_icn}  />
                </div>
                <div className="Card">
                  <p>Suggest me some good movies to watch this weekend on internet</p>
                  <img src={assets.share_icn}  />
                </div>
              </div>              
            </>:<div className="result-field">
                <div className="result-head">
                  <img src={assets.user_icn} alt="" />
                <p>{recentPrompt}</p>
                <div className="text-to-speech">  
                </div>
                </div>
                <div className="result-responce">
                  <img src={assets.gemini_icn} alt="" />
                
                  {Loading
                  ? <div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                  </div>
                 : <p  dangerouslySetInnerHTML={{__html:resultData}}></p>}
                </div>

            </div>}                                                         
            
              <div className="Main-Bottom-section">
                <div className="Search-Field">
                  <input onChange={(e)=>setInput(e.target.value)}  value={Input} type="text" placeholder='Enter a prompt here' />
                  <div>
                    <img src={assets.uploadimg_icn} alt="" />
                   <img  src={assets.microphone_icn} alt="" />
                  
                   {Input?<img onClick={()=>sendData()}  src={assets.communication_icn} alt="" />:null} 
                  </div>
                </div>
                <p className="Main-Bottom-Info">
                 Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                 </p>
              </div>
              </div>
              
            
        </div>
    
  )
}

export default Mainsection