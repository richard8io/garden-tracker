class Bed < ApplicationRecord
  has_many :sectors

  after_create :create_sectors

  def create_sectors
    1.upto(self.rows) do |row|
      1.upto(self.columns) do |column|
        sector = Sector.new
        sector.bed_id = self.id
        sector.row = row
        sector.column = column
        sector.save
      end
    end
  end
end
