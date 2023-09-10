import React, { Fragment, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

// apisコンポーネント
import { fetchFoods } from '../apis/foods';
import { postLineFoods, replaceLineFoods } from '../apis/line_foods';

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
import { HTTP_STATUS_CODE } from '../constants';

// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import { Skeleton } from '@material-ui/lab';
import { FoodModal } from '../components/FoodModal';
import { NewOrderConfirmModal } from '../components/NewOrderConfirmModal';

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
    selectedFoodCount: 1,
    isOpenNewOrderModal: false,
    existingRestaurantName: '',
    newRestaurantName: '',
  };

  const [state, setState] = useState(initialState);
  // useHistoryは、React RouterのカスタムHooks
  // 特定の関数の実行結果に応じてページ遷移を行う
  const history = useHistory();

  const submitOrder = () => {
    postLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    })
      // 注文が成功したら、/ordersに遷移する
      .then(() => history.push('/orders'))
      // 注文が失敗した場合
      .catch((e) => {
        // すでに他の店舗の注文が存在しており406が返ってきた場合
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setState({
            ...state,
            isOpenOrderModal: false,
            isOpenNewOrderModal: true,
            existingRestaurantName: e.response.data.existing_restaurant,
            newRestaurantName: e.response.data.new_restaurant,
          })
        // それ以外の場合はエラーを投げる
        } else {
          throw e;
        }
      })
  };

  const replaceOrder = () => {
    replaceLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }).then(() => history.push('/orders'))
  };

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
      {
        state.isOpenModal &&
        <FoodModal
          food={state.selectedFood}
          isOpen={state.isOpenModal}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount + 1
          })}
          onClickCountDown={() => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount - 1
          })}
          // 注文ボタンをクリックした時にsubmitOrderを実行する
          onClickOrder={() => submitOrder()}
          // モーダルを閉じる時はすべてのstateを初期化する
          onClose={() => setState({
            ...state,
            isOpenModal: false,
            selectedFood: null,
            selectedFoodCount: 1
          })}
        />
      }
      {/* 他店舗の注文がすでにある時に注文ボタンを押した時に表示するモーダル */}
      {
        state.isOpenNewOrderModal &&
        <NewOrderConfirmModal
          isOpen={state.isOpenNewOrderModal}
          onClose={() => setState({ ...state, isOpenNewOrderModal: false })}
          existingRestaurantName={state.existingRestaurantName}
          newRestaurantName={state.newRestaurantName}
          onClickSubmit={() => replaceOrder()}
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
