class CreateBeds < ActiveRecord::Migration[5.2]
  def change
    create_table :beds do |t|
      t.date :created_at
      t.date :updated_at
      t.string :name
      t.boolean :active

      t.timestamps
    end
  end
end
