import React, { Fragment, useEffect, useReducer } from "react";
import styled from "styled-components";

// apisコンポーネント
import { fetchRestaurants } from "../apis/restaurants";

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';

// reducers
import { initialState, restaurantsActionTypes, restaurantsReducer } from "../reducers/restaurants";

// styled-components
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`
const MainLogoImage = styled.img`
  height: 90px;
`
const MainCoverImageWrapper = styled.div`
  text-align: center;
`
const MainCover = styled.img`
  height: 600px;
`

export const Restaurants = () => {
  // useReducerを使って、restaurantsReducerを呼び出す
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  // useEffectを使って、コンポーネントがマウントされた時に実行される処理を記述
  // 第2引数に空の配列[]を渡すことで、コンポーネントのレンダリング時に一度だけ実行される
  useEffect(() => {
    // レストラン一覧をAPIを叩いて取得
    dispatch({ type: restaurantsActionTypes.FETCHING });
    fetchRestaurants()
    // 取得に成功したら、restaurantsReducerに渡す
    .then((data) =>
      // dispatchは引数にオブジェクトを1つ取り、オブジェクト内にtypeとpayloadを持つ
      // dispatchはreducerを通じて間接的にstateを変更させる
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,  // fetchStateをFETCH_SUCCESSに変更
        // payloadとは、通信に含まれるペイロードデータのこと
        payload: { restaurants: data.restaurants }  // payloadのデータがrestaurantsListに格納される
      })
    )
  }, [])　// 第2引数に空の配列

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      {/* steteに入れられたデータを表示 */}
      { state.restaurantsList.map(restaurant =>
        <div>
          {restaurant.id} , {restaurant.name}
        </div>
      )}
    </Fragment>
  )
}