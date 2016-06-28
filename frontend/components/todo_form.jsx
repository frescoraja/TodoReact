import React from 'react';
import TodoStore from '../stores/todo_store';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      done: false
    };
    this.updateBody = this.updateBody.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateBody(event) {
    this.setState({ body: event.currentTarget.value });
  }

  updateTitle(event) {
    this.setState({ title: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    TodoStore.create({ title: this.state.title, body: this.state.body, done: this.state.done });
    this.setState({ title: "", body: "", done: false });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            ref="title"
            className="form-control"
            value={this.state.title}
            placeholder="enter Todo.."
            onChange={this.updateTitle} />
        </div>
        <div className="form-group">
          <textarea
            ref="body"
            cols="20"
            className="form-control"
            value={this.state.body}
            rows="5"
            onChange={this.updateBody}></textarea>
        </div>
        <button className="submit-todo btn btn-primary">Create Todo</button>
      </form>
    );
  }
}
