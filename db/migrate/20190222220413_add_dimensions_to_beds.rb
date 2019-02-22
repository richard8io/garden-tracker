class AddDimensionsToBeds < ActiveRecord::Migration[5.2]
  def change
    add_column :beds, :columns, :integer
    add_column :beds, :rows, :integer
  end
end
