let _todos = [],
    _callbacks = [];

const TodoStore = {
  addChangedHandler(callback) {
    _callbacks.push(callback);
  },

  removeChangedHandler(callback) {
    _callbacks.splice(_callbacks.indexOf(callback), 1);    
  },

  changed() {
    for (let i = 0; i < _callbacks.length; i++) {
      _callbacks[i]();
    }
  },

  all() {
    return _todos.slice();
  },

  create(newTodo) {
    $.ajax({
      method: "POST",
      url: "api/todos",
      data: { todo: newTodo },
      success: (resp) => {
        _todos.push(resp);
        this.changed();
      }
    });
  },

  find(id) {
    let idx = -1;
    for (let i = 0; i < _todos.length; i++) {
      if (_todos[i].id === id) {
        idx = i;
        break;
      }
    }

    return idx;
  },

  fetch(todo) {
    $.ajax({
      method: "GET",
      url: "/api/todos",
      dataType: 'json',
      success: (resp) => {
        _todos = resp;
        this.changed();
      }
    });
  },

  destroy(id) {
    const idx = this.find(id),
        todo = _todos[idx];

    if (todo) {
      $.ajax({
        method: "DELETE",
        url: `api/todos/${id}`,
        success: () => {
          _todos.splice(idx, 1);
          this.changed();
        }
      });
    }
  },

  toggleDone(id) {
    const idx = this.find(id);
    const todo = _todos[idx];

    if (todo) {
      const done = !todo.done;
      $.ajax({
        method: "PATCH",
        url: `api/todos/${id}`,
        data: { todo: { done: done } },
        success: () => {
          todo.done = done;
          this.changed();
        }
      });
    }
  }
};

export default TodoStore 
