import React from 'react';
import TodoStore from '../stores/todo_store';
import TodoListItem from './todo_list_item';
import TodoForm from './todo_form';

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
        <TodoListItem key={idx} todo={todo} />
      );
    });
  }

  render() {
    return (
      <div className="TodoList">
        <h1>Todo!</h1>
          <div className="todo-list">
            {this.renderTodoList()}
          </div>
          <TodoForm />
      </div>
    );
  }
}
