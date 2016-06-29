let _steps = {},
    _callbacks = [];

const StepStore = {
  addChangedHandler(callback) {
    _callbacks.push(callback);
  },

  removeChangedHandler(callback) {
    _callbacks.splice(_callbacks.indexOf(callback), 1);
  },

  all(todoId) {
    _steps[todoId] = _steps[todoId] || [];
    return _steps[todoId].slice();
  },

  changed() {
    for (let i = 0; i < _callbacks.length; i++) {
      _callbacks[i]();
    } 
  },

  create(newStep) {
    const todoId = newStep.todo_id;

    $.ajax({
      method: "POST",
      data: { step: newStep },
      url: `api/todos/${todoId}/steps`,
      success: (resp) => {
        _steps[todoId] = _steps[todoId] || [];
        _steps[todoId].push(resp);
        this.changed();
      }
    });
  },

  destroy(todoId, id) {
    const idx = this.find(todoId, id);
    const step = _steps[todoId][idx];

    $.ajax({
      method: "DELETE",
      url: `api/steps/${id}`,
      success: () => {
        _steps[todoId].splice(idx, 1);
        this.changed();
      }
    });
  },

  fetch(todoId) {
    $.ajax({
      method: "GET",
      url: `api/todos/${todoId}/steps`,
      success: (resp) => {
        _steps[todoId] = resp;
        this.changed();
      }
    });
  },

  find(todoId, id) {
    let idx = -1;
    const steps = _steps[todoId] || [];

    for (let i = 0; i < steps.length; i++) {
      if (steps[i].id === id) {
        idx = i;
        break;
      }
    }

    return idx;
  },

  toggleDone(todoId, id) {
    const idx = this.find(todoId, id);
    const step = _steps[todoId][idx];
    if (step) {
      const done = !step.done;
      $.ajax({
        method: "PATCH",
        url: `api/steps/${id}`,
        data: { step: { done: done } },
        success: () => {
          step.done = done;
          this.changed();
        }
      });
    }
  }
}

export default StepStore;
