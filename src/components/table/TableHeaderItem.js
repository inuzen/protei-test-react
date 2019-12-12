import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import JsonContext from '../../context/jsonplaceholder/jsonContext';


const TableHeaderItem = ({header}) => {
  const [sortDirection, setSortDirection] = useState(null);

  const jsonContext = useContext(JsonContext);
  const {filterDataByColumn} = jsonContext;
  const {uniqueName, title, isSorted} = header;

  const onClickSort = (e) => {
    e.preventDefault();

    if (sortDirection === null || sortDirection === 'desc')
      setSortDirection('asc');
    else
      setSortDirection('desc');
    filterDataByColumn({sortBy: uniqueName, direction: sortDirection});
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


    </th>)
}

TableHeaderItem.propTypes = {
  header: PropTypes.object.isRequired
};

export default TableHeaderItem;
