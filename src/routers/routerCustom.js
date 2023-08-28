const { Router } = require('express')

class RouterCustom {
    constructor() {
        this.router = Router()
        this.init()
    }

    init() { }

    getRouter() {
        return this.router
    }

    get(path, ...callBacks) {
        this.router.get(path, this.applyCallBacks(callBacks))
    }

    applyCallBacks(callbacks) {
        return callbacks.map(cb => async (...params) => {
            try {
                await cb.apply(this, params)
            } catch (error) {
                params[1].status(500).send(error)
            }
        })
    }
}

module.exports = RouterCustom