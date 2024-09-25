
import {Component} from "react"
import Cookies from "js-cookie"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Header from "../Header"
import TodoItem from "../TodoItem"

import "./index.css";


class TodoList extends Component {
    state={todoListItem:[],taskname:"",name:"",status:"",isPopup:false,isStatusEr:false,isNameEr:false,id:null,loading:true,}

    componentDidMount(){
        this.getTodoList()
    }

    getTodoList=async()=>{

        const jwtToken=Cookies.get("jwt_token")

        const url=`https://todo-application-3wjw.onrender.com/todo-list/todos`
        const options={
            method:"GET",
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }

        const response = await fetch(url, options)
        const data=await response.json() 
        if (response.ok){
            const updatedData= data.map(eachItem=>({
                id:eachItem._id,
                name:eachItem.name,
                status:eachItem.status,
                createdData:eachItem.createdAt
            }))
            this.setState({todoListItem:updatedData,loading:false}) 
        }
    }

    onAddTask=async()=>{
        const {taskname} = this.state 
        if (taskname===""){
            alert("Task Name is required")
            return
        }

        const newTodo={
            name:taskname
        }

        const jwtToken=Cookies.get("jwt_token")

        const url=`https://todo-application-3wjw.onrender.com/todo-list/todos`
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${jwtToken}`
            },
            body:JSON.stringify(newTodo)
        }

        const response = await fetch(url, options)
        const data=await response.json() 
        console.log(data) 
        this.setState({taskname:""})
        this.getTodoList()
        
    }

    onTaskText=(event)=>{
        this.setState({taskname:event.target.value})
    }

    onfetchGetData=async (id)=>{
        const jwtToken=Cookies.get("jwt_token")

        const url=`https://todo-application-3wjw.onrender.com/todo-list/todos/${id}`
        const options={
            method:"GET",
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }

        const response = await fetch(url, options)
        const data=await response.json() 
        return data ;
    }


    onUpdateDateStatus=async(id,status)=>{
        const jwtToken=Cookies.get("jwt_token")
        // Get the specific todo
       const data= this.onfetchGetData(id)
        
        const name=data.name 

        // Update the todo 
            const urlP=`https://todo-application-3wjw.onrender.com/todo-list/todos/${id}`
            const optionsP={
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${jwtToken}`
                },
                body:JSON.stringify({
                    name,
                    status
                })
            }
    
            const responseP = await fetch(urlP, optionsP)
            const dataP=await responseP.json() 
            console.log(dataP)
            this.getTodoList()

            }

        



    onUpdatePendingstate=(id)=>{
        const status="Pending"
        this.onUpdateDateStatus(id,status)
    }

    onUpdateCompleteState=(id)=>{
        const status="Completed"
        this.onUpdateDateStatus(id,status)
    }

    onUpdateInProgressState=(id)=>{
        const status="in-Progress"
        this.onUpdateDateStatus(id,status)
    }

    onUpdateDeleteTodo=async(id)=>{

        const jwtToken=Cookies.get("jwt_token")

        const url=`https://todo-application-3wjw.onrender.com/todo-list/todos/${id}`
        const options={
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }

        const response = await fetch(url, options)
        const data=await response.json()
        console.log(data)

        this.getTodoList()

    }





    onUpdateDateTodoItem=async(id)=>{
        const data= await this.onfetchGetData(id)
        console.log(data)
        this.setState({
            isPopup:true,
            name: data.name,
            status: data.status,
            id:id,
        })
    }





    onCancelAddEmploye=()=>{
        this.setState({
            isPopup:false
        })
    }

    onChangeStatus=(event)=>{
        this.setState({status:event.target.value})
    }
    onChangeName=(event)=>{
        this.setState({name:event.target.value})
    }



    onAddTodoDetails=async(event)=>{
            event.preventDefault() 
            const {name,status,id} = this.state
            console.log(name)

            if (name===""){
                this.setState({isNameEr:true})
                return
            }
            if (status===""){
                this.setState({isNameEr:false,isStatusEr:true})
                return
            }
            else{
                this.setState({isNameEr:false,isStatusEr:false})
            }
            const jwtToken=Cookies.get("jwt_token")

            const urlP=`https://todo-application-3wjw.onrender.com/todo-list/todos/${id}`
            const optionsP={
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${jwtToken}`
                },
                body:JSON.stringify({
                    name,
                    status
                })
            }
    
            const responseP = await fetch(urlP, optionsP)
            const dataP=await responseP.json() 
            console.log(dataP)
            this.getTodoList()
            this.setState({isPopup:false})

            }
    
    

    onPopupContainer=()=>{
        const {name,status,isStatusEr,isNameEr} = this.state
        const nameInputBorder= isNameEr ? "error-input-border":null 
        const emailInputBorder= isStatusEr? "error-input-border":null

        return (
            <div className="popup-container">
                <form className="form-container" onSubmit={this.onAddTodoDetails}>
                   
                   <div className="separator">
                       <label className="label-e">NAME</label>
                       <input className={`input-text-e ${nameInputBorder}`} type="text" value={name} placeholder="Enter name" onChange={this.onChangeName}/> 
                       {isNameEr && <p className="error-text">*Required</p>}
                   </div>
                   <div className="separator">
                       <label className="label-e">STATUS</label>
                       <input className= {`input-text-e ${emailInputBorder}`} type="text" value={status} placeholder="Enter Status" onChange={this.onChangeStatus} />
                       {isStatusEr && <p className="error-text">*Required</p>}
                   </div>
                   <div className="buttons-container">
                       <button type="submit" className="submit-button-e" >
                           Submit
                       </button>
                       <button className="cancel-button" type="button" onClick={this.onCancelAddEmploye}>
                        Cancel
                       </button>
                   </div>
               </form>

            </div>
        )
    }



    render() {
        const {todoListItem,isPopup,loading}=this.state 
        const todoLength=todoListItem.length
        return (
            <>
               <Header/>
            <div className="bg-container">

                <div className="todo-container">
                <h1 className="task-text">Create Task</h1>
                <div className="input-container">
                    <input className="user-text" type="text" placeholder="Add a task" onChange={this.onTaskText} />
                    <button className="add-button" onClick={this.onAddTask}>Add</button>
                </div>
                <h1>
                    My Tasks
                </h1>
                <ul className="todo-list-items">
                    <li className="todo-item-title">
                        <span className="name">Name</span>
                        <sapn className="status">Status</sapn>
                        <span className="action">Action</span>
                    </li>
                    {
                        loading? (
                            <div className="loading-container">
                                <Loader color="#000000" type="ThreeDots" height={100} width={100}/>
                            </div>
                        ): (

                                
                                    todoLength > 0 ? (
                                        todoListItem.map(eachItem =>(
                                            <TodoItem key={eachItem.id} todoDetails={eachItem} 
                                            onUpdateCompleteState={this.onUpdateCompleteState} 
                                            onUpdateInProgressState={this.onUpdateInProgressState}
                                             onUpdatePendingstate={this.onUpdatePendingstate}
                                             onUpdateDeleteTodo={this.onUpdateDeleteTodo}
                                             onUpdateDateTodoItem={this.onUpdateDateTodoItem}
                                              />
                                        ))

                                    ) : (
                                        <div className="no-task-container">
                                            <h1>No Task Found</h1>
                                        </div>
                                    )
                                

                           

                        )
                       
                    }
                </ul>
                
                {isPopup && this.onPopupContainer()}

                </div>
                
                


            </div>
            
            </>

        )
    }
}

export default TodoList;