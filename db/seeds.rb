# デモ用レストランを3つ作成する
3.times do |n|
  restaurant = Restaurant.new(
    name: "おためしレストラン_#{n + 1}",
    fee: 100,
    time_required: 10)

    # 1つのレストランあたり12個のデモ用フードを作成する
    12.times do |m|
      restaurant.foods.build(
        name: "おためしフード_#{m + 1}",
        price: 500,
        description: "おためしフード_#{m + 1}の説明文です。")
    end

    # 保存する
    restaurant.save!
end