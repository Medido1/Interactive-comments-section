import {createContext, useEffect, useState } from "react";

export const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Fetch error:", error));
  }, [])

  return (
    <GlobalContext.Provider value = {{data, setData}}>
      {children}
    </GlobalContext.Provider >  
  )
  
}
 