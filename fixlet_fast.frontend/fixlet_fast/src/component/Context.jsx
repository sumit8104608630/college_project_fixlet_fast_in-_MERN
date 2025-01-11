import { createContext,useState} from 'react'

 

export const currentContext = createContext(null);

export const ContextProvider=(props)=>{
    const [cartShow,setCartShow]=useState(true);
    const [footerShow,setFooterShow]=useState(true)
    const [servicePartName,setPartValue]=useState("")
    return(
        <currentContext.Provider value={{cartShow,setCartShow,footerShow,setFooterShow ,servicePartName,setPartValue}}>
            {props.children}
        </currentContext.Provider>
    )
}
