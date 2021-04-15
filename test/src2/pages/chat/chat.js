import { ThemeProvider } from "@material-ui/core";
import PropTypes from "prop-types"
import React from "react"
import { Layout, Header, ChatList, MessageList} from "./components";

export const Chat = ({theme}) => {
    return (
        <ThemeProvider theme={theme}>
            <Layout
                header={<Header />}
                chats={<ChatList />}
                messages={<MessageList />}
            />
        </ThemeProvider>
    )
}

Chat.propTypes = {
    theme: PropTypes.object
}