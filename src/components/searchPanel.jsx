import React from 'react';

export const SearchPanel = ({btn, changeForm, value, children}) => {
    return(
        <div className='input-group mt-2 mb-2'>
             <div className='input-group-prepend'>
                { children }
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