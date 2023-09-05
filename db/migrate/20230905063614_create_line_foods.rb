class CreateLineFoods < ActiveRecord::Migration[7.0]
  def change
    create_table :line_foods do |t|
      # 商品テーブルへの外部キー
      t.references :food, null: false, foreign_key: true
      # レストランテーブルへの外部キー
      t.references :restaurant, null: false, foreign_key: true
      # 注文テーブルへの外部キー　初期値はnull
      t.references :order, foreign_key: true
      # ユーザーが注文した商品の個数　初期値は0個
      t.integer :count, null: false, default: 0
      # 仮注文かどうかのフラグ　初期値はfalse
      t.boolean :active, null: false, default: false

      t.timestamps
    end
  end
end
