import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/todo_list';
import TodoForm from './components/todo_form';

const main = document.getElementById("main");
const other = document.getElementById("other");
ReactDOM.render(<TodoList />, main);
ReactDOM.render(<TodoForm />, other);
