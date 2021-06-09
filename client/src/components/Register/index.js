import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Register extends Component{
    state = {
        name:'',
        username:'',
        phone: '',
        password:'',
        Cpassword:''
    }


    onChangeName = (event) =>{
        this.setState({
            name: event.target.value
        })
    }
    
    onChangeUsername = (event) =>{
        this.setState({
            username: event.target.value
        })
    }

    onChangePhone = (event) =>{
        this.setState({
            phone: event.target.value
        })
    }

    onChangePassword = (event) =>{
        this.setState({
            password: event.target.value
        })
    }

    onChangeCpassword = (event) =>{
        this.setState({
            Cpassword: event.target.value
        })
    }

    submitForm = async(e)=>{
        e.preventDefault()
        const {history}=this.props
        const {name,username,phone,password,Cpassword} = this.state
        
        const url = '/register'
        const options = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name,username,phone,password,Cpassword})
        }
        const response = await fetch(url,options);
        const data = await response.json()
        console.log(data)
        if(password !== Cpassword){
            alert("Password are not matching")
        }
        else if(response.status===422 || !data){
            alert("username already exist or please plz all the fields")
        }else{
            alert('Registration Successful')
            
            history.push('/login')
        }
    }

    render(){
        const {name,username,phone,password,Cpassword} =this.state

        return(
            <div className="registration-container">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                    className="login-website-logo-mobile-image"
                    alt="website logo"
                    />
                <form method="POST" className="registration-form-container">
                <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                className="login-website-logo-desktop-image"
                alt="website logo"
                />
                    <div className="input-container">
                    <label className="input-label" htmlFor="name">Name</label>
                    <input 
                    type="text" 
                    id="name"
                     value={name} 
                     className="input-field"
                     placeholder="name"
                     onChange={this.onChangeName}
                     />
                    </div>
                    
                    <div className="input-container">
                    <label className="input-label" htmlFor="username">User Name</label>
                    <input 
                    type="text" 
                    id="username"
                     value={username} 
                     className="input-field"
                     placeholder="Username"
                     onChange={this.onChangeUsername}
                     />
                    </div>
                    
                    <div className="input-container">
                    <label className="input-label" htmlFor="phone">Phone</label>
                    <input 
                    type="Number" 
                    id="phone" 
                    value= {phone}
                     className="input-field"
                     placeholder="Phone"
                     onChange={this.onChangePhone}
                     />
                    </div>
                    
                    <div className="input-container">
                    <label className="input-label" htmlFor="password">password</label>
                    <input 
                    type="password" 
                    id="password"
                     className="input-field"
                     value={password}
                     placeholder="Password"
                     onChange={this.onChangePassword}
                     />
                    </div>
                    
                    <div className="input-container">
                    <label className="input-label" htmlFor="Cpassword">Confirm Passowrd</label>
                    <input 
                    type="password" 
                    id="Cpassword"
                    value={Cpassword}
                     className="input-field"
                     placeholder="Confirm Password"
                     onChange={this.onChangeCpassword}
                     />
                    </div>
                    <button type="submit" onClick={this.submitForm} className="register-btn">
                        Register
                    </button>
                    <div className="new-user-container">
                        <p className="already-user">Already a user?</p>
                        <p className="signin"><Link to="/login" >Login</Link></p>
                    </div>
                </form>
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                    className="logo-desktop-image"
                    alt="website logo"
                />
                
            </div>
        )
    }
}

export default Register