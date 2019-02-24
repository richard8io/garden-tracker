class AddRowAndColumnToSectors < ActiveRecord::Migration[5.2]
  def change
    add_column :sectors, :column, :integer
    add_column :sectors, :row, :integer
  end
end
