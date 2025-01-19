import { createContext,useState} from 'react'

 

export const currentContext = createContext(null);

export const ContextProvider=(props)=>{
    const [cartShow,setCartShow]=useState(true);
    const [footerShow,setFooterShow]=useState(true)
    const [servicePartName,setPartValue]=useState("")
    const [checkout,setCheckout]=useState(true);
    const [showHeader,setShowHeader]=useState(true)
    return(
        <currentContext.Provider value={{cartShow,setCartShow,footerShow,setFooterShow ,servicePartName,setPartValue,checkout,setCheckout,showHeader,setShowHeader}}>
            {props.children}
        </currentContext.Provider>
    )
}
