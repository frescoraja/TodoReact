import React from 'react';
import StepStore from '../stores/step_store';

export default class StepDoneButton extends React.Component {
  handleDone(event) {
    event.stopPropagation();
    StepStore.toggleDone(this.props.todo_id, this.props.step.id);
  }

  render() {
    let classname = "btn btn-xs step-done-button";
    classname += (this.props.step.done ? " btn-danger" : " btn-success");
    const text = this.props.step.done ? "Undo" : "Done";

    return (
      <button
        className={classname}
        onClick={this.handleDone.bind(this)}>
        {text}
      </button>
    ); 
  }
}
