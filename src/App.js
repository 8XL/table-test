import React from 'react';
import ReactPaginate from 'react-paginate';

import './App.css';

import { fetchUsers } from './api/fetchData';
import reducer from './reducer';

import { Table, UserDetails, Button, SearchPanel, Loader } from './components';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    data: null,
    fullData: null,
    filteredData: null,

    loading: false,

    sortOrder: 'asc', 
    sortName: null,

    clickedUser: null,

    pagination: false,
    rowsCount: 50,
    pageCount: null,
    page: 1,

    form: null,
    search: false
  });

  const toggleLoading = () =>{ //переключатель рендера анимации загрузки
    dispatch({
      type: 'TOGGLE_LOADING'
    })
  }

  const setData = async (e) =>{ // загрузка данных со стороннего апи
    !state.data&&toggleLoading();
    const data = await fetchUsers(e.target.name);
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  };

  const sortData = (e) =>{ // сортировка таблицы по наименованию столбоцов
    dispatch({
      type: 'SORT_DATA',
      payload: e.target.id
    })
  };

  const setUserInfo = (user) =>{ // карточка юзера
    dispatch({
      type: 'SET_USER',
      payload: user
    })
  };

  const setPage = ({ selected }) =>{ // привязка к пагинации
    dispatch({
      type: 'SET_PAGE',
      payload: selected+1
    })
  };

  const changeForm = (e) =>{ // изменение инпута поиска
    dispatch({
      type: 'SET_FORM',
      payload: e.target.value
    })
  };

  const getFilter = () => { // активация поиска
    dispatch({
      type: 'SEARCH_FILTER'
    })
  };

  //фильтрация в случае активации поиска
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
      
      {(!state.data && !state.loading) // после выбора количества элементов кнопки убираются для избежания ошибок ста тысяч запросов к апи
        &&<>
            <Button 
              rows={32} 
              setData={ setData }
            />
            <Button 
              rows={1000} 
              setData={ setData }
            />
          </>
      }
      {
        (!state.loading&&state.data) // условный рендер таблицы или загрузчика
        ? <>
            <SearchPanel 
              { ...state }
              btn={ 
                <Button getFilter={ getFilter } form={ state.form } /> 
              } 
              changeForm={ changeForm } 
              value={ state.form }
            />
            <Table 
              { ...state }
              filteredData = { filteredData }
              sortData={ sortData }
              setUser={ setUserInfo }
              toggleLoading = { toggleLoading }
            />
          </>
        :(state.loading)
        ?<Loader />
        : ''
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
      {
        state.clickedUser // если пользователь выбран - рендер карточки
        && <UserDetails user={ state.clickedUser } />
      }
    </div>
  );
}

export default App;
