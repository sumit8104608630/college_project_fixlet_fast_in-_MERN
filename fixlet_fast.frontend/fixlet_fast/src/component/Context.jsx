import { createContext,useState} from 'react'

 

export const currentContext = createContext(null);

export const ContextProvider=(props)=>{
    const [cartShow,setCartShow]=useState(true);
    const [footerShow,setFooterShow]=useState(true)
    const [servicePartName,setPartValue]=useState("")
    const [checkout,setCheckout]=useState(true);
    const [showHeader,setShowHeader]=useState(true)
    const [showAddress,setShowAddress]=useState(true)
    const [showSearch,setShowSearch]=useState(true)
    return(
        <currentContext.Provider
         value={{cartShow,setCartShow,
                footerShow,setFooterShow,
                servicePartName,setPartValue,
                checkout,setCheckout,
                showHeader,setShowHeader,
                showSearch,setShowSearch,
                showAddress,setShowAddress}}>
            {props.children}
        </currentContext.Provider>
    )
}
