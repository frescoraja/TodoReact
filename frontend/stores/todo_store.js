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
    let idx = this.find(id),
        todo = _todos[idx];

    if (todo) {
      $.ajax({
        method: "DELETE",
        url: `api/todos/${idx}`,
        success: () => {
          _todos.splice(idx, 1);
          this.changed();
        }
      });
    }
  }
};

export default TodoStore 
