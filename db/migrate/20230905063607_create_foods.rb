class CreateFoods < ActiveRecord::Migration[7.0]
  def change
    create_table :foods do |t|
      # レストランテーブルへの外部キー
      t.references :restaurant, null: false, foreign_key: true
      # 商品名
      t.string :name, null: false
      # 商品の値段
      t.integer :price, null: false
      # 商品の説明
      t.text :description, null: false

      t.timestamps
    end
  end
end
