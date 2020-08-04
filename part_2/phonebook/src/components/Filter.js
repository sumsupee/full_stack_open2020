import React from 'react'

const Filter = (props) => {
    return (
      <div>filter shown with : <input 
        value = {props.searchTerm} onChange ={props.handleSearchTermChange}/>
      </div>
    )
  }
  
export default Filter