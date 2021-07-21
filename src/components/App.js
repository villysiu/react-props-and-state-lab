import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (event) => {
   // console.log(event.target.value)
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }
  findPets = () => {
    //console.log(this.state.filters.type)
    let type=this.state.filters.type
    let url = (type === 'all') ? '/api/pets' : `/api/pets?type=${type}`
    
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({pets: data}))
   
  }
  adoptPet = (id) => {
 
    let adoptedPet = this.state.pets.find((pet) => pet.id === id )
    adoptedPet.isAdopted = true
          
    this.setState({pets: this.state.pets})
  }
  
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.findPets} />
              
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
