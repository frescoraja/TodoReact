import React from 'react';
import StepStore from '../stores/step_store';
import StepList from './step_list';

export default class TodoDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { steps: StepStore.all(this.props.todo.id) };
    this.stepsChanged = this.stepsChanged.bind(this);
   }

  componentDidMount() {
    StepStore.addChangedHandler(this.stepsChanged);
    StepStore.fetch(this.props.todo.id);
  }

  componentWillUnmount() {
    StepStore.removeChangedHandler(this.stepsChanged);
  }

  stepsChanged() {
    this.setState({ steps: StepStore.all(this.props.todo.id) });
  }

  render() {
    return (
      <div className="todo-detail-view">
        {this.props.todo.body}
        <button
          onClick={this.props.handleDestroy}
          className="btn btn-xs btn-danger">Delete</button>
        <StepList todo_id={this.props.todo.id} steps={this.state.steps} />
      </div>
    );
  }
}
