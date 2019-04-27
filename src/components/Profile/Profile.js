import React, {Component} from 'react';
import './Profile.css';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age
        }
        
    }
    

    onFormChange = (event) => {
        switch(event.target.name){
            case 'name':
                this.setState({name:event.target.value})
                break;
            case 'age':
                this.setState({age:event.target.value})
                break;
            default:
                return;
        }
    
    }

    onProfileUpdate = (data) =>{
        const token = window.localStorage.getItem('token');
        console.log(this.props.user.id);
        console.log(data);
        fetch(`http://localhost:3000/profile/${this.props.user.id}`,{
            method:'post',
            headers:{'Content-Type':'application/json', 'Authorization':token},
            body: JSON.stringify({formInput:data})
        }).then(resp=>{
            if(resp.status===200 || resp.status===304){
                this.props.toggleModal();
                this.props.loadUser({...this.props.user, ...data});
            }
        }).catch(error =>{console.log(error)});
    }
    render(){
        console.log(this.props);
        const {user} = this.props;
        const {isProfileOpen, toggleModal} = this.props;
        const {name, age} = this.state;
        return (
            <div 
            className='profile-modal'
            >
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                <img
                    src="http://tachyons.io/img/logo.jpg"
                    className="br-100 ba h3 w3 dib" alt="avatar"/>
                <h1>{this.state.name}</h1>
                <h4>Images Submitted: 5</h4>
                <p>Member since: January</p>
                <hr/>
        
                
                <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                <input
                    onChange={this.onFormChange}
                    className="pa2 w-100 ba"
                    placeholder={user.name}
                    type="text"
                    name="name"
                    id="name" 
                />
                
                
                <label className="mt2 fw6" htmlFor="user-age">Age:</label>
                <input
                    onChange={this.onFormChange}
                    className="pa2 ba w-100"
                    placeholder="56"
                    type="text"
                    name="age"
                    id="age" 
                />
            
            <div className='mt4' style={{display:'flex',justifyContent:'space-evenly'}}>
                <button 
                className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
                onClick = {()=>this.onProfileUpdate({name, age})}
                >Save</button>
                <button 
                className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                onClick={toggleModal}
                >Cancel</button>
            </div>
            </main>
            <div className='modal-close' onClick={toggleModal}>&times;</div>
        </article>
            </div>
        )
    }   
}

export default Profile;