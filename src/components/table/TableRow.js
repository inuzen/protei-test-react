import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';

const TableRow = ({row}) => {

  const [isShown, setIsShown] = useState(false);
  const hide = (e) =>{
    e.stopPropagation();
    setIsShown(false);
  }
  const show = () => setIsShown(true);

  const {name, city, postTitle, postBody, postComments, commentAmount} = row;


  return (
    <tr>
      <td>{name}</td>
      <td>{city}</td>
      <td className='table__row clickable' onClick={show}>{postTitle}</td>
      {isShown&&<Modal title = {postTitle} body={postBody} comments = {postComments} hide = {hide}/>}
      <td>{commentAmount}</td>
    </tr>
  )
}

TableRow.propTypes = {
  row: PropTypes.object.isRequired
};

export default TableRow;
