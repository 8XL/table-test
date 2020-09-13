import _ from 'lodash';

export default (state, action) => {
    let data, view;
    // вынес метод пагинации отдельно, ввиду неоднократного использования.
    const pagination = (data, page) =>{
        const startIndex = (page*state.rowsCount-state.rowsCount);
        const lastIndex = state.rowsCount*page - 1;
        const viewData = data.slice(startIndex, lastIndex);
        return viewData
    };
    // вынес метод сортировки для чистоты
    const sort = (id) =>{
        const sortName = id;
        let sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'; 
        data = state.fullData ? state.fullData.concat() : state.data.concat();
        const sortedData = _.orderBy(data, sortName, sortOrder);
        return {sortedData, sortOrder}
    };

    const counter = (data) => {
        const pageCount = data.length/state.rowsCount;
        return pageCount
    };

    switch (action.type){
        case 'SET_DATA':
            data = action.payload;
            // если массив содержит более 50 элементов(по условию задачи пагинация по 50 элементов), то отрисовываем пагинацию
            if(data.length<=50){
                return({
                    ...state,
                    data: data,
                    pagination: false,
                });
            } else {
                view = pagination(data, state.page);
                const pageCount = counter(data);
                return({
                    ...state,
                    data: view,
                    fullData: data,
                    pagination: true,
                    pageCount: pageCount,
                });
            };

        case 'SORT_DATA':
            // сортировка списка по id колонки шапки таблицы
            const { sortedData, sortOrder } = sort(action.payload);
            if(sortedData.length<=50){
                return({
                    ...state,
                    data: sortedData,
                    sortOrder: sortOrder,
                    sortName: action.payload
                });
            } else {
                view = pagination(sortedData, state.page);
                return({
                    ...state,
                    data: view,
                    fullData: sortedData,
                    sortOrder: sortOrder,
                    sortName: action.payload
                });
            };

        case 'SET_USER':
            // информация о пользователе в карточке
            return({
                ...state,
                clickedUser: action.payload,
            });
        
        case 'SET_PAGE':
            // связка клика по номеру страницы и отрисовки списка
            view = pagination(state.fullData, action.payload);
            return({
                ...state,
                page: action.payload,
                data: view,
            });
        
        case 'SET_FORM':
            return({
                ...state,
                form: action.payload,
            });

        case 'SEARCH_FILTER':
            if(state.form.length>0){
                return({
                    ...state,
                    search: true
                })
            } else {
                return({
                    ...state,
                    search: false
                })
            };

        default: 
            return state;
    };
};