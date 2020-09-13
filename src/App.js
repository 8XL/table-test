import React from 'react';
import ReactPaginate from 'react-paginate';

import './App.css';

import { fetchUsers } from './api/fetchData';
import reducer from './reducer';

import { Table, UserDetails, Button, SearchPanel } from './components';

function App() {
  const [state, dispatch] = React.useReducer(reducer,{
    data: null,
    fullData: null,
    filteredData: null,

    sortOrder: 'asc', 
    sortName: null,

    clickedUser: null,

    pagination: false,
    rowsCount: 50,
    pageCount: null,
    page: 1,

    form: null,
    search: false
  })

  const setData = async (e) =>{
    console.log(e.target.name)
    const data = await fetchUsers(e.target.name);
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  };

  const sortData = (e) =>{
    dispatch({
      type: 'SORT_DATA',
      payload: e.target.id
    })
  };

  const setUserInfo = (user) =>{
    dispatch({
      type: 'SET_USER',
      payload: user
    })
  };

  const setPage = ({ selected }) =>{
    dispatch({
      type: 'SET_PAGE',
      payload: selected+1
    });
  };

  const changeForm = (e) =>{
    dispatch({
      type: 'SET_FORM',
      payload: e.target.value
    })
  };

  const getFilter = () => {
    dispatch({
      type: 'SEARCH_FILTER'
    })
  }

  const filteredData = () =>{
    if(!state.search)return state.data;

    const mask = new RegExp(state.form, 'ig'); 
    const filteredData = state.data.filter(user=>{
      return (
        user['firstName'].search(mask)>=0
        ||user['lastName'].search(mask)>=0
        ||user['email'].search(mask)>=0
        ||user['phone'].search(mask)>=0
      );
    });
    return filteredData
  };
  
  return (
    <div className="App">
      <Button 
        rows={32} 
        setData={ setData }
      />
      <Button 
        rows={1000} 
        setData={ setData }
      />
      
      {
        state.data 
        ? <Table 
            { ...state }
            filteredData = { filteredData }
            sortData={ sortData }
            setUser={ setUserInfo }
            searchPanel={
              <SearchPanel 
                { ...state }
                btn={ <Button getFilter={ getFilter } form={ state.form } /> } 
                changeForm={ changeForm } 
                value={ state.form }
              />}
          />
        : <div>Пагади</div>
      }
      {
        state.pagination 
        &&<ReactPaginate // https://github.com/AdeleD/react-paginate/blob/master/demo/js/demo.js
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={ state.pageCount }
          forcePage={ state.page-1 }
          onPageChange ={ setPage }
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          activeClassName={'active'}
          previousClassName={'page-link'}
          nextClassName={'page-link'}
        />
      }
      {state.clickedUser && <UserDetails user={ state.clickedUser } />}
    </div>
  );
}

export default App;
