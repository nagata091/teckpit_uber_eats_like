import axios from 'axios';
import { foodsIndex } from '../urls/index';

export const fetchFoods = (restaurantsId) => {
  // axiosは、PromissベースのHTTPクライアントで、
  // 非同期にHTTP通信を行いたいときに用意に実装できるようになるライブラリ
  // axiosで引数(今回はAPIのURL)に対してGETリクエストする
  // foodsIndexは、引数を与える必要がある
  return axios.get(foodsIndex(restaurantsId))
  // thenは通信が成功したときの処理
  .then(response => {
    return response.data
    }
  )
  // catchは通信が失敗したときの処理
  .catch(
    (e) => console.error(e)
  )
  // 今回はないけど、.finally()は通信が成功しても失敗しても実行される処理
}
