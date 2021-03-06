# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_25_155321) do

  create_table "assignments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "deadline"
    t.integer "planet_type"
    t.integer "planet_size"
    t.integer "orbit_pos"
    t.integer "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "done_flag", default: false
    t.boolean "destroyed_flag", default: false
    t.datetime "destroyed_at"
  end

  create_table "projects", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title"
    t.integer "fixed_star_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
  end

  create_table "projects_users", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "user_id", null: false
    t.index ["project_id"], name: "index_projects_users_on_project_id"
    t.index ["user_id"], name: "index_projects_users_on_user_id"
  end

  create_table "sub_assignments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "deadline"
    t.integer "planet_type"
    t.integer "assignment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "destroyed_at"
    t.boolean "destroyed_flag", default: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar"
    t.boolean "first_visit_flag", default: true
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
