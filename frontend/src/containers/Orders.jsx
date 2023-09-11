import React, { Fragment, useEffect, useReducer } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

// components
import { OrderDetailItem } from '../components/OrderDetailItem';
import { OrderButton } from '../components/Buttons';
import CircularProgress from '@material-ui/core/CircularProgress';

// apis
import { fetchLineFoods } from "../apis/line_foods";
import { postOrder } from "../apis/orders";

// reducers
import {
  initialState,
  lineFoodsActionTypes,
  lineFoodsReducer,
} from "../reducers/lineFoods";

// images
import MainLogo from '../images/logo.png';

// constants
import { REQUEST_STATE } from '../constants';


export const Orders = () => {

  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);

  useEffect(() => {
    dispatch({ type: lineFoodsActionTypes.FETCHING });
    fetchLineFoods()
      .then((data) =>
        dispatch({
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: {
            lineFoodsSummary: data
          }
        })
      )
      // line_foods.jsからthrowされたエラー(e)はここで受け取る
      .catch((e) => console.error(e))
  }, []);

  const postLineFoods = () => {
    dispatch({ type: lineFoodsActionTypes.POSTING });
    postOrder({
      line_food_ids: state.lineFoodsSummary.line_food_ids,
    }).then(() => {
      // 注文に成功したら、画面をリロードする
      dispatch({ type: lineFoodsActionTypes.POST_SUCCESS });
    });
    window.location.reload();
  };

  const orderButtonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...';
      case REQUEST_STATE.OK:
        return '注文が完了しました！';
      default:
        return '注文を確定する';
    }
  };

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              // APIローディング中はくるくる回るローディングコンポーネントを表示
              state.fetchState === REQUEST_STATE.LOADING ?
                <CircularProgress />
              :
                state.lineFoodsSummary &&
                  <OrderDetailItem
                    restaurantFee={state.lineFoodsSummary.restaurant.fee}
                    restaurantName={state.lineFoodsSummary.restaurant.name}
                    restaurantId={state.lineFoodsSummary.restaurant.id}
                    timeRequired={state.lineFoodsSummary.restaurant.time_required}
                    foodCount={state.lineFoodsSummary.count}
                    price={state.lineFoodsSummary.amount}
                  />
            }
          </OrderItemWrapper>
          <div>
            {
              state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary &&
                <OrderButton
                  // ボタンを押したら、postLineFoods関数が実行して注文を実行する
                  onClick={() => postLineFoods()}
                  // 注文中、注文完了の場合はボタンを押せないようにする
                  disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}
                >
                  {orderButtonLabel()}
                </OrderButton>
            }
            {
              // 登録APIが成功して仮注文データがなくなったら以下のメッセージを表示
              state.fetchState === REQUEST_STATE.OK && !(state.lineFoodsSummary) &&
                <p>注文予定の商品はありません。</p>
            }
          </div>
        </div>
      </OrderListWrapper>
    </Fragment>
    )
};

// styled-components
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`
const MainLogoImage = styled.img`
  height: 90px;
`
const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`