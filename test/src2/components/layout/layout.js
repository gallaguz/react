import PropTypes from "prop-types"
import React from "react"
import styles from "./layout.module.css"

export const Main = ({ header, content }) => {
    return (
        <div className={styles.body}>
            <div className={styles.header}>
                {header}
            </div>

            <div className={styles.content}>
                {content}
            </div>
        </div>
    )
}

Main.propTypes = {
    header: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
}




