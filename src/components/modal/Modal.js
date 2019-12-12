import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {

  useEffect(() => {
       document.body.style.overflow = 'hidden';
       return ()=> document.body.style.overflow = 'unset';
    }, []);

  const {title, body, comments, hide} = props;

    console.log(title);
    console.log(body);
    console.log(comments);
    console.log(hide);

  return (ReactDOM.createPortal(<div onClick={hide} className='modal'>
    <div className='modal__content-wrapper'>
      <span className='modal-close' onClick={hide}>✖</span>

      <div className='header-container'>
          <h3 className='post-header'>{title}</h3>
          <p className='post-content'>{body}</p>
      </div>

      <div className='comment-section-container'>
        <h4 className='comment-section-header'>Comments:</h4>
        {comments&& comments.map(comment => {
          return (
            <div key={comment.id} className='comment-item'>
              <div className='comment-header'>
                <span className='comment-title'>{comment.name}</span>
                <span className='comment-email'>{comment.email}</span>
              </div>
              <div className='comment-body-wrapper'>
                <span className='comment-body'>{comment.body}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>

  </div>, document.getElementById('modal')));
}

export default Modal;
