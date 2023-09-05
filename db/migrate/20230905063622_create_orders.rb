class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      # 注文の合計金額　初期値は0円
      t.integer :total_price, null: false, default: 0

      t.timestamps
    end
  end
end
