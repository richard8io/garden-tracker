Rails.application.routes.draw do
  root to: redirect('/users')

  get 'users', to: 'site#index'
  get 'users/new', to: 'site#index'
  get 'users/:id', to: 'site#index'
  get 'users/:id/edit', to: 'site#index'

  namespace :api do
    resources :users, only: %i[index show create destroy update]
  end
end