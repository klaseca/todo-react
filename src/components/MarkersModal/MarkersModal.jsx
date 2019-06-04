import React, { Component, Fragment } from "react";
import styles from "./s.module.css";
import { Consumer } from "../../Context";

export default class MarkersModal extends Component {
	setValue = ({ target: { value } }) => {
		this.setState(() => {
			return { value };
		});
	};

	state = {
		value: ""
	};

	render() {
		return (
			<Consumer>
				{({
					selectTodo,
					isMarkersModal,
					markers,
					closeMarkersModal,
					addMarker,
					setCheckedMarker
				}) => {
					return (
						isMarkersModal && (
							<div className={styles.bg}>
								<div className={styles.modal}>
									<div className={styles.title}>Edit markers</div>
									<div className={styles.allMarkers}>
										{markers.length > 0 ? (
											<Fragment>
												{markers.map(elem => {
													const checked = selectTodo.markers.includes(elem.id);
													const style = checked
														? styles.divChecked
														: styles.divNotChecked;
													return (
														<div key={elem.id} className={styles.markerItem}>
															<div className={style} />
															<label>
																<input
																	type="checkbox"
																	className={styles.cb}
																	onChange={() =>
																		setCheckedMarker(selectTodo.id, elem.id)
																	}
																/>
																{elem.value}
															</label>
														</div>
													);
												})}
											</Fragment>
										) : (
											<div className={styles.notMarkers}>Not markers</div>
										)}
									</div>
									<div className={styles.inputBox}>
										<input
											className={styles.input}
											type="text"
											value={this.state.value}
											onChange={this.setValue}
										/>
										<button
											className={styles.btn}
											onClick={() => addMarker(this.state.value)}>
											Add
										</button>
									</div>
									<div className={styles.okayBox}>
										<button className={styles.btn} onClick={closeMarkersModal}>
											Okay
										</button>
									</div>
								</div>
							</div>
						)
					);
				}}
			</Consumer>
		);
	}
}
