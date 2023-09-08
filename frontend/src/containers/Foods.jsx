import React, { Fragment, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
import { COLORS } from '../style_constants'; 

// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import { Skeleton } from '@material-ui/lab';
import { FoodModal } from '../components/FoodModal';

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';


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
  }, [match.params.restaurantsId]);

  const initialState = {
    isOpenModal: false,
    selectedFood: null,
    selectedFoodCount: 1
  };

  const [state, setState] = useState(initialState);

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {
          foodsState.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              {
                [...Array(12).keys()].map(i =>
                  <ItemWrapper key={i}>
                    <Skeleton key={i} variant="rect" width={450} height={180} />
                  </ItemWrapper>
                )
              }
            </Fragment>
          :
            foodsState.foodsList.map(food =>
              <ItemWrapper key={food.id}>
                <FoodWrapper
                  food={food}
                  // フードをクリック時にsetStateでisOpenModalをtrueにする
                  onClickFoodWrapper={(food) => setState({
                    ...state,
                    isOpenModal: true,
                    selectedFood: food
                  })}
                  imageUrl={FoodImage}
                />
              </ItemWrapper>
            )
        }
      </FoodsList>
      {/* フードをクリックした時に表示するモーダル */}
      {  // state.isOpenModalがtrueの時に&&の後を実行する
        state.isOpenModal &&
        <FoodModal
          food={state.selectedFood}
          isOpen={state.isOpenModal}
          // モーダルを閉じる時にsetStateでisOpenModalをfalseにする
          onClose={() => setState({
            ...state,
            isOpenModal: false
          })}
        />
      }
    </Fragment>
    )
}

// styled-components
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`
const BagIconWrapper = styled.div`
  padding-top: 24px;
`
const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`
const MainLogoImage = styled.img`
  height: 90px;
`
const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`
const ItemWrapper = styled.div`
  margin: 16px;
`
