import React, { Component } from 'react';
import './../App.js';
import SkyLight from 'react-skylight';
import moment from 'moment';
import { Button } from 'react-bootstrap';


class AddTraining extends Component {

    constructor(props) {
        super(props);
        this.state= {activity: '', date: moment().format("YYYY-MM-DDTHH:mm"), duration: '', customer: this.props.customer};
    }

    handleChange = (event) => {
        this.setState(
          {[event.target.name]: event.target.value}
        );
     }

     handleSubmit = (event) => {
      event.preventDefault();
      let newTraining = {date: moment(this.state.date).format("YYYY-MM-DDTHH:mm:ss.sss+0200"), duration: this.state.duration, activity: this.state.activity, customer: this.state.customer};
      this.props.addTraining(newTraining);
      this.props.listTrainings();
      this.refs.addDialog.hide();
  }

    render() {
        return (
            <div>
               <SkyLight hideOnOverlayClicked ref="addDialog">
          <h3>New training</h3>
          <form>
            <input type="text" placeholder="Activity" name="activity" 
              onChange={this.handleChange}/><br/> 
            <input type="text" placeholder="Date" name="date" 
              onChange={this.handleChange}/><br/>
            <input type="text" placeholder="Duration" name="duration" 
              onChange={this.handleChange}/><br/>
            <button onClick={this.handleSubmit}>Save</button>
            <button onClick={this.cancelSubmit}>Cancel</button>     
          </form> 
          </SkyLight>
        <div>
            <Button style={{'margin': '10px'}} 
              onClick={() => this.refs.addDialog.show()}>New Training</Button>
        </div>
      </div> 
    );
    }
}
export default AddTraining;