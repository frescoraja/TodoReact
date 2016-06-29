class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.references :todo, index: true
      t.string :title, null: false
      t.string :body
      t.boolean :done, null: false

      t.timestamps null: false
    end
  end
end
