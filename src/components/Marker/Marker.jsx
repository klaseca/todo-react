import React, { Component } from 'react'
import styles from "./s.module.css";

export default class Marker extends Component {
  render() {
    return (
      <div className={styles.marker}>
        {this.props.text}
      </div>
    )
  }
}
