import { createContext,useState} from 'react'

 

export const currentContext = createContext(null);

export const ContextProvider=(props)=>{
    const [cartShow,setCartShow]=useState(true);
    const [footerShow,setFooterShow]=useState(true)
    return(
        <currentContext.Provider value={{cartShow,setCartShow,footerShow,setFooterShow}}>
            {props.children}
        </currentContext.Provider>
    )
}
