class Api::StepsController < ApplicationController
  def index
    steps = Todo.find(params[:todo_id]).steps
    render json: steps
  end

  def create
    step = Step.new(step_params)

    if step.save
      render json: step
    else
      render json: step.errors.full_messages, status: 422
    end
  end

  def destroy
    if Step.find(params[:id]).try(:destroy!)
      render json: { message: "destroyed" }
    else
      render json: { message: "invalid step", status: 404 }
    end
  end

  def update
    step = Step.find(params[:id])
    if step
      step.update(step_params)
      render json: step
    else
      render json: { message: "not found", status: 404 }
    end
  end

  private
  def step_params
    params.require(:step).permit(:title, :body, :done, :todo_id)
  end
end