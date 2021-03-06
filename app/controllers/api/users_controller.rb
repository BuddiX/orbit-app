class Api::UsersController < ApplicationController
  before_action :authenticate_user, except: :create

  def create
    new_user = User.new(user_params)
    new_user.avatar = "https://d111fnfgjqj6t5.cloudfront.net/user_default_icon.png"
    new_user.save!
    new_project = new_user.projects.create!(title: "PROJECT", fixed_star_type: 0, description: "This is your first Project!!")
    3.times do |i|
      new_project.assignments.create!({
        title: "TEST",
        description: "This is a Test Assignment to be destroyed",
        deadline: Time.zone.now + 15.days,
        planet_type: i,
        planet_size: 1,
        orbit_pos: i
      })
    end
    render json: new_user
  end

  def current
    render json: current_user
  end

  def remove_flag
    current_user = User.find_by(email: user_params[:email])
    current_user.first_visit_flag = false
    current_user.save! and render json: current_user
  end

  def update_avatar
    root_url = Rails.env.production? ? "https://d111fnfgjqj6t5.cloudfront.net" : "https://d1xhez4u7g5090.cloudfront.net"
    bucket_name = Rails.env.production? ? "orbit-prod" : "orbit-dev"
    avatar_path = "avatars/user_id_#{current_user.id}/#{Time.now.to_i}"

    bucket = Aws::S3::Resource.new(
      :region            => 'ap-northeast-1',
      :access_key_id     => ENV['AWS_ACCESS_KEY'],
      :secret_access_key => ENV['AWS_ACCESS_SECRET_KEY'],
    ).bucket(bucket_name)
    bucket.object(avatar_path).put(body: params[:avatar])

    current_user.avatar = "#{root_url}/#{avatar_path}"
    current_user.save! and render json: current_user.avatar
  end

  def update_profile
    current_user.name = user_params[:name] if user_params[:name]
    current_user.email = user_params[:email] if user_params[:email]
    current_user.password = user_params[:password]
    current_user.password_confirmation = params[:password_confirmation]
    current_user.save! and render json: current_user
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
