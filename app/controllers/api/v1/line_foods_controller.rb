class Api::V1::LineFoodsController < ApplicationController
  before_action :set_food, only: %i[create replace]

  # 仮注文を作成するメソッド
  def create
    # 他店舗の仮注文がある場合は、そのことを表示して早期脱出する
    if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
      return render json: {
        existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
        new_restaurant: Food.find(params[:food_id]).restaurant.name,
      }, status: :not_acceptable
    end

    # 仮注文を作成する　メソッドはprivateで定義
    set_line_food(@ordered_food)

    # 仮注文の保存に成功した場合は、仮注文の情報を返す
    if @line_food.save
      render json: {
        line_food: @line_food
      }, status: :created
    # 仮注文の保存に失敗した場合は、エラーを返す
    else
      render json: {}, status: :internal_server_error
    end
  end

  # 仮注文の一覧を表示する
  def index
    # 仮注文の一覧を取得する
    line_foods = LineFood.active

    # 仮注文が存在する場合は、仮注文の情報を返す
    if line_foods.exists?
      render json: {
        # mapメソッドで、line_foodsのidを配列で取得し、line_food_idsとして返す
        line_food_ids: line_foods.map { |line_food| line_food.id },
        # 仮注文したレストランを取得する
        restaurant: line_foods[0].restaurant,
        # 仮注文の合計注文数を返す
        count: line_foods.sum { |line_food| line_food.count },
        # 仮注文の合計金額を返す
        amount: line_foods.sum { |line_food| line_food.total_amount },
      }, status: :ok
    # 仮注文が存在しない場合は、空の情報を返す
    else
      render json: {}, status: :no_content
    end
  end

  # 仮注文の際の例外パターンを処理する
  # 店舗Aで仮注文した状態で店舗Bで仮注文した場合に、前者は削除して後者の仮注文を作成するようにする
  def replace
    # 他店舗の仮注文の一覧を取得する
    LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
      # activeをfalseに更新することで、仮注文を削除する
      line_food.update_attribute(:active, false)
    end

    # 仮注文を作成する
    set_line_food(@ordered_food)

    # 仮注文の保存に成功した場合は、仮注文の情報を返す
    if @line_food.save
      render json: {
        line_food: @line_food
      }, status: :created
    # 仮注文の保存に失敗した場合は、エラーを返す
    else
      render json: {}, status: :internal_server_error
    end
  end


  private

  # before_actionで呼び出すメソッド
  # 仮注文をcreateする前に、対象のフードを取得する
  def set_food
    @ordered_food = Food.find(params[:food_id])
  end

  # 仮注文を作成するメソッド
  def set_line_food(ordered_food)
    # 同じフードをすでに仮注文している場合は、既存の仮注文に対して数量を加算する
    if ordered_food.line_food.present?
      @line_food = ordered_food.line_food
      @line_food.attributes = {
        count: ordered_food.line_food.count + params[:count],
        active: true
      }
    # 同じフードの仮注文がない場合は、新規に仮注文を作成する
    else
      @line_food = ordered_food.build_line_food(
        count: params[:count],
        restaurant: ordered_food.restaurant,
        active: true
      )
    end
  end
end