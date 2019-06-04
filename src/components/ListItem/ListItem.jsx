import React, { Component, Fragment } from "react";
import "./style.css";
import { Consumer } from "../../Context";
import Marker from "../Marker";

export default class ListItem extends Component {
	render() {
		return (
			<Consumer>
				{({ removeListItem, setComplete, editListItem, markers, openMarkersModal }) => (
					<div className="list-item">
						<div className="items-box">
							<div className="item-info">
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
							</div>
							<div className="markers-box">
								<div className="edit-markers" onClick={() => openMarkersModal(this.props.info)}>
									<img alt="Edit markers" src="https://img.icons8.com/small/16/000000/tags.png" />
								</div>
								<div className="markers">
									{this.props.markers.length > 0 ? (
											<Fragment>
												{this.props.markers.map(id => {
													const marker = markers.find(elem => {
														return elem.id === id;
													});

													return <Marker key={id} text={marker.value} />
												})}
											</Fragment>
										) : <div className="not-markers">Not markers</div>
									}
								</div>
							</div>
						</div>
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
