import React from 'react';

const Filter = (props) => {
    return (
        <div>find countries: <input 
        value = {props.searchTerm} onChange ={props.handleSearchTermChange}/>
        </div>
    )
}

export default Filter