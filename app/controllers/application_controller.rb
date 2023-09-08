class ApplicationController < ActionController::API
  # ApplicationControllerを継承したコントローラーは全てこのメソッドを実行する
  before_action :fake_load

  # 開発環境においてわざとロードを遅くして、本番と同じような状況を作る
  # リリース時は絶対に消すこと！！！
  def fake_load
    sleep 1
  end
end
