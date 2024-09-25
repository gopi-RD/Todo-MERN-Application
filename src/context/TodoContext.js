import React from 'react';

const TodoContext=React.createContext({
    isSignIn:false,
    isSignToggle:()=>{},
})

export default TodoContext;