import Messages from "../dao/db/messages.js";

const managerMessages = new Messages();

export const getMessages = async (req, res) => {
    try {
        const messages = await managerMessages.getMessages();
        res.send(messages);
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
}

export const addMessage = async (req, res) => {
    try {
        const {user, message} = req.body;

        const result = await managerMessages.addMessage(user, message);
        res.send({ status: "success", payload: result });   
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
}