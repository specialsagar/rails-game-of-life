class Game
	attr_accessor :grid, :cols, :rows

	def initialize(cols, rows)
		@cols = cols
		@rows = rows
		@grid = Array.new(rows) { Array.new(cols, 0) }
	end

	def load(cells)
		cells.each { |y, x| grid[y][x] = 1 }
	end

	def neighbors_count(y, x)
		neighbors(y, x).count { |cell| cell == 1 }
	end

	def execute
		new_grid = Array.new(rows) { Array.new(cols, 0) }
		grid.each_with_index do |row, y|
			row.each_with_index do |cell, x|
				count = neighbors_count(y, x)
				new_grid[y][x] = begin
					if cell.zero?
						[3].include?(count) ? 1 : 0
					else
						[2, 3].include?(count) ? 1 : 0
					end
				end
			end
		end
		return @grid = new_grid
	end

	private

	# 8 cells around the selected cell
	def neighbors(y, x)
		# rows
		(-1..1).inject [] do |values, py|
			# cols
			(-1..1).each do |px|
				unless py == 0 and px == 0
					i = y + py
					j = x + px
					
					# edge cases
					i = 0 unless i < rows
					j = 0 unless j < cols
					values << grid[i][j]
				end
			end
			values
		end
	end
end
