import Carts from "../dao/db/carts.js";

const cartsService = new Carts();

export const getCart = async (req, res) => {
    try {
        const cid = req.params.cid;

        const result = await cartsService.getCart(cid);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
}

export const createCart = async (req, res) => {
    try {
        const result = await cartsService.createCart();
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
}

export const upgrateCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        const result = await cartsService.upgrateCart(cid, pid);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
}

export const upgrateCartByBody = async (req, res) => {
    try {
        const cid = req.params.cid;
        const products = req.body;

        const result = await cartsService.upgrateCartByBody(cid, products);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
}

export const updateQuantityProducts = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const { quantity } = req.body

        if (!quantity) {
            res.status(422).send({ status: "error", message: "No se ha recibido quantity para actualizar" });
        } else {
            const result = await cartsService.updateQuantityProducts(cid, pid, quantity);
            res.send({ status: "success", payload: result });
        }
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
}

export const deleteCart = async (req, res) => {
    try {
        const cid = req.params.cid;

        const result = await cartsService.deleteCart(cid);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
}

export const deleteProductToCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        const result = await cartsService.deleteProductToCart(cid, pid);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
}