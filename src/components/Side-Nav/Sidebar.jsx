import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../Context-api/Contextapi'
const Sidebar = () => {
  const[menuToggle,setMenuToggle]=useState(false)// To extend the sidebar
  const{sendData,previousPrompt,setRecentPrompt, newChat}=useContext(Context)

  const loadData=async(prompt)=>{
    setRecentPrompt(prompt)
    await  sendData(prompt)
  }
  return (
    //--sidebar  section------//
    <div className='sidebar'>
      <div className="Top-section">
      <img onClick={()=>setMenuToggle(prev=>!prev)} className='menu' src={assets.list_icn} alt="" />
      <div onClick={()=>newChat()} className="New-chat">
        <img className="add" src={assets.plus_icn} alt="" />
       {menuToggle?<p>New Chat</p>:null} 
      </div>
    {menuToggle?<div className="Recent">
      <p className="Recent-Tittle">
        Recent
      </p>
      {previousPrompt.map((item,index)=>{ 
          return(<div onClick={()=>loadData()} className="Recent-Entry">
          <img id="RE-img" src={assets.message2_icn} alt="" />
          <p>{item.slice(0,18)}</p>
        </div>)
        })}
      
      </div>
     :null} 
      </div>
      <div className="Bottom-section">
       <div  onClick={()=>loadData(item)}className="Bottom-Item Recent-Entry">
        <img id="RE-img"src={assets.help_icn}/>
       {menuToggle?<p>Help</p>:null} 
       </div>
       <div className="Bottom-Item Recent-Entry">
        <img id="RE-img" src={assets.history_icn}/>
        {menuToggle? <p>Activity</p>:null}
       </div>
       <div className="Bottom-Item Recent-Entry">
        <img id="RE-img" src={assets.setting_icn}/>
        {menuToggle?<p>Settings</p>:null}
       </div>
      </div>
    </div>
  )
}

export default Sidebar