import React, {useEffect, useContext} from 'react';
import TableRow from './TableRow';
import TableHeaderItem from './TableHeaderItem';
import JsonContext from '../../context/jsonplaceholder/jsonContext';
import Spinner from '../spinner/Spinner';



const Table = (props) => {

  const jsonContext = useContext(JsonContext);
  const {data, getData, loading, headers} = jsonContext;

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  },[])


if (loading||data===null) {
  return <Spinner/>
}

  return (
  <table className='table'>
    <thead className='table__header'>
      <tr>
        {headers&& headers.map((header,i)=> <TableHeaderItem key={i} header={header}/>)}
      </tr>
    </thead>
      <tbody>
        {
          data&& data.map((row,i) => <TableRow key={i} row={row}/> )
        }
      </tbody>
  </table>)
}

export default Table;
