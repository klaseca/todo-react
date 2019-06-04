import React, { Component, Fragment } from "react";
import "./style.css";
import { Consumer } from "../../Context";
import ListItem from "../ListItem";
import EmptyItem from "../EmptyItem";
import EditItem from "../EditItem";
import SortPanel from "../SortPanel";

export default class TodoList extends Component {
	contentRender = (todos, sortBy) => {
		function mapContent(info) {
			const item = !info.isEditable ? (
				<ListItem
					key={info.id}
					info={info}
					markers={info.markers}
					isCompleted={info.isCompleted}
				/>
			) : (
				<EditItem key={info.id} idItem={info.id} />
			);

			return item;
		}

		if (todos.length > 0) {
			if (sortBy === "date") {
				const content = todos.map(mapContent);
				return (
					<Fragment>
						<SortPanel />
						{content}
					</Fragment>
				);
			} else if (sortBy === "ascending") {
				const sortTodos = [...todos];
				const content = sortTodos
					.sort((a, b) => +(a.text > b.text) || -(a.text < b.text))
					.map(mapContent);
				return (
					<Fragment>
						<SortPanel />
						{content}
					</Fragment>
				);
			} else {
				const sortTodos = [...todos];
				const content = sortTodos
					.sort((a, b) => +(a.text < b.text) || -(a.text > b.text))
					.map(mapContent);
				return (
					<Fragment>
						<SortPanel />
						{content}
					</Fragment>
				);
			}
		} else {
			const content = <EmptyItem />;
			return content;
		}
	};

	render() {
		return (
			<Consumer>
				{({ todos, sortBy }) => this.contentRender(todos, sortBy)}
			</Consumer>
		);
	}
}