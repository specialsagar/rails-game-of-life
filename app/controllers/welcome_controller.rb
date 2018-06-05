class WelcomeController < ApplicationController
	def index
		@@game = Game.new(0,0)
	end

	def game
		@rows=params[:rows].gsub(/\D/, '').to_i
		@cols=params[:cols].gsub(/\D/, '').to_i

		@@game = Game.new(@cols, @rows)
	end

	def start_game
		@rows=params[:rows].to_i
		@cols=params[:cols].to_i
		puts @rows
		puts '*'*100
		puts @rows
		cells = []
		if params[:load] == 'true'
			params[:cells].values.each do |col, row|
				cells.push([col.to_i, row.to_i])
			end
			@@game.load cells
		end

		@grid = @@game.calc_next_gen
	end
end
