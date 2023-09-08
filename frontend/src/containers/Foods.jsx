import React, { Fragment, useEffect } from 'react';

// apisコンポーネント
import { fetchFoods } from '../apis/foods';

export const Foods = (props) => {

  useEffect(() => {
    fetchFoods(props.match.params.restaurantsId)
      .then((data) =>
        console.log(data)
      )
  }, [])

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