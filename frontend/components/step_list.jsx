import React from 'react';
import StepListItem from './step_list_item';
import StepForm from './step_form';

export default class StepList extends React.Component {
  render() {
    return (
      <div className="step-list">
        <div>
        {
          this.props.steps.map((step) => {
            return (
              <StepListItem key={step.id} step={step} todo_id={this.props.todo_id} />
            );
          })
        }
        </div>
        <StepForm todo_id={this.props.todo_id} />
      </div>
    );
  }
}
