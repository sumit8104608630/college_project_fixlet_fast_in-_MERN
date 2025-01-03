import { createContext,useState} from 'react'

 

export const currentContext = createContext(null);

export const ContextProvider=(props)=>{
    const [cartShow,setCartShow]=useState(true);
    return(
        <currentContext.Provider value={{cartShow,setCartShow}}>
            {props.children}
        </currentContext.Provider>
    )
}
