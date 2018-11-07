import React, { Component } from 'react';
import './App.css';
import Customerslist from './components/Customerslist';
import Trainingslist from './components/TrainingsList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
crossorigin="anonymous"/>

          </head>
        <header className="App-header">
         <h2>Customers</h2>

        </header>
        <Customerslist/>
      </div>
    );
  }
}

export default App;
