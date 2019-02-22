Rails.application.routes.draw do
  root to: redirect('/beds')

  get 'users', to: 'site#index'
  get 'users/new', to: 'site#index'
  get 'users/:id', to: 'site#index'
  get 'users/:id/edit', to: 'site#index'

  get 'beds', to: 'site#index'
  get 'beds/new', to: 'site#index'
  get 'beds/:id', to: 'site#index'
  get 'beds/:id/edit', to: 'site#index'

  namespace :api do
    resources :users, only: %i[index show create destroy update]
    resources :beds, only: %i[index show create destroy update]
  end
end