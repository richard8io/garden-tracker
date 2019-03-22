class AddPlantAndHarvestDatesToSector < ActiveRecord::Migration[5.2]
  def change
    add_column :sectors, :plant_date, :date
    add_column :sectors, :harvest_date, :date
  end
end
