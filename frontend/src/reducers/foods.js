// APIにアクセスしてフード一覧を表示するためのReducer

// APIの状態を示す値。INITIAL, LOADING, OK
import { REQUEST_STATE } from '../constants';

// 初期値として、fetchStateをINITIAL、foodsListを空の配列に設定
export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,  // API未取得の状態
  foodsList: [],
};

// actionのtypeに応じて、stateを変更する
export const foodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};


export const foodsReducer = (state, action) => {
  switch (action.type) {
    // API取得中の状態
    case foodsActionTypes.FETCHING:
      return {
        // スプレッド構文。stateの中身を展開して、fetchStateのみを上書きする
        ...state, 
        fetchState: REQUEST_STATE.LOADING,
      };
    // API取得完了の状態
    case foodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        // APIから取得したレストラン一覧をfoodsListに格納する
        foodsList: action.payload.foods,
      };
    // それ以外の場合は、エラーを投げる
    default:
      throw new Error();
  }
};