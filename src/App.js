import React, { Component } from 'react';
import './App.css';
import update from 'immutability-helper';
import math from 'mathjs';
import Screen from './Screen';
import Buttons from './Buttons';
import Button from './Button';

class App extends Component {
  constructor(){
    super()
    this.state = {calculation: []}
  }

  calculate = () => {
    let result = this.state.calculation.join('')
    if (result) {
      result = math.eval(result)
      result = math.format(result, {precision: 14})
      result = String(result)
      this.setState({
        calculation: [result],
      })
    }
  }

  handleClick = e => {
    const value = e.target.getAttribute('data-value')
    switch(value) {
      case 'clear':
        this.setState({
          calculation: [],
        })
        break
      case 'equal':
        this.calculate()
        break
      default:
        const newOperations = update(this.state.calculation, {
          $push: [value],
        })
        this.setState({
          calculation: newOperations,
        })
        break
    }
  }

  render() {
    return (
      <div className="App">
        <Screen input={this.state.calculation} />
        <Buttons>
          <Button onClick={this.handleClick} label="C" value="clear" />
          <Button onClick={this.handleClick} label="7" value="7" />
          <Button onClick={this.handleClick} label="4" value="4" />
          <Button onClick={this.handleClick} label="1" value="1" />
          <Button onClick={this.handleClick} label="0" value="0" />

          <Button onClick={this.handleClick} label="/" value="/" />
          <Button onClick={this.handleClick} label="8" value="8" />
          <Button onClick={this.handleClick} label="5" value="5" />
          <Button onClick={this.handleClick} label="2" value="2" />
          <Button onClick={this.handleClick} label="." value="." />

          <Button onClick={this.handleClick} label="x" value="*" />
          <Button onClick={this.handleClick} label="9" value="9" />
          <Button onClick={this.handleClick} label="6" value="6" />
          <Button onClick={this.handleClick} label="3" value="3" />
          <Button label="" value="null" />

          <Button onClick={this.handleClick} label="-" value="-" />
          <Button onClick={this.handleClick} label="+" size="2" value="+" />
          <Button onClick={this.handleClick} label="=" size="2" value="equal" />
        </Buttons>
      </div>
    );
  }
}

export default App;
