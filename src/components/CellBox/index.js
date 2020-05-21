import React from 'react';

import Cell from '../Cell';
import './index.css';

class CellBox extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            items: this.createCells(),
            clicked: false,
            currentBoxID: 0
        }

       
    }
    
    componentDidMount = () => { // This is the random color changer, can be called from here
         this.changeInterval();
    }

    handleClick = (e, id, className) => {
        console.log(`e: ${e}, id: ${id}, class: ${className}`);
        if(this.state.clicked === false) {
            this.setState({clicked: true, currentBoxID: id, items: this.changeSingleProperty("class", "player", id )})            
        }
        console.log(`current selected box is ${this.state.currentBoxID}`)
    }

    changeSingleProperty = (key, value, id) => {
        const newItems = [...this.state.items].map(item => {
            if (item.id === id ) {
                const newItem = {...item};
                newItem[key] = value
                return newItem;
            }
            return item
        })
        return newItems
    }

    changeColors = (id) => {
        const newItems = [...this.state.items].map(item =>{ 
            if(item.id === id) {
                const newItem = {...item};
                newItem.class = `player`
                return newItem;
            } else if (item.id !== id){
                const newItem = {...item};
                newItem.class = `cell ${this.randomState()}`
                return newItem;
            }
            return item
            
        })
        return newItems
    }

    changeTwoProperties = (key, value1, value2, ID1, ID2) => {
        const newItems = [...this.state.items].map(item => {
            if (item.id === ID1 ) {
                const newItem = {...item};
                newItem[key] = value1
                return newItem;
            }
            if (item.id === ID2 ) {
                const newItem = {...item};
                newItem[key] = value2
                return newItem;
            }
            return item
        })
        return newItems
    }
    
    movePlus = (direction) => {
        this.setState({items: this.changeTwoProperties("class", "cell not-active", "player", `${this.state.currentBoxID}`, `${this.state.currentBoxID+direction}`), currentBoxID: this.state.currentBoxID+direction})
    }
    moveMinus = (direction) => {
        this.setState({items: this.changeTwoProperties("class", "cell not-active", "player", `${this.state.currentBoxID}`, `${this.state.currentBoxID-direction}`), currentBoxID: this.state.currentBoxID-direction})
    }

    keyPressDown = (event) => {
        if (event.keyCode === 87) {
            console.log(`you pressed W`)
            if (this.state.currentBoxID === 1 || this.state.currentBoxID === 2 || this.state.currentBoxID === 3 || this.state.currentBoxID === 4 || this.state.currentBoxID === 5) {
                this.movePlus(20)
            } else {
                this.moveMinus(5)
            }
        } else if (event.keyCode === 83) {
            console.log(`you pressed S`)
            if (this.state.currentBoxID === 21 || this.state.currentBoxID === 22 || this.state.currentBoxID === 23 || this.state.currentBoxID === 24 || this.state.currentBoxID === 25) {
                this.moveMinus(20)
            } else {
                this.movePlus(5)
            }
        } 
        
        else if (event.keyCode === 65) {
            console.log(`you pressed A`)
            if (this.state.currentBoxID === 21 || this.state.currentBoxID === 16 || this.state.currentBoxID === 11 || this.state.currentBoxID === 6 || this.state.currentBoxID === 1) {
                this.movePlus(4)
            } else {
                this.moveMinus(1)
            }
        } 
        
        else if (event.keyCode === 68) {
            console.log(`you pressed D`)
            if (this.state.currentBoxID === 25 || this.state.currentBoxID === 20 || this.state.currentBoxID === 15 || this.state.currentBoxID === 10 || this.state.currentBoxID === 5) {
                this.moveMinus(4)
            } else {
                this.movePlus(1)
            }

            
        }
    }

    changeInterval = () => {
         setInterval(() => {
             this.setState({items: this.changeColors(`${this.state.currentBoxID}`)})
        }, 500);
    }


    
    createCells = () => {
        const cells = [];
        for (let i = 1 ; i <= 25 ; i++) {
          cells.push({id : `${i}`, class: `cell not-active`})
        }
        return cells
    }
    
    randomState = () => {
        return (Math.random() > 0.5) ? "active" : "not-active"
    }
    
    render() {
    
    return (
    
      <div className="CellBox-Container" >
        
        {this.state.items.map((item) => {
          return <Cell key={item.id} class={item.class} id={item.id} handleClick={this.handleClick} keyPressDown={this.keyPressDown} />;
        })}

        
      </div>
    );
  }
}

export default CellBox;
