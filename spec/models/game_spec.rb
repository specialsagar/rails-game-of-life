require 'rails_helper'

RSpec.describe Game, type: :model do
	# initialize the model
	subject { Game.new(6,6) }
	# initialize live cells
	let(:live_cells) {[[1,1],[1,2],[1,3]]}
	
	context "model initialized with 6x6 matrix" do
		it "has 6 rows" do
			expect(subject.rows).to eq(6) 
		end
		it "has 6 cols" do
			expect(subject.cols).to eq(6) 
		end
		it "has 2d matrix of 6x6 with all zeros" do
			expect(subject.grid).to eq (
			[[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0]])
		end
	end

	context "Mapping predefined live cells in matrix" do
	  before do
	    subject.load live_cells
	  end
		it "Load grid with live cells" do
			expect(subject.grid).to eq (
			[[0,0,0,0,0,0],
			[0,1,1,1,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0]])
		end

		it "Shows a cell at predefined position [1,2] has 2 live neighbours to be true" do
			expect(subject.count_live_neighbour(1,2)).to eq(2)
		end
		it "Shows the top left edge cell to have 1 live neighbour" do
			expect(subject.count_live_neighbour(0,0)).to eq(1)
		end
		it "Shows the bottom left edge cell to have 0 live neighbour" do
			expect(subject.count_live_neighbour(5,0)).to eq(0)
		end
		it "Generates the next stage of life" do
			expect(subject.calc_next_gen).to eq(
			[[0,0,1,0,0,0],
			[0,0,1,0,0,0],
			[0,0,1,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0]])
		end
	end
end
