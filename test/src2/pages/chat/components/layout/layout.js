import PropTypes from "prop-types"
import React from "react"
import styles from "./layout.module.css"

export const Layout = ({ header, chats, messages }) => {
    return (
        <div className={styles.body}>
            <div className={styles.header}>
                {header}
            </div>

            <div className={styles.content}>
                <div className={styles.chats}>
                    {chats}
                </div>
                <div className={styles.messages}>
                    {messages}
                </div>
            </div>
        </div>
    )
}

Layout.propTypes = {
    header: PropTypes.node.isRequired,
    chats: PropTypes.node.isRequired,
    messages: PropTypes.node.isRequired,
}




