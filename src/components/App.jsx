import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
 import {addReminder,deleteReminder,clearAllReminder} from '../actions'

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            dueDate:''
        }
    }
    addReminder(){
        if(this.state.text && this.state.dueDate){
        this.props.addReminder(this.state.text,this.state.dueDate);
        }
        else alert('please enter reminder and date')
    }
    clearAllReminder(){
        this.props.clearAllReminder();
    }
    deleteReminder(id){
        this.props.deleteReminder(id);  
    }
    renderReminders(){
        const {reminders} = this.props;
        return(
            <ul className="list-group col-sm-4"> 
                {
                    reminders.map(reminder =>{
                        return(
                            <li  className="list-group-item"key={reminder.id }>
                                <div className="list-item">
                                    <div>
                                    <div>{reminder.text}</div>
                                    <div className="list-item date-item"><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                    </div>
                                
                                </div>
                                <div className="list-item delete-button" onClick={()=> this.deleteReminder(reminder.id)}>&#x2715;
                                </div>

                                </li>
                        )
                    })
                }
                
            </ul>
        )
    }
    render(){                
        return(
            <div className="App">
                <div className="App-title">Reminder pro</div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input className="form-control" placeholder="I have to..." onChange={event=>this.setState({text:event.target.value})}/>
                        <input className="form-control" type="datetime-local" onChange={event=>this.setState({dueDate:event.target.value})}/>
                    </div>
                    <button className="btn btn-success" onClick={()=> this.addReminder()}>Add Reminder</button>
                </div>
                {this.renderReminders()}
                <button className="btn btn-danger " onClick={()=> this.clearAllReminder()}>Clear all reminders</button>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({addReminder},dispatch);
// }
// export default connect(null,mapDispatchToProps)(App); 
function mapStateToProps(state){
    return {
        reminders:state
    }
    
}
export default connect(mapStateToProps,{addReminder,deleteReminder,clearAllReminder})(App); 