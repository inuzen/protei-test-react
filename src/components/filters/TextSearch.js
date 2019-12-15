import React, {useContext, useRef} from 'react';
import JsonContext from '../../context/jsonplaceholder/jsonContext';

const TextSearch = () => {
  const jsonContext = useContext(JsonContext);
  const {searchTextFilter} = jsonContext;

  const inputRef = useRef(null);

  const onClick = e => e.stopPropagation();

  const onChange = e => {
    searchTextFilter(e.target.value)
  };

  return (
      <div style={searchBoxStyles.inputWrapper}>
        <input ref={inputRef} style={searchBoxStyles.customInput} onChange={onChange} onClick={onClick} type="text"/>
      </div>
  )
}


export default TextSearch;

const searchBoxStyles = {
  inputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  customInput: {
    display: "block",
    padding: ".6em 1.4em .5em .8em",
    marginTop: '5px',
    border: "1px solid #aaa",
    boxShadow: "0 1px 0 1px rgba(0,0,0,.04)",
	  borderRadius: ".5em",
    width: "70%"

}
}
