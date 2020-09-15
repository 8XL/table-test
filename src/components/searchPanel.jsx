import React from 'react';

export const SearchPanel = ({btn, changeForm, value}) => {
    return(
        <div className='input-group mt-2 mb-2'>
             <div className='input-group-prepend'>
                { btn }
            </div>
            <form 
                id='search'
                name='search'
                onChange={ changeForm } 
            >
                <input 
                    type='text' 
                    form='search'
                    name='search'
                    className='form-control'
                    value={ value }
                />
            </form>
            
        </div>
    );
};