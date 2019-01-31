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
    this.state = {
      calculation: [],
      result: 0,
    }
  }

  calculate = () => {
    let answer = this.state.calculation.join('')
    if (answer && this.state.result === 0) {
      answer = math.eval(answer)
      answer = math.format(answer, {precision: 14})
      answer = String(answer)
      this.setState({
        result: answer,
        calculation: [],
      })
    } else if (answer && this.state.result !== 0){
      answer = String(this.state.result) + answer
      answer = math.eval(answer)
      answer = math.format(answer, {precision: 14})
      answer = String(answer)
      this.setState({
        result: answer,
        calculation: [],
      })
    }
  }

  handleClick = e => {
    const value = e.target.getAttribute('data-value')
    const current = this.state.calculation
    const result = this.state.result
    let typr = null
    
    const errorMessage = document.getElementById('error')

    try {
      typr = math.eval(value)
      console.log('eval: ' + typr)
    } catch {
      console.log('eval failed')
    }
    const typrOf = typeof(typr)
    
    switch(value) {
      case 'clear':
        this.setState({
          calculation: [],
        })
        break
      case 'clearall':
        this.setState({
          calculation: [],
          result: 0
        })
        break
      case 'equal':
        this.calculate()
        break
      case '/':
      case '*':
      case '+':
      case '-':
      case '.':
        if(
          current[current.length - 1] === '/' ||
          current[current.length - 1] === '*' ||
          current[current.length - 1] === '+' ||
          current[current.length - 1] === '-' ||
          current[current.length - 1] === '.'
        ){
          errorMessage.innerHTML = "ERR: only numbers can be input after an operator/decimal"
        } else if (result !== 0 && value === '.'){
          errorMessage.innerHTML = "ERR: only operators can continue this calculation"
        } else {
          const newOperations = update(current, {
            $push: [value],
          })
          this.setState({
            calculation: newOperations,
          })
        }
        break
      default:
        if (result === 0){
          const newOperations = update(current, {
            $push: [value],
          })
          this.setState({
            calculation: newOperations,
          })
          errorMessage.innerHTML = ""
        } else if (result !== 0 && typrOf === 'number' && current.length===0){
          errorMessage.innerHTML = "ERR: only operators can continue this calculation"
        }  else {
          const newOperations = update(current, {
            $push: [value],
          })
          this.setState({
            calculation: newOperations,
          })
        }
        break
    }
  }

  render() {
    return (
      <div className="App">
        React Calculator
        <marquee behavior="scroll" direction="left"id="error"></marquee>
        <p class="result">{this.state.result}</p>
        <Screen input={this.state.calculation} />
        <Buttons>
          <Button onClick={this.handleClick} label="C" value="clear" />
          <Button onClick={this.handleClick} label="7" value="7" />
          <Button onClick={this.handleClick} label="4" value="4" />
          <Button onClick={this.handleClick} label="1" value="1" />
          <Button onClick={this.handleClick} label="0" value="0" />

          <Button onClick={this.handleClick} label="ce" value="clearall" />
          <Button onClick={this.handleClick} label="8" value="8" />
          <Button onClick={this.handleClick} label="5" value="5" />
          <Button onClick={this.handleClick} label="2" value="2" />
          <Button onClick={this.handleClick} label="." value="." />

          <Button onClick={this.handleClick} label="/" value="/" />
          <Button onClick={this.handleClick} label="9" value="9" />
          <Button onClick={this.handleClick} label="6" value="6" />
          <Button onClick={this.handleClick} label="3" value="3" />
          <Button onClick={this.handleClick} label="=" value="equal" />

          <Button onClick={this.handleClick} label="x" value="*" />
          <Button onClick={this.handleClick} label="-" size="2" value="-" />
          <Button onClick={this.handleClick} label="+" size="2" value="+" />
        </Buttons>
      </div>
    );
  }
}

export default App;
