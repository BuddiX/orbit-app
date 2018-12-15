# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  email           :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  avatar          :string
#

class User < ApplicationRecord
  MAX_PROJECTS_AMOUNT = 6

  has_secure_password
  before_save { email.downcase! }

  has_and_belongs_to_many :projects
  validates :projects, length: {maximum: MAX_PROJECTS_AMOUNT}

  validates :name,  presence: true, length: { maximum: 50 }
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i },
                    uniqueness: { case_sensitive: false }
  # passwordのvalidationがあるとアバター変える時エラーが起きる
  # validates :password, presence: true, length: { minimum: 6 }

  mount_uploader :avatar, AvatarUploader

  scope :id_is, -> user_id { where(id: user_id) }

  # 渡された文字列のハッシュ値を返す
  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
end
