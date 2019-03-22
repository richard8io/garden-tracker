class Api::SectorsController < ApplicationController
  respond_to :json

  def index
    if params[:bed_id]
      respond_with Sector.where(bed_id:params[:bed_id]).order(created_at: :ASC)
    else
      respond_with Sector.order(created_at: :ASC)
    end
  end

  def show
    respond_with Sector.find(params[:id])
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
      :active,
      :plant_date,
      :harvest_date
    )
  end
end
