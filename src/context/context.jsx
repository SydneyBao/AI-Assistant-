import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    const delay = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setInput("")
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt)
        } else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }
        
        let newResponse = response.replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/(?<!<br>)\*\s/g, '<br>')
            .replace(/<br>\*\s/g, '<br>')
            .replace(/##(.*?)(<br>|$)/g, '<u>$1</u>$2')
            .split(" ");

        for (let i = 0; i < newResponse.length; i++) {
            const nextWord = newResponse[i];
            delay(i, nextWord + " ")
        }
        // let responseArray = response.split();
        // let boldResponse = "";

        // for (let i = 0; i < responseArray.length; i++) {
        //     if(i === 0 || i % 2 !== 1) {
        //         boldResponse += responseArray[i];
        //     } else {
        //         boldResponse += "<b>" + responseArray[i] + "</b>";
        //     }
        // }

        // let newResponse = boldResponse.split("*").join("</br>");
        // let newResponseArray = newResponse.split(" ");
        
        // for (let i = 0; i < newResponseArray.length; i++) {
        //     const nextWord = newResponseArray[i];
        //     delay(i, nextWord + " ")
        // }

        setLoading(false)
    }

    const contextValue = {
        prevPrompts, 
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;