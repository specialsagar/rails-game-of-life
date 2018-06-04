Rails.application.routes.draw do
	resources :welcome, :path => "/" do
		collection do
			post 'game' => 'welcome#game' 
			post 'start_game' => 'welcome#start_game' 
		end
	end


	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
	root 'welcome#index'
end
