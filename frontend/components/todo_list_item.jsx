import React from 'react';
import TodoStore from '../stores/todo_store';
import TodoDetailView from './todo_detail_view';
import TodoDoneButton from './todo_done_button';

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { detail: false };
    this.handleDestroy = this.handleDestroy.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);
  }

  handleDestroy(event) {
    event.stopPropagation();
    TodoStore.destroy(this.props.todo.id); 
  }

  toggleDetail(event) {
    event.preventDefault();
    this.setState({ detail: !this.state.detail });
  }

  render() {
    let detail;
    if (this.state.detail) {
      detail = (
        <TodoDetailView handleDestroy={this.handleDestroy} todo={this.props.todo} />
      );
    }
    return (
      <div className="list-group-item">
        <div className="todo-header">
          <a onClick={this.toggleDetail}>{this.props.todo.title}</a>
          <TodoDoneButton todo={this.props.todo} />
        </div>
        {detail}
      </div>
    );
  }
}
