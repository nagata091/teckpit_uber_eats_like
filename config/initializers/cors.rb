# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

# 'rack-cors'というgemを使って、CORSを許可する
# CORSを許可するとは、異なるオリジン(URL)間でリソースの共有を許可するということ
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # どのオリジンからのリクエストを許可するか(正規表現でも設定できる)
    origins "http://localhost:3001"

    # どのようなリクエストを許可するか
    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
