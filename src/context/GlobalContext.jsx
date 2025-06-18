import {createContext, useEffect, useState } from "react";
export const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("localData");
    return stored ? JSON.parse(stored) : {}
  })

  useEffect(() => {
    if (data && data.comments) return; //in case data state exists no need to fetch
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.log("fetch error:", error))
  }, [])

  useEffect(() => {
    if (data === null) return;
    localStorage.setItem("localData", JSON.stringify(data));
  }, [data])

  const currentUser = data.currentUser ? data.currentUser.username : null

  // disable edit buttons when editing comment
  const [disabledButtons, setDisabledButtons] = useState(false); 
  return (
    <GlobalContext.Provider value={{data, setData,
     currentUser, disabledButtons, setDisabledButtons}}>
      {children}
    </GlobalContext.Provider>
  )
}