import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import JsonContext from '../../context/jsonplaceholder/jsonContext';
import Select from '../filters/Select';
import TextSearch from '../filters/TextSearch';

const TableHeaderItem = ({header}) => {

  const [sortDirection, setSortDirection] = useState(null);
  const [uniqueValues, setUniqueValues] = useState(null);

  const jsonContext = useContext(JsonContext);
  const {data, sortDataByColumn} = jsonContext;
  const {uniqueName, title, isSorted, filter} = header;

  const getUniqueValues = () =>{
    return [...new Set(data.map(obj => obj[uniqueName]))].sort( (a,b)=> a > b ? 1 : -1);
  }

  useEffect(() => {
    setUniqueValues(getUniqueValues);

    //eslint-disable-next-line
  }, []);

  const onClickSort = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (sortDirection === null || sortDirection === 'desc')
      setSortDirection('asc');
    else
      setSortDirection('desc');
    sortDataByColumn({sortBy: uniqueName, direction: sortDirection});
  }

  const itemClassName = isSorted
    ? 'table__header-item selected'
    : 'table__header-item';

    return (<th className={itemClassName} onClick={onClickSort}>

      <div className="arrow-wrapper">
      <span>{title}</span>
        <span className={!isSorted
          ? 'arrow'
          : sortDirection === 'asc'
            ? 'arrow arrow-up'
            : 'arrow arrow-down'}>
          </span>
        </div>
        {
          filter && filter.type === 'select'? <Select data = {uniqueValues} uniqueName={uniqueName}/> :
                    filter.type === 'search' ? <TextSearch /> : ''
        }
    </th>)
}

TableHeaderItem.propTypes = {
  header: PropTypes.object.isRequired
};

export default TableHeaderItem;
