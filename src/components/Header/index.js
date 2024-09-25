import {useState,useEffect} from "react"
import {withRouter} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"
const Header =(props)=>{

    const [data,setData]=useState({})

    useEffect(()=>{

        const fetchData=async()=>{
            const jwtToken=Cookies.get("jwt_token")
            const url=`https://todo-application-3wjw.onrender.com/user-details/user-profile`
            const options={
                method:"GET",
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
            }
    
            const response = await fetch(url, options)
            const data=await response.json()
            setData(data)
            console.log(data)


        }
        fetchData()
    },[])




   const onLogoutButton =()=>{

        const {history} = props
        Cookies.remove("jwt_token")
        history.push("/login")
        
    } 
    const userName=data.username.slice(0,1).toUpperCase()

    return (
        <header className="header-top-container"> 
        <nav className="header-container">
            <h1 className="website-logo">Todos</h1> 
            <div className="profile-container">
                <button className="profile-name-first-letter">{userName}</button>

                <div className="profile-details-container">
                    <span className="profile-name">{data.username}</span>
                    <a  href={`${data.email}`} className="profile-email">{data.email}</a>
                    <button  className="logout-btn" onClick={onLogoutButton}>Logout</button>
                </div>
           </div>  
        </nav> 
        </header>
       
    )
}


export default withRouter(Header)