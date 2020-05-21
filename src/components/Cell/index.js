import React from 'react';

import './index.css';



const Cell = (props) => {
  //console.log(props)
  return (
    <div className={props.class} id={props.id} onClick={e => props.handleClick(e, props.id, props.class)} onKeyDown={event => props.keyPressDown(event)} role="button" tabIndex="0">
        {/*props.id*/}
    </div>
  );
};

export default Cell;
