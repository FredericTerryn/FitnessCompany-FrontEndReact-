import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';

class Trainingslist extends Component {
    
    constructor(params) {
        super(params);
        this.state = { trainings: [] };
        
        this.state = { showSnack: false};
    }

    componentDidMount() {
       fetch('http://customerrest.herokuapp.com/api/trainings').then(response => response.json())
        .then(responseData => {
            this.setState({trainings: responseData.content });
        });
    }

    handleClose = (event, reason) => {
        this.setState({showSnack:false});
    }



    render() {

    const columns = [
        {
            Header: 'Activity',
            accessor: 'activity'
        },{
        Header: 'Date',
        accessor: 'date',
        Cell:({value}) => (moment(value).format('MMMM Do YYYY, h:mm:ss a'))
    }, {
        Header: 'Duration',
        accessor: 'duration', 
        Cell:({value}) => (value + " min.")
    } ]

        return (
            <div>
                <ReactTable 
                    defaultPageSize={10} 
                    data={this.state.trainings} 
                    columns={columns}
                    />
               <Snackbar open={this.state.showSnack} autoHideDuration={3000} message={'Customer deleted'} onClose={this.handleClose}/>
            </div>
        );
        //interessant om map opnieuw op te frissen

    }
}

export default Trainingslist;

