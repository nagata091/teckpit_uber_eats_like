class Order < ApplicationRecord
  # LineFoodモデルとの関連付け
  has_many :line_foods

  # バリデーション
  # total_priceカラムは0以上の数値(マイナスは不可)
  validates :total_price, numericality: { greater_than: 0 }

  # 
  def save_with_update_line_foods!(line_foods)
    # トランザクションの中で行うことで、一部の処理が失敗した場合に全ての処理を取り消すことができる
    ActiveRecord::Base.transaction do
      # LineFoodモデルのデータ更新
      line_foods.each do |line_food|
        line_food.update!(active: false, order: self)
      end
      # Orderモデルのデータ保存
      self.save!
    end
  end
end