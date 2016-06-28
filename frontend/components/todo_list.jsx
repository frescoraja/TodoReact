import React from 'react';
import TodoStore from '../stores/todo_store';
import TodoListItem from './todo_list_item';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: TodoStore.all() };
    this.todosChanged = this.todosChanged.bind(this);
  }

  componentDidMount() {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  }

  componentWillUnmount() {
    TodoStore.removeChangedHandler(this.todosChanged);
  }

  todosChanged() {
    this.setState({ todos: TodoStore.all() });
  }

  renderTodoList() {
    const todos = this.state.todos;
    return todos.map((todo, idx) => {
      return (
          <li key={idx}>
            <TodoListItem todo={todo} />
          </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderTodoList()}
        </ul>
      </div>
    );
  }
}
