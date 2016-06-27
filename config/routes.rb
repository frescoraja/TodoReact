Rails.application.routes.draw do
  root to: 'static_pages#home'
  namespace :api, defaults: { format: :json } do
    resources :todos, only: [:index, :create, :update, :show, :destroy]
  end
end
