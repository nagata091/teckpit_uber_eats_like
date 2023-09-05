class Food < ApplicationRecord
  # Restaurantモデルとの関連付け
  belongs_to :restaurant
  # Orderモデルとの関連付け
  # `optional: true`により関連付け先のレコードが存在しなくても保存できるようになる
  belongs_to :order, optional: true
  # LineFoodモデルとの関連付け　1対1の関係
  has_one :line_food
end