class Restaurant < ApplicationRecord
  # FoodモデルとLineFoodモデルとの関連付け
  # LineFoodモデルはFoodモデルを経由してRestaurantモデルと関連付けられる
  has_many :foods
  has_many :line_foods, through: :foods

  # バリデーション
  # name,fee,time_requiredカラムは必ず存在する
  validates :name, :fee, :time_required, presence: true
  # nameカラムは30文字以内
  validates :name, length: { maximum: 30 }
  # feeカラムは0以上の数値(マイナスは不可)
  validates :fee, numericality: { greater_than: 0 }
end