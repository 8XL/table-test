import React from 'react';

export const UserDetails = ({ user }) => {
    return (
        <div id='user' className='card'>
            <p className='card-titile'>Выбран пользователь <b>{ user.firstName + ' ' + user.lastName }</b> </p>
            <p>Описание: <br />
                <textarea style={{width:'50%'}} defaultValue={ user.description } />
            </p>
            <p>Адрес проживания: <b>{ user.address.streetAddress }</b> </p>
            <p>Город: <b>{ user.address.city }</b> </p>
            <p>Провинция/штат: <b>{ user.address.state }</b> </p>
            <p>Индекс: <b>{ user.address.zip }</b> </p>
        </div>
    );
};