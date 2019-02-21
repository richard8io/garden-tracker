class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.date :created_at
      t.date :updated_at
      t.string :login
      t.boolean :active
      t.string :password
      t.string :password_salt

      t.timestamps
    end
  end
end
