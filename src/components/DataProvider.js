import React, {useState, useEffect, createContext} from 'react';
export const DataContext = createContext();
export const  DataProvider = (props) => {
    const [todos, setTodos]= useState([])
    /*effect dung để khi reload lại trang thì  không đổi  list item */
    useEffect(()=> {
      const todoStore=JSON.parse(localStorage.getItem('todoStore'))
       if(todoStore) setTodos(todoStore);
  },[])
    useEffect(()=>{
        localStorage.setItem('todoStore', JSON.stringify(todos))
    },[todos])
    
    
  return (
    <DataContext.Provider value={[todos, setTodos]}>
      {props.children}
    </DataContext.Provider>
  )
}

