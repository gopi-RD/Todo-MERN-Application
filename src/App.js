
import {Component} from "react"
import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom"

import TodoContext from "./context/TodoContext";
import RegisterRoute from "./components/RegisterRoute";
import LoginRoute from "./components/LoginRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import TodoList from "./components/TodoList";

import "./App.css"


class App extends Component{
    state={isSignIn: false}

    isSignToggle=()=>{
        this.setState(prevState=>({isSignIn:!prevState.isSignIn}))
    }

    render(){
        const {isSignIn}=this.state
        return(
            <TodoContext.Provider
            value={{isSignIn,isSignToggle:this.isSignToggle}}
            >
                <>
                    <BrowserRouter>
                    <Switch>

                    <Route path="/login" component={LoginRoute}/>
                    <Route exact path="/register" component={RegisterRoute} /> 
                    <ProtectedRoute exact path="/" component={TodoList} />
                    <Redirect to="/login"/>
                    </Switch>

                    </BrowserRouter>

                </>
            </TodoContext.Provider>
            
        )
    }
}


export default App;

