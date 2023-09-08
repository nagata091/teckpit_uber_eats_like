import React, { Fragment, useEffect } from "react";
import styled from "styled-components";

// apisコンポーネント
import { fetchRestaurants } from "../apis/restaurants";

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';

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

  // useEffectを使って、コンポーネントがマウントされた時に実行される処理を記述
  // 第2引数に空の配列[]を渡すことで、コンポーネントのレンダリング時に一度だけ実行される
  useEffect(() => {
    // レストラン一覧をAPIを叩いて取得
    fetchRestaurants()
    // 取得に成功したら、コンソールに出力
    .then(
      (data) => console.log(data)
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
    </Fragment>
  )
}