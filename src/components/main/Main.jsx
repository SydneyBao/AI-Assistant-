import React, { useContext } from 'react'
import './main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'


const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, newChat} = useContext(Context)
  return (
    <div className="main">
        <div className='nav'>
            <p><span>Sydney Bao's</span></p>
            <p>Personal Chatbot</p>
            {/* <img src={assets.user_icon} alt =""/> */}
        </div>
        <div className = "main-container">
            {!showResult? 
                <>
                    <div className="greet">
                        <p><span>Hello, I am Sydney's AI Assistant</span></p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Briefly summarize Sydney's work experience</p>
                            {/* <img src={assets.compass_icon} alt=""/> */}
                        </div>
                        <div className="card">
                            <p>Describe Sydney's ideal work environment</p>
                            {/* <img src={assets.bulb_icon} alt=""/> */}
                        </div>
                        <div className="card">
                            <p>Which coding project is Sydney most proud of?</p>
                            {/* <img src={assets.message_icon} alt=""/> */}
                        </div>
                        <div className="card">
                            <p>What does Sydney like to do for fun?</p>
                            {/* <img src={assets.code_icon} alt=""/> */}
                        </div>
                    </div>
                </>: 
                <div className='result'>
                    <div className="result-title">
                        {/* <img src={assets.user_icon} alt = ""/> */}
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt=""/>
                        {loading?
                            <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div>:
                            <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                        {/* <p>{resultData}</p> */}
                    </div>
                </div>
            }
            
            <div className="main-bottom">
                <div className='bottom-row'>
                    <div className = "search-box">
                        <input onChange={(e) => setInput(e.target.value)} value = {input} type = "text" placeholder='Enter prompt here'/>
                        {input?<img onClick={() => onSent()}src={assets.send_icon} alt=""/>:null}
                    </div>
                    {/* <div onClick={() => newChat()} className="new-chat">
                        <img src={assets.plus_icon} alt = ""/>
                    </div> */}
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main