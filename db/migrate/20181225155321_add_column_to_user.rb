class AddColumnToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_visit_flag, :boolean, default: true 
  end
end
