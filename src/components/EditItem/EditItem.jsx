import React, { Component } from "react";
import "./style.css";
import { Consumer } from "../../Context";

export default class EditItem extends Component {
	render() {
		return (
			<Consumer>
				{({ editValue, setEditValue, saveEditItem, notSaveEditItem }) => (
					<div className="edit-item">
						<input
							type="text"
							className="edit-input"
							value={editValue}
							onChange={setEditValue}
						/>
						<button
							className="save-btn"
							onClick={() => saveEditItem(this.props.idItem)}>
							Save
						</button>
						<button
							className="not-save-btn"
							onClick={() => notSaveEditItem(this.props.idItem)}>
							Not save
						</button>
					</div>
				)}
			</Consumer>
		);
	}
}
