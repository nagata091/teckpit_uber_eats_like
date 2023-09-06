import React, { Fragment, useEffect } from "react";

// apisコンポーネント
import { fetchRestaurants } from "../apis/restaurants";


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
      レストラン一覧
    </Fragment>
    )
}