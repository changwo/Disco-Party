import React from 'react';

import './App.css';

import Content from './components/Content';



class App extends React.Component {


  render() {

    return (
      <div className="App">
        <h1>Dance Floor!</h1>
        <Content />
        <h2>Click on a box and start your journey!</h2>
      </div>
      
      
    )
  }
}



export default App;
