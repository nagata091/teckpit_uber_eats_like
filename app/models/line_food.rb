class LineFood < ApplicationRecord
  # Foodモデルとの関連付け
  belongs_to :food
  # Restaurantモデルとの関連付け
  belongs_to :restaurant
  # Orderモデルとの関連付け
  # `optional: true`により関連付け先のレコードが存在しなくても保存できるようになる
  belongs_to :order, optional: true

  # バリデーション
  # countカラムは0以上の数値(マイナスは不可)
  validates :count, numericality: { greater_than: 0 }

  # scopeメソッド
  # LineFoodモデルの中で、activeカラムがtrueのものを取得する
  scope :active, -> { where(active: true) }
  # LineFoodモデルの中で、restaurant_idが特定の店舗IDではないもの一覧を取得する
  scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }

  # 1つのLineFoodの合計金額を計算して返すメソッド
  def total_amount
    food.price * count
  end
end