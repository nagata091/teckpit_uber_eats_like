# apiとv1の名前空間を指定
module Api
  module V1

    # ここはApi::V1::RestaurantsControllerと書いても同義
    class RestaurantsController < ApplicationController

      # GET /api/v1/restaurantsにアクセスするとレストラン一覧を表示する
      def index
        # Restaurantモデルの全てのレコードを取得
        restaurants = Restaurant.all

        # json形式でデータレスポンスを返す
        render json: {
          restaurants: restaurants
        }, status: :ok
      end

    end

  end
end