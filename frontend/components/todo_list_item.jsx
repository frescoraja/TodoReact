import React from 'react';

export default class TodoListItem extends React.Component {
  render() {
    let title = this.props.todo.title,
        body = this.props.todo.body;
    return (
      <div>
        <div>Title: {title}</div>
        <div>Body: {body}</div>
      </div>
    );
  }
}
