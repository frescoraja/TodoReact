import React from 'react';
import StepStore from '../stores/step_store';

export default class StepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", body: "" };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({ title: event.currentTarget.value });
  }

  handleChangeBody(event) {
    this.setState({ body: event.currentTarget.value });
  }

  submitForm(event) {
    event.preventDefault();
    const data = {
      todo_id: this.props.todo_id,
      title: this.state.title,
      body: this.state.body
    };
    StepStore.create(data, this.props.todo_id);

    this.setState({ title: "", body: "" });
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input type="text"
          onChange={this.handleChangeTitle}
          value={this.state.title} />
        <input type="text"
          onChange={this.handleChangeBody}
          value={this.state.body} />
        <input type="submit" className="btn btn-xs btn-primary" value="New Step" />
      </form>
    );
  }
}
