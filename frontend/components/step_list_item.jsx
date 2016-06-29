import React from 'react';
import StepDoneButton from './step_done_button';

export default class StepListItem extends React.Component {
  render() {
    return (
      <div className="step-list-item">
        <div className="step-header list-group-item">
          {this.props.step.title}
          <StepDoneButton step={this.props.step} todo_id={this.props.todo_id} />
          <p>{this.props.step.body}</p>
        </div>
      </div>
    );
  }
}
