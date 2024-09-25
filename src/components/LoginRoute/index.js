

import {Component} from "react" 
import {Redirect} from "react-router-dom" 
import Cookies from "js-cookie"

import RegisterAndLoginHeader from "../RegisterAndLoginHeader"

import "./index.css"

class LoginRoute extends Component {
    state={email:"",password:"",showPassword:false,isEmailErr:false,isPasswordErr:false,isEmailErrMsg:"",isPasswordErrMsg:"",isErr:false,isErrorMsg:""}

    onChangeEmail=(event)=>{
        this.setState({email:event.target.value})
    }

    onChangePassword=(event)=>{
        this.setState({password:event.target.value})
    }

    onChangeCheckbox=()=>{
        this.setState(prevState=>({showPassword:!prevState.showPassword}))
    }

    onSuccessResponse=(jwtToken)=>{
        Cookies.set("jwt_token",jwtToken)
       const {history}=this.props 
        history.replace("/")
    }

    onFailureResponse=(msg)=>{

        this.setState({isErr:true,isErrorMsg:msg})


    }

    onSubmitForm=async (event)=>{
        event.preventDefault()
        const {email,password} =this.state

        // validate the username and 
        
        if (email===""){
            this.setState({isEmailErr:true,isEmailErrMsg:"Required"})
            return ;
        }
        if (password===""){
            this.setState({isEmailErr:false,isPasswordErr:true,isPasswordErrMsg:"Required"})
            return;
        }else{
            this.setState({isEmailErr:false,isPasswordErr:false}) 
        }

        

        const userDetails={
            email,
            password
        }
        // send the Register API request
        const url=`https://todo-application-3wjw.onrender.com/user-details/login`
        console.log(url)
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }

        const response=await fetch(url,options);
        const data=await response.json();
        console.log(data)
        if (response.ok){
            this.onSuccessResponse(data.jwtToken)
        }else{
            this.onFailureResponse(data.error_msg)
        }

    }

    render(){
                const {email, password,showPassword,isErr,isErrorMsg,isPasswordErr,isPasswordErrMsg,isEmailErr,isEmailErrMsg} = this.state 
                const userBorder=isEmailErr?"error-input-border":null;
                const passwordBorder=isPasswordErr?"error-input-border":null; 
                const jwtToken=Cookies.get("jwt_token");
                if (jwtToken!==undefined){
                    return <Redirect to="/" />
                }
        return (
            <>
                <RegisterAndLoginHeader/>
                <div className="lg-home-page-container"  >

                    <form className="lg-register-form-container" onSubmit={this.onSubmitForm}>
                        <h1 className="lg-website-text">Login Todo Application </h1> 

                        <div className="lg-separator">
                        <label className="lg-label-text" htmlFor="email">EMAIL</label>
                        <input className={`lg-input-element ${userBorder}`} type="text" id="email" value={email} onChange={this.onChangeEmail} placeholder="Enter the Email"/>
                        {isEmailErr && <p className="error-text">{isEmailErrMsg}</p>}
                        </div>

                        <div className="lg-separator">
                            <label  className="lg-label-text" htmlFor="password">PASSWORD</label>
                            <input className= {`lg-input-element ${passwordBorder}`} type={showPassword?"text":"password"} id="password" value={password} onChange={this.onChangePassword} placeholder="Enter the Password"/>
                            {isPasswordErr && <p className="error-text">{isPasswordErrMsg}</p>}
                        </div>
                        <div className="lg-separator">
                        <div className="shown-password-container">
                            <input type="checkbox" id="shownPassword"  className="rg-checkbox" onChange={this.onChangeCheckbox} />
                            <label className="lg-label-text" htmlFor="shownPassword">Show Password</label>
                        </div>
                        <button className="lg-submit-button" type="submit">
                            Submit
                        </button>
                        {isErr && <p className="error-text">{isErrorMsg}</p>} 
                        </div>
                        
                        
                       
                    </form>
                </div>
               
            
            </>
        )
    }
}

export default LoginRoute