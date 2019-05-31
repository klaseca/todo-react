import React, { Component } from "react";
import "./style.css";
import { Consumer } from "../../Context";

export default class AddTodo extends Component {
	render() {
		return (			
			<Consumer>
				{({value, setValue, addListItem}) => (
					<div className="add-todo">
						<input
							className="add-input"
							type="text"
							placeholder="Add todo"
							value={value}
							onChange={setValue}
						/>
						<button onClick={addListItem} className="add-btn">
							Add
						</button>
					</div>
				)}
			</Consumer>
		);
	}
}
