class Api::V1::OrdersController < ApplicationController

  def create
    # 仮注文の一覧を取得する
    posted_line_foods = LineFood.where(id: params[:line_food_ids])
    # 本注文を作成する
    order = Order.new(
      total_price: total_price(posted_line_foods),
    )
    # 本注文の保存に成功した場合は、空の情報を返す
    if order.save_with_update_line_foods!(posted_line_foods)
      render json: {}, status: :no_content
    # 本注文の保存に失敗した場合は、エラーを返す
    else
      render json: {}, status: :internal_server_error
    end
  end


  private

  # 本注文の合計金額を計算する
  def total_price(foods)
    # 本注文の合計金額 = 仮注文の合計金額 + レストランの手数料
    foods.sum { |line_food| line_food.total_amount } + foods.first.restaurant.fee
  end
end