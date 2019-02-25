Rails.application.routes.draw do
  root to: redirect('/login/new')

  get 'login/new', to: 'site#index'
  get 'login/process', to: 'site#index'

  get 'users', to: 'site#index'
  get 'users/new', to: 'site#index'
  get 'users/:id', to: 'site#index'
  get 'users/:id/edit', to: 'site#index'

  get 'beds', to: 'site#index'
  get 'beds/new', to: 'site#index'
  get 'beds/:id', to: 'site#index'
  get 'beds/:id/edit', to: 'site#index'

  get 'sectors', to: 'site#index'
  get 'sectors/new', to: 'site#index'
  get 'sectors/:id', to: 'site#index'
  get 'sectors/:id/edit', to: 'site#index'

  namespace :api do
    resources :users, only: %i[index show create destroy update]
    resources :beds, only: %i[index show create destroy update]
    resources :sectors, only: %i[index show create destroy update]
  end
end