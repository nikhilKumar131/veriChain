import React, { useState } from 'react'
import styles from "../../styles/Home.module.css"
import style from "@/styles/History.module.css"

class Player extends React.Component {

    constructor(props) {
        super(props);

        // Set initial state 
        this.state = {
            status: false,
            id: this.props.id
        };
    }
    clickHandler = async (props) => {
        if (this.state.status == false) { this.setState({ status: true }), () => { console.log(this.state.status) } }
        else { this.setState({ status: false }), () => { console.log(this.state.status) } }
        console.log(this.state.status)
    }

    
    render() {
        return (
            
            <div className={styles.playerCard } style={{ backgroundColor: this.state.status ? "#0d0d19" : "white" }}>
                <img src={`${this.props.id}.jpeg`} />
                <button onClick={this.clickHandler}  className={style.buttons}>{this.props.id}</button>
            </div>
        )
    }
}

export default Player;