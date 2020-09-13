import React from 'react';

export const Arrow = ({sortOrder, sortName, name}) =>{
    let arrow =  sortOrder ==='desc' ? `▲` : `▼`
    return(
        <small>
            {
               sortName === name ? arrow : ''
            }
        </small>
    )
}