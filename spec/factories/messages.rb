FactoryBot.define do
  factory :message do
    user
    group
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
  end
end