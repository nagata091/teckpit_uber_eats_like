import React, { Fragment } from 'react';


export const Foods = (props) => {
  return (
    <Fragment>
      フード一覧
      <p>
        {/* 親コンポーネント(App.js)から渡されたprops.matchの中から、レストランIDを取り出す */}
        レストランIDは { props.match.params.restaurantsId } です
      </p>
    </Fragment>
    )
}