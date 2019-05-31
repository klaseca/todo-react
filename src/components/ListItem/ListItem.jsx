import React, { Component } from "react";
import "./style.css";
import { Consumer } from "../../Context";

export default class ListItem extends Component {
	render() {
		return (
			<Consumer>
				{({ removeListItem, setComplete, editListItem }) => (
					<div className="list-item">
						<input
							type="checkbox"
							id={this.props.info.id}
							checked={this.props.isCompleted}
							onChange={() => setComplete(this.props.info.id)}
						/>
						<label
							htmlFor={this.props.info.id}
							onChange={() => setComplete(this.props.info.id)}
							className="list-item__text">
							{this.props.info.text}
						</label>
						<button
							className="edit-btn"
							onClick={() => editListItem(this.props.info.id)}>
							Edit
						</button>
						<button
							className="remove-btn"
							onClick={() => removeListItem(this.props.info.id)}>
							Remove
						</button>
					</div>
				)}
			</Consumer>
		);
	}
}
