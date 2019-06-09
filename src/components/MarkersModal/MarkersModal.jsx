import React, { Component, Fragment } from "react";
import styles from "./s.module.css";
import { Consumer } from "../../Context";

export default class MarkersModal extends Component {
  setValue = ({ target: { value } }) => {
    this.setState(() => {
      return { value };
    });
  };

  clearValue = () => {
    this.setState(() => {
      return { value: "" };
    });
  };

  changeMarkerValue = ({ target: { value } }) => {
    this.setState(() => {
      return { markerValue: value };
    });
  };

  clearMarkerValue = () => {
    this.setState(() => {
      return { editMarkerId: "", markerValue: "" };
    });
  };

  notSaveMarkerValue = () => {
    this.setState(() => {
      return { editMarkerId: "", markerValue: "" };
    });
  };

  editMarker = (id, value) => {
    this.setState(() => {
      return { editMarkerId: id, markerValue: value };
    });
  };

  state = {
    value: "",
    markerValue: "",
    editMarkerId: ""
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
          setCheckedMarker,
          saveMarkerValue,
          removeMarker
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
                          if (elem.id !== this.state.editMarkerId) {
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
                                <div className={styles.editItemBox}>
                                  <img
                                    alt="edit"
                                    src="https://img.icons8.com/material/20/000000/pencil.png"
                                    className={styles.editItem}
                                    onClick={() =>
                                      this.editMarker(elem.id, elem.value)
                                    }
                                  />
                                  <img
                                    alt="remove"
                                    src="https://img.icons8.com/material-rounded/20/000000/delete-sign.png"
                                    className={styles.editItem}
                                    onClick={() => {
                                      removeMarker(elem.id);
                                      this.clearValue();
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div key={elem.id} className={styles.editBox}>
                                <input
                                  className={styles.editInput}
                                  type="text"
                                  value={this.state.markerValue}
                                  onChange={this.changeMarkerValue}
                                />
                                <button
                                  className={styles.editBtn}
                                  onClick={() => {
                                    saveMarkerValue(
                                      elem.id,
                                      this.state.markerValue
                                    );
                                    this.clearMarkerValue();
                                  }}>
                                  Save
                                </button>
                                <button
                                  className={styles.editBtn}
                                  onClick={this.notSaveMarkerValue}>
                                  Not save
                                </button>
                              </div>
                            );
                          }
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
                      onClick={() => {
                        addMarker(this.state.value);
                        this.clearValue();
                      }}>
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
