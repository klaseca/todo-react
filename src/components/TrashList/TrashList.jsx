import React, { Component, Fragment } from "react";
import s from "./s.module.css";
import { Consumer } from "../../Context";
import TrashItem from "../TrashItem";

export default class TrashList extends Component {
	render() {
		return (
			<Consumer>
				{({ trash }) => (
					<Fragment>
						{trash.length > 0 ? (
							trash.map(info => {
								return (
									<TrashItem key={info.id} text={info.text} trashId={info.id} />
								);
							})
						) : (
							<div className={s.emptyItem}>Pusto</div>
						)}
					</Fragment>
				)}
			</Consumer>
		);
	}
}
