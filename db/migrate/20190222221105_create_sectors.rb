class CreateSectors < ActiveRecord::Migration[5.2]
  def change
    create_table :sectors do |t|
      t.date :created_at
      t.date :updated_at      
      t.string :name
      t.string :notes
      t.boolean :active

      t.timestamps
    end

    add_reference :sectors, :bed, foreign_key: true
  end
end
