Rails.application.routes.draw do
  namespace :api do
    resources :users, only: %i[index show create destroy update]
  end
end

