

import {Component} from "react" 
import {Link} from "react-router-dom"

import RegisterAndLoginHeader from "../RegisterAndLoginHeader"

import "./index.css"

class RegisterRoute extends Component {
    state={username:"",email:"",password:"",showPassword:false,isUserErr:false,isPasswordErr:false,isUserErrMsg:"",isPasswordErrMsg:"",isErr:false,isErrorMsg:"",isEmailErr:"",isEmailErrMsg:""}

    onChangeUsername=(event)=>{
        this.setState({username:event.target.value})
    }

    onChangeEmail=(event)=>{
        this.setState({email:event.target.value})
    }

    onChangePassword=(event)=>{
        this.setState({password:event.target.value})
    }

    onChangeCheckbox=()=>{
        this.setState(prevState=>({showPassword:!prevState.showPassword}))
    }

    onSuccessResponse=()=>{
        const {history}=this.props 
        history.replace("/login")
    }

    onFailureResponse=(msg)=>{

        this.setState({isErr:true,isErrorMsg:msg})


    }

    onSubmitForm=async (event)=>{
        event.preventDefault()
        const {username,password,email} =this.state

        // validate the username and 
        
        if (username===""){
            this.setState({isUserErr:true,isUserErrMsg:"Required"})
            return ;
        }
        if (email===""){
            this.setState({isEmailErr:true,isEmailErrMsg:"Required"})
            return ;
        }

        if (password===""){
            this.setState({isUserErr:false,isPasswordErr:true,isPasswordErrMsg:"Required"})
            return;
        }else{
            this.setState({isUserErr:false,isPasswordErr:false}) 
        }

        const userDetails={
            username,
            email,
            password
        }
        // send the Register API request
        const url=`https://todo-application-3wjw.onrender.com/user-details/register`
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(userDetails)
        }

        const response=await fetch(url,options);
        const data=await response.json();
        console.log(data)
        if (response.ok){
            this.onSuccessResponse()
        }else{
            this.onFailureResponse(data.error_msg)
        }

    }

    render(){
                const {username,email,password,showPassword,isErr,isErrorMsg,isPasswordErr,isPasswordErrMsg,isUserErr,isUserErrMsg,isEmailErr,isEmailErrMsg} = this.state 
                const userBorder=isUserErr?"error-input-border":null;
                const passwordBorder=isPasswordErr?"error-input-border":null;
                const emailBorder=isEmailErr?"error-input-border":null;
        return (
            <>
                <RegisterAndLoginHeader/>
                <div className="home-page-container"  >

                    <form className="register-form-container" onSubmit={this.onSubmitForm}>
                        <h1 className="website-text">Sign-up Todo Application </h1> 

                        <div className="separator">
                        <label className="re-label-text" htmlFor="username">USERNAME</label>
                        <input className={`re-input-element ${userBorder}`} type="text" id="username" value={username} onChange={this.onChangeUsername} placeholder="Enter the Username"/>
                        {isUserErr && <p className="error-text">{isUserErrMsg}</p>}
                        </div>

                        <div className="separator">
                        <label className="re-label-text" htmlFor="email">Email</label>
                        <input className={`re-input-element ${emailBorder}`} type="text" id="email" value={email} onChange={this.onChangeEmail} placeholder="Enter the Email"/>
                        {isEmailErr && <p className="error-text">{isEmailErrMsg}</p>}
                        </div>
                        
                        <div className="separator">
                            <label  className="re-label-text" htmlFor="password">PASSWORD</label>
                            <input className= {`re-input-element ${passwordBorder}`} type={showPassword?"text":"password"} id="password" value={password} onChange={this.onChangePassword} placeholder="Enter the Password"/>
                            {isPasswordErr && <p className="error-text">{isPasswordErrMsg}</p>}
                        </div>
                        <div className="separator">
                        <div className="re-shown-password">
                            <input type="checkbox" id="shownPassword"  className="re-checkbox" onChange={this.onChangeCheckbox} />
                            <label className="re-label-text" htmlFor="shownPassword">Show Password</label>
                        </div>
                        <button className="re-submit-button" type="submit">
                            Submit
                        </button>
                        {isErr && <p className="error-text">{isErrorMsg}</p>} 
                        </div>
                        <div className="sign-in-container">
                        <Link className="sign-in" to="/login">Sign-in</Link>
                        </div>
                        
                       
                    </form>
                </div>
               
            
            </>
        )
    }
}

export default RegisterRoute