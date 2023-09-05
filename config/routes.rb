Rails.application.routes.draw do
  # namespaceで名前空間を付与することで、コントローラーをグルーピングする
  # また、namespaceを付与することでURLにもその情報を付与する
  # 今回はAPIモードでrails newしたので、viewに対するルーティングは不要
  namespace :api do
    # URLにAPIのversionを含めることで、APIを更新する場合にスイッチングしやすくる
    namespace :v1 do
      # resourcesでRESTfulなルーティングを定義する
      # index,new,create,show,edit,update,destroyの7つのアクション使えるようになる
      # 今回はindex,createの2つのアクションを使う
      resources :restaurants do
        resources :foods,    only: %i[index]
      end
      resources :line_foods, only: %i[index create]
      # 'line_foods/replace'にPUTリクエストが来たら、
      # `line_foods_controller.rb`のreplaceアクションを呼び出す
      put 'line_foods/replace', to: 'line_foods#replace'
      resources :orders,     only: %i[create]
    end
  end
end
