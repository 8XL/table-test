import React from 'react';

export const AddUser = ({ viewForm, viewSubmit, submitUser, changeForm, toggler, submitter, form }) => {
    if(viewForm){
        return (
            <form 
                id='newUser'
                name='newUser'
                onChange={ changeForm }
                onSubmit={ submitUser }
            >
                <table className='table table-hover'>
                        <tbody>
                            <tr>
                                <th><input type='text' form='newUser' name='id' placeholder='id' value={form.id} required /></th>
                                <th><input type='text' form='newUser' name='firstName' placeholder='First name' value={form.firstName} required/></th>
                                <th><input type='text' form='newUser' name='lastName' placeholder='Last name' value={form.lastName} required /></th>
                                <th><input type='text' form='newUser' name='email' placeholder='Email' value={form.email} required /></th>
                                <th><input type='text' form='newUser' name='phone' placeholder='Phone' value={form.phone} required /></th>
                            </tr>
                        </tbody>
                </table>
                { viewSubmit && submitter }
            </form>
        )
    } else {
        return(
            <>
                { toggler }
            </>
        )
    }
}