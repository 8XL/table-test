import React from 'react';

export const SearchPanel = ({btn, changeForm, value}) => {
    return(
        <div className='input-group mt-2 mb-2'>
             <div className='input-group-prepend'>
                { btn }
            </div>
            <input 
                type='text' 
                className='form-control'
                onChange={ changeForm } 
                value={ value }
            />
        </div>
    );
};