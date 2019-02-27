class Api::BedsController < ApplicationController
  respond_to :json

  def index
    respond_with Bed.order(created_at: :DESC)
  end

  def show
    respond_with Bed.find(params[:id])
  end

  def create
    respond_with :api, Bed.create(bed_params)
  end

  def destroy
    # TODO: Add the database references that will handle deletions the correct way.
    Sector.where(bed_id: params[:id]).all.each do |sector|
      sector.destroy
    end
    respond_with Bed.destroy(params[:id])
  end

  def update
    bed = Bed.find(params['id'])
    bed.update(bed_params)
    respond_with Bed, json: bed
  end

  private

  def bed_params
    params.require(:bed).permit(
      :id,
      :created_at,
      :updated_at,
      :name,
      :rows,
      :columns,
      :active
    )
  end
end
