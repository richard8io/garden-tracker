class Api::UsersController < ApplicationController
  respond_to :json

  def index
    respond_with User.order(created_at: :DESC)
  end

  def show
    respond_with User.find(params[:id])
  end

  def create
    respond_with :api, User.create(user_params)
  end

  def destroy
    respond_with User.destroy(params[:id])
  end

  def update
    user = User.find(params['id'])
    user.update(user_params)
    respond_with User, json: user
  end

  def process_login
    Rails.logger.info "p"*100
    respond_with :api, User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(
      :id,
      :created_at,
      :updated_at,
      :login,
      :password,
      :password_salt,
      :active
    )
  end
end
