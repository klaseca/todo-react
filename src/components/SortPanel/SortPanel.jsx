import React, { Component } from "react";
import "./style.css";
import { Consumer } from "../../Context";

export default class SortPanel extends Component {
	render() {
		return (
			<Consumer>
				{({sortBy, sortChange}) => (
					<div className="sort-panel">
						<div className="sort-by">Sort by</div>
						<select value={sortBy} onChange={sortChange}>
							<option value="date">Date</option>
							<option value="ascending">In ascending order name</option>
							<option value="descending">In descending order of name</option>
						</select>
					</div>
				)}
			</Consumer>
		);
	}
}
