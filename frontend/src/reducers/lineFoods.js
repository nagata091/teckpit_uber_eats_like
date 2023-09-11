import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL, // 取得状況
  postState: REQUEST_STATE.INITIAL,  // 登録状況
  lineFoodsSummary: null,            // 仮注文データ
};

export const lineFoodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS',
}

export const lineFoodsReducer = (state, action) => {
  switch (action.type) {
    // 仮注文データを取得中
    case lineFoodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    // 仮注文データを取得完了
    case lineFoodsActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        fetchState: REQUEST_STATE.OK,
        lineFoodsSummary: action.payload.lineFoodsSummary,
      };
    // 仮注文データを登録中
    case lineFoodsActionTypes.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING,
      };
    // 仮注文データを登録完了
    case lineFoodsActionTypes.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
        lineFoodsSummary: null,
      };
    default:
      throw new Error();
  }
}