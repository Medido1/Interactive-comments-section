import {createContext, useEffect, useState } from "react";
export const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("localData");
    return stored ? JSON.parse(stored) : {}
  })

  useEffect(() => {
    if (Object.keys(data).length > 0) return; //in case data state exists no need to fetch
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.log("fetch error:", error))
  }, [])

  useEffect(() => {
    if (data === null) return;
    localStorage.setItem("localData", JSON.stringify(data));
  }, [data])

  let currentUser;
  if (data.currentUser){
    currentUser = data.currentUser.username
  }
  
  return (
    <GlobalContext.Provider value={{data, setData, currentUser}}>
      {children}
    </GlobalContext.Provider>
  )
}