import React from 'react';
import TodoStore from '../stores/todo_store';

export default class TodoDoneButton extends React.Component {
  handleDone(event) {
    event.stopPropagation();
    TodoStore.toggleDone(this.props.todo.id);
  }

  render() {
    let classname = "btn btn-xs done-button";
    classname += (this.props.todo.done ? " btn-danger" : " btn-success");
    const text = this.props.todo.done ? "Undo" : "Done";
    return (
      <button className={classname}
        onClick={this.handleDone.bind(this)}>{text}</button>
    );
 }
}
