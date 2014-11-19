 class Deposit < ActiveRecord::Base
  belongs_to :user
  has_many :percent
  has_many :contribution_account
  validates_presence_of :current_amount, :percent_id

   def accounts
       arr = []
       self.contribution_account.each do |account|
         arr << account.to_json
       end
       arr
   end

   def days_diff
     (Time.zone.now.to_date - self.created_at.to_date ).to_i
   end

   def update_balance
     balance = self.current_amount + 1
     self.update(current_amount: balance)
   end
end