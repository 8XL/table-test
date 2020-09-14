import React from 'react';

export const Button = ({rows, setData, getFilter}) => {
    if(rows){
        return(
            <button className='btn btn-outline-primary btn-lg btn-block' name={ rows } onClick={ setData }>{ rows } rows</button>
        );
    } else if(getFilter) {
        return(
            <button className='btn btn-outline-primary' name='search' form='search' onClick={ getFilter }>Search</button>
        );
    };    
};