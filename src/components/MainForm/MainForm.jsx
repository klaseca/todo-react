import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import AddTodo from "../AddTodo";
import TodoList from "../TodoList";

export default class MainForm extends Component {
	render() {
		return (
			<div className="main-form">
				<div className="header">Todo React</div>
				<TodoList />
				<AddTodo />
				<div className="trash-can">
					<Link to="trashcan">
						<img alt="trash" src="https://img.icons8.com/clouds/90/000000/trash.png" />
					</Link>
				</div>
			</div>
		);
	}
}
