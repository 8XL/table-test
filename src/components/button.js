import React from 'react';

export const Button = ({rows, setData, getFilter, toggleForm, submitUser }) => {
    if(rows){
        return(
            <button className='btn btn-outline-primary btn-lg btn-block' name={ rows } onClick={ setData }>{ rows } rows</button>
        );
    } else if(getFilter) {
        return(
            <button className='btn btn-outline-primary' name='search' form='search' onClick={ getFilter }>Search</button>
        );
    } else if(toggleForm){
        return(
            <button className='btn btn-outline-primary' onClick={ toggleForm }>Create new row</button>
        )
    } else if(submitUser){
        return(
            <input type='submit' form='newUser' className='btn btn-outline-primary' onClick={ submitUser } value='Add new row' />
        )
    };       
};