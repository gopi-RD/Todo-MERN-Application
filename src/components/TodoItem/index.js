

import "./index.css"

const TodoItem=(props)=>{
    const {todoDetails,onUpdateCompleteState,onUpdateInProgressState,onUpdatePendingstate,onUpdateDeleteTodo,onUpdateDateTodoItem}=props 
    const {id,name,status}=todoDetails

    const onChangePendingState=()=>{
        onUpdatePendingstate(id)
    }
    const onChangeInprogressState=()=>{
        onUpdateInProgressState(id)
    }

    const onChangeCompleteState=()=>{
        onUpdateCompleteState(id)
    }

    const onDeleteTodo=()=>{
        onUpdateDeleteTodo(id)
    }

    const onChangeTodo=()=>{
        onUpdateDateTodoItem((id))

    }

    let StatusStyle=null
    if(status==="Pending"){
        StatusStyle="active-pending-btn"
    }else if (status==="in-Progress"){
        StatusStyle="active-in-progress-btn"
    }
    else{
        StatusStyle="active-completed-btn"
    }


   

    return (

        <li className="todo-each-item">
            <span className="todo-name">
                {name}
            </span>
            <div className="todo-status-container">
                        <span className={`${StatusStyle} todo-status`}>{status}</span>
                       <div className="btn-container">
                        <button className="pending-btn" onClick={onChangePendingState}>Pending...</button>
                        <button className="in-progress-btn" onClick={onChangeInprogressState}>in-progress...</button>
                        <button className="completed-btn" onClick={onChangeCompleteState} >Completed</button>
                        </div>

             </div>
            
            <div className="todo-action-container">
                <button className="edit" type="button" onClick={onChangeTodo}>Edit</button>
                <button className="delete" type="button" onClick={onDeleteTodo}>Delete</button>
            </div>
        </li>
        
    )

}

export default TodoItem;