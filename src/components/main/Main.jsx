import React, { useContext, useRef, useEffect } from 'react'
import './main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'


const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, newChat} = useContext(Context)
    const resultRef = useRef(null);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [resultData, loading]);

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
                        <div className="card" onClick={() => setInput("Summarize Sydney's coding experience")}>
                            <p>Summarize Sydney's coding experience</p>
                            {/* <img src={assets.compass_icon} alt=""/> */}
                        </div>
                        <div className="card" onClick={() => setInput("Describe Sydney's ideal work environment")}>
                            <p>Describe Sydney's ideal work environment</p>
                            {/* <img src={assets.bulb_icon} alt=""/> */}
                        </div>
                        <div className="card" onClick={() => setInput("Which coding project is Sydney most proud of?")}>
                            <p>Which coding project is Sydney most proud of?</p>
                            {/* <img src={assets.message_icon} alt=""/> */}
                        </div>
                        <div className="card" onClick={() => setInput("What does Sydney like to do for fun?")}>
                            <p>What does Sydney like to do for fun?</p>
                            {/* <img src={assets.code_icon} alt=""/> */}
                        </div>
                    </div>
                </>: 
                <div className='result' ref={resultRef}>
                    <div className="result-title">
                        {/* <img src={assets.user_icon} alt = ""/> */}
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src="../../../public/sign.png" alt=""/>
                        {loading?
                            <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div>:
                            <div>
                                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            </div>
                            
                        }
                        {/* <p>{resultData}</p> */}
                    </div>
                </div>
            }
            
            <div className="main-bottom">
                <div className='bottom-row'>
                    <div className = "search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder='Ask me anything...'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.metaKey && input.trim()) {
                                e.preventDefault();
                                onSent();
                                }
                            }}
                            />
                        {input?<img onClick={() => onSent()}src={assets.send_icon} alt=""/>:null}
                    </div>
                </div>
                <p className="bottom-info">
                    This chatbot is powered by the Gemini API
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main