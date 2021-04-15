import {ListItem} from "@material-ui/core"
import PropTypes from "prop-types"

import React from "react";
import styles from "./chat.module.css"

export const Chat = ({handleListItemClick, selected, title}) => {
    return (
        <ListItem
            button={true}
            selected={selected}
            onClick={handleListItemClick}
        >
            <span className={styles.text}>{title}</span>
        </ListItem>
    )
}

Chat.propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    handleListItemClick: PropTypes.func.isRequired,
}