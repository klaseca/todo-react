import React, { Component } from "react";
import styles from "./s.module.css";
import TrashList from "../TrashList";
import { Context, Consumer } from "../../Context";
import { Link } from "react-router-dom";

export default class TrashForm extends Component {
	static contextType = Context;

	componentDidMount() {
		this.clearAll = setInterval(() => {
			this.context.removeTrashAll();
		}, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.clearAll);
	}

	render() {
		return (
			<Consumer>
				{({ removeTrashAll }) => (
					<div className={styles.main}>
						<div className={styles.header}>Trash Todo</div>
						<TrashList />
						<div className="trash-can">
							<Link to="/">
								<img
									alt="todo"
									src="https://img.icons8.com/clouds/90/000000/checklist.png"
								/>
							</Link>
						</div>
						<div className={styles.removeAll} onClick={removeTrashAll}>
							<img
								alt="remove all"
								src="https://img.icons8.com/clouds/90/000000/delete-sign.png"
							/>
						</div>
					</div>
				)}
			</Consumer>
		);
	}
}
