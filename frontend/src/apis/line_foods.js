import axios from 'axios';
import { lineFoods, lineFoodsReplace } from '../urls/index'

export const postLineFoods = (params) => {
  // axios.post()は、第一引数にURL、第二引数にリクエストボディを受け取る
  // food_idとcountのparamsを受け取り、lineFoodsAPIにPOSTリクエストを送る
  return axios.post(lineFoods,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  // 通信が成功したら、レスポンスのデータを返す
  .then(res => {
    return res.data
  })
  // 通信が失敗したら、エラーを投げる
  // 失敗するときは他店舗の注文が既にある時で、その場合は
  // NewOrderConfirmDialogのモーダルを表示する
  .catch((e) => { throw e; })
};

export const replaceLineFoods = (params) => {
  // axios.put()は、第一引数にURL、第二引数にリクエストボディを受け取る
  // food_idとcountのparamsを受け取り、lineFoodsAPIにPUTリクエストを送る
  return axios.put(lineFoodsReplace,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};