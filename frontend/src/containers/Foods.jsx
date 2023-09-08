import React, { Fragment, useEffect, useReducer } from 'react';

// apisコンポーネント
import { fetchFoods } from '../apis/foods';

// reducersコンポーネント
import {
  // asを使って、initialStateをfoodsInitialStateという名前で使えるようにする
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer
} from '../reducers/foods';

// constantsコンポーネント
import { REQUEST_STATE } from '../constants';


export const Foods = ({match}) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(match.params.restaurantsId)
      .then((data) =>
        dispatch({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: { foods: data.foods }
        })
      )
      .catch((e) => console.error(e))
  }, [match.params.restaurantsId])

  return (
    <Fragment>
      {
        foodsState.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            <p>ロード中...</p>
          </Fragment>
        :
          foodsState.foodsList.map(food =>
            <div key={food.id}>
              {food.name}
            </div>
          )
      }
    </Fragment>
    )
}