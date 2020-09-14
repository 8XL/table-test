import React from 'react';

import { Arrow } from './arrow';

export const Table = ({ data, sortData, setUser, filteredData, sortOrder, sortName }) => {
    return( 
        <>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th id='id' onClick={ sortData }>ID <Arrow name={'id'} sortName={sortName} sortOrder={sortOrder} /></th>
                        <th id='firstName' onClick={ sortData }>First Name <Arrow name={'firstName'} sortName={sortName} sortOrder={sortOrder} /></th>
                        <th id='lastName' onClick={ sortData }>Last Name <Arrow name={'lastName'} sortName={sortName} sortOrder={sortOrder} /></th>
                        <th id='email' onClick={ sortData }>E-mail <Arrow name={'email'} sortName={sortName} sortOrder={sortOrder} /></th>
                        <th id='phone' onClick={ sortData }>Phone <Arrow name={'phone'} sortName={sortName} sortOrder={sortOrder} /></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && filteredData().map(user =>(  
                            <tr key={user.id+user.phone} onClick={ ()=> setUser(user) }>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}