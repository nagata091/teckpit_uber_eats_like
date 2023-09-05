class CreateRestaurants < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurants do |t|
      # レストランの名前
      t.string :name, null: false
      # 配送手数料　初期値は0円
      t.integer :fee, null: false, default: 0
      # 配送にかかる時間
      t.integer :time_required, null: false

      t.timestamps
    end
  end
end
