import React from 'react';
import PropTypes from 'prop-types';
var api = require('../utils/api');

//built "Food" before realizing there's no API
//for what I want to do
//and switching to a cannabis focus
//will go back and rename everything
//after I figure out just what
//I want this app to be.


function SelectFood (props) {
  var foods = ['fibromyalgia', 'stress', 'glaucoma', 'epilepsy'];
  return (
    <ul className='foods'>
      {foods.map(function(food){
        return (
          <li
            style={food === props.selectedFood ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null,food)}
            key={food}>
            {food}
          </li>
        )
      })}
    </ul>
  )
}

SelectFood.propTypes = {
  selectedFood: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

class Score extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedFood: 'fibromyalgia',
      studies: null
    };
    this.updateFood = this.updateFood.bind(this);
  }
  componentDidMount(){
    this.updateFood(this.state.selectedFood)
  }
  updateFood(food) {
    this.setState(function(){
      return {
        selectedFood: food,
        studies: null
      }
    });
    console.log(food)
    api.fetchMatchingFoods(food)
      .then(function(studies){
        console.log(studies)
        this.setState(function(){
          return {
            studies: studies
          }
        })
      }.bind(this));  
  }

  render(){
    return (
      <div>
        <SelectFood 
          selectedFood={this.state.selectedFood}
          onSelect={this.updateFood} />
      </div>
    )
  }
}

export default Score