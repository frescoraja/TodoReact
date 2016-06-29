import React from 'react';
import StepStore from '../stores/step_store';
import StepDoneButton from './step_done_button';

export default class StepListItem extends React.Component {
  handleDestroy(event) {
    event.stopPropagation();
    StepStore.destroy(this.props.todo_id, this.props.step.id); 
  }

  render() {
    return (
      <div className="step-list-item">
        <div className="step-header list-group-item">
          {this.props.step.title}
          <p>{this.props.step.body}</p>
          <StepDoneButton step={this.props.step} todo_id={this.props.todo_id} />
          <button
            onClick={this.handleDestroy.bind(this)}
            className="btn btn-danger btn-xs">Delete Step</button>
        </div>
      </div>
    );
  }
}
