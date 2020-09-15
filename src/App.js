import React from 'react';
import ReactPaginate from 'react-paginate';

import './App.css';

import { fetchUsers } from './api/fetchData';
import reducer from './reducer';

import { Table, UserDetails, Button, SearchPanel, Loader, AddUser } from './components';

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

    search: false,

    viewForm: false,
    viewSubmit: false
  });

  const [form, setForm] = React.useState({ // отдельно вынес стэйт под все формы
    search: '',
    newUser: {
      id: '',
      firstName: '',
      lastName: '',
      phone:'',
      email: '',
    }
  })
  
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

  React.useEffect(()=>{ // рендер кнопки сабмита нового юзера в список
    if(
      form.newUser.id
      &&form.newUser.firstName
      &&form.newUser.lastName
      &&form.newUser.phone
      &&form.newUser.email
      ){
        dispatch({
          type: 'SUBMIT_VIEW'
        })
      }
  },[form])
    
  const changeForm = (e) =>{ // изменение форм поиска и новой строки
    const name = e.target.name;
    const value = e.target.value;
    const formId = e.target.form.name;
    
    setForm(form=>({
      ...form,
      [formId]:{
        ...form[formId],
        [name]: value
      }
    }));
  };

  const getFilter = (e) => { // активация поиска
    e.preventDefault();
    dispatch({
      type: 'SEARCH_FILTER',
      payload: form.search.search
    })
  };

  const toggleForm = () => { // рендер формы добавления нового юзера
    dispatch({
      type:'FORM_VIEW'
    })
  };

  const submitUser = (e) =>{ // добавление нового юзера в начало таблицы
    e.preventDefault();
    dispatch({
      type: 'SET_NEW_USER',
      payload: form.newUser
    })
    setForm(form=>({
      ...form,
      newUser: {
        id: '',
        firstName: '',
        lastName: '',
        phone:'',
        email: ''
      }
    }))
  }

  //фильтрация в случае активации поиска
  const filteredData = () =>{
    if(!state.search)return state.data;

    const mask = new RegExp(form.search.search, 'ig'); 
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
      
      {
        (!state.data && !state.loading) // после выбора количества элементов кнопки убираются для избежания ошибок ста тысяч запросов к апи
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
            <AddUser 
              {...state}
              form={form.newUser}
              changeForm={ changeForm }
              toggler={ <Button toggleForm={ toggleForm } /> }
              submitter={ <Button submitUser={ submitUser } />  }
            />
            <SearchPanel 
              { ...state }
              changeForm={ changeForm } 
              value={ form.search.search }
            >
              <Button getFilter={ getFilter } /> 
            </SearchPanel>
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
