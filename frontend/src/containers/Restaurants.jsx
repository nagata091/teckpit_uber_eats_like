import React, { Fragment, useEffect, useReducer } from "react";
import styled from "styled-components";
import { Link } from "@material-ui/core";

// components
import Skeleton from "@material-ui/lab/Skeleton";

// apisコンポーネント
import { fetchRestaurants } from "../apis/restaurants";

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';
import RestaurantImage from '../images/restaurant-image.jpg';

// reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer
} from "../reducers/restaurants";

// constants
import { REQUEST_STATE } from "../constants";


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
        // fetchStateをFETCH_SUCCESSに変更
        type: restaurantsActionTypes.FETCH_SUCCESS,
        // payloadとは、通信に含まれるペイロードデータのこと
        // payloadのデータがrestaurantsListに格納される
        payload: { restaurants: data.restaurants }
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

      {/* レストラン一覧を表示 */}
      <RestaurantsContentsList>
        {
          state.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              {/* マテリアルUIのSkeletonコンポーネント */}
              {/* ロード中のアイテムをいい感じに表示してくれる */}
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
            </Fragment>
          :
            state.restaurantsList.map(restaurant =>
              <Link
                to={`/restaurants/${restaurant.id}/foods`}
                key={restaurant.id}
                styled={{ textDecoration: "none" }}
                >
                <RestaurantsContentWrapper>
                  <RestaurantsImageNode src={RestaurantImage} />
                  <MainText>{restaurant.name}</MainText>
                  <SubText>
                    { `配送料：${restaurant.fee}円 ${restaurant.time_required}分` }
                  </SubText>
                </RestaurantsContentWrapper>
              </Link>
            )
        }
      </RestaurantsContentsList>

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
const MainCoverImageWrapper = styled.div`
  text-align: center;
`
const MainCover = styled.img`
  height: 600px;
`
const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`
const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`
const RestaurantsImageNode = styled.img`
  width: 100%;
`
const MainText = styled.p`
  color: black;
  font-size: 18px;
`
const SubText = styled.p`
  color: black;
  font-size: 12px;
`