class Api::V1::FoodsController < ApplicationController

  # GET /api/v1/restaurants/(レストランのID)/foodsに
  # アクセスするとそのIDのレストランのフード一覧を表示する
  def index
    # 該当のRestaurantモデルに紐づいたフードモデルの全てのレコードを取得
    restaurants = Restaurant.find(params[:restaurant_id])
    foods = restaurants.foods

    # json形式でデータレスポンスを返す
    render json: {
      foods: foods
    }, status: :ok
  end
end
