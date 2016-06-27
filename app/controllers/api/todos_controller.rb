class Api::TodosController < ApplicationController
  def index
    @todos = Todo.all
     
  end

  def create
  end

  def show
  end

  def update
  end

  def destroy
  end
end
