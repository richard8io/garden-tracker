class Api::SectorsController < ApplicationController
  respond_to :json

  def index
    respond_with Sector.order(created_at: :DESC)
  end

  def show
    respond_with Sector.where(bed_id:params[:bed_id], column:params[:column], row:params[:column]).first
    # respond_with Sector.find(params[:id])
    # respond_with Sector.find(1)
  end

  def create
    respond_with :api, Sector.create(sector_params)
  end

  def destroy
    respond_with Sector.destroy(params[:id])
  end

  def update
    sector = Sector.find(params['id'])
    sector.update(sector_params)
    respond_with Sector, json: sector
  end

  private

  def sector_params
    params.require(:sector).permit(
      :id,
      :created_at,
      :updated_at,
      :name,
      :notes,
      :active
    )
  end
end
