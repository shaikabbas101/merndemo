import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Register extends Component{
    state = {
        name:'',
        username:'',
        phone: '',
        password:'',
        Cpassword:'',
        isNameFieldEmpty:false,
        isUserNameFieldEmpty:false,
        isPhoneFieldEmpty:false,
        isPassFieldEmpty:false,
        isCpassFieldEmpty:false
    }


    onChangeName = (event) =>{
       if(event.target.value!==''){
        this.setState({
            isNameFieldEmpty:false
        })
       }
        this.setState({
            name: event.target.value
        })
    
    }
    
    onChangeUsername = (event) =>{
        if(event.target.value!==''){
            this.setState({
                isNameFieldEmpty:false
            })
           }
        this.setState({
            username: event.target.value
        })
    
    }

    onChangePhone = (event) =>{
        if(event.target.value!==''){
            this.setState({
                isNameFieldEmpty:false
            })
           }
        this.setState({
            phone: event.target.value
        })
    
    }

    onChangePassword = (event) =>{
        if(event.target.value!==''){
            this.setState({
                isNameFieldEmpty:false
            })
           }
        this.setState({
            password: event.target.value
        })
    
    }

    onChangeCpassword = (event) =>{
        if(event.target.value!==''){
            this.setState({
                isNameFieldEmpty:false
            })
           }
        this.setState({
            Cpassword: event.target.value
        })
    }


    validateForm = ()=>{
        const {name,username,phone,password,Cpassword} = this.state
        if(!name){
            this.setState({
                isNameFieldEmpty:true
            })
        }
        if(!username){
            this.setState({
                isUserNameFieldEmpty:true
            })
        }
        if(!phone){
            this.setState({
                isPhoneFieldEmpty:true
            })
        }
        if(!password){
            this.setState({
                isPassFieldEmpty:true
            })
        }
        if(!Cpassword){
            this.setState({
                isCpassFieldEmpty:true
            })
        }
    }

    submitForm = async(e)=>{
        e.preventDefault()
        this.validateForm()
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
            alert("please fill all the fields")
        }else{
            alert('Registration Successful') 
            history.push('/')
        }
    }

    render(){
        const {name,
            username,
            phone,
            password,
            Cpassword,
            isNameFieldEmpty,
            isUserNameFieldEmpty,
            isPhoneFieldEmpty,
            isPassFieldEmpty,
            isCpassFieldEmpty} =this.state

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
                     {isNameFieldEmpty && <p className="err-msg">*Required</p>}
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
                     {isUserNameFieldEmpty && <p className="err-msg">*Required</p>}
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
                     {isPhoneFieldEmpty && <p className="err-msg">*Required</p>}
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
                     {isPassFieldEmpty && <p className="err-msg">*Required</p>}
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
                     {isCpassFieldEmpty && <p className="err-msg">*Required</p>}
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