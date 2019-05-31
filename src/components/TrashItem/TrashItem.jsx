import React, { Component } from "react";
import styles from "./s.module.css";
import { Consumer } from "../../Context";

export default class TrashItem extends Component {
	render() {
		return (
			<Consumer>
				{({ removeTrashItem, restoreTrashItem }) => (
					<div className={styles.item}>
						<div className={styles.item__text}>{this.props.text}</div>
						<button
							className={styles.btn}
							onClick={() => restoreTrashItem(this.props.trashId)}>
							Restore
						</button>
						<button
							className={styles.btn}
							onClick={() => removeTrashItem(this.props.trashId)}>
							Remove
						</button>
					</div>
				)}
			</Consumer>
		);
	}
}
