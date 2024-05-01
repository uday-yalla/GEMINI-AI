import { createContext, useState } from "react";
import 'regenerator-runtime/runtime'
import runChat from "../Config/Gemini";
import { useEffect } from "react";
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition";
 export const Context = createContext();
const ContextProvider=(props)=>{

    const [Input,setInput]=useState('');  //to get input data
    const[recentPrompt,setRecentPrompt]=useState("") //
    const[previousPrompt,setPreviousPrompt]=useState([]);//to store the previous prompt
    const[showResult,setShowResult]=useState(false);//to show data on screen
    const[Loading,setLoading]=useState(false); // for loading 
    const[resultData,setResultData]=useState(""); // to catch data coming from api
    const[darkMode,setDarkMode]=useState(false) // for dark and light theme
    const[Listening,SetListening]=useState(true)//to get input from microphone
    

         //dark-light theme// 
    const toggleTheme=()=>{
        setDarkMode((prevs)=>!prevs);
    } 
    const theme= darkMode?"dark":"light";
    useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme)
    },[darkMode])

    //----------//----------//
    const speechToText=()=>{
        const {transcript,browserSupportSpeechRecognition}=useSpeechRecognition();
    
     if(!browserSupportSpeechRecognition){
      return(
          alert("your browser doesn't support speech recognition")
      )
      } 
     }



    //typing-effect--//

    const typingEffect=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },15*index)

    //-------//------//

    }
    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    // sending request to api using  input section //
const sendData=async(prompt)=>{
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt !== undefined) {
        response=await runChat(prompt);
        setRecentPrompt(prompt)
    }else{
        setRecentPrompt(Input)
        setPreviousPrompt(prev=>[...prev,Input])
         response = await  runChat(Input)
         
    }

    //-------------//------------//
    
     //using split method to highlight the headings and change lines//

     let responseArray=response.split("**");
     let newResponse="";
     for(let i=0;i<responseArray.length ;i++){
        if (i===0||i%2 !==1) {
           newResponse+=responseArray[i];
        }
        else{
            newResponse += "<b>"+responseArray[i]+"</b>";
        }
     }
    let  newResponse2 = newResponse.split("*").join("</br>")
  let newResponseArray=newResponse2.split("");
  for(let i=0;i<newResponseArray.length;i++)
  {
    const nextWord=newResponseArray[i];
    typingEffect(i,nextWord+"")
  }
   setLoading(false)
   setInput("")
}
 //-----------//-------------//

    const GeminiData ={
        previousPrompt,
        setPreviousPrompt,
        sendData,
        recentPrompt,
        setRecentPrompt,
        showResult,
        Loading,
        resultData,
        Input,
        setInput,
        newChat,
        toggleTheme,
        darkMode,
        setDarkMode,
        speechToText,
        Listening,
        SetListening,
        
       
        
    }

    return(
        <Context.Provider value={GeminiData}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider
