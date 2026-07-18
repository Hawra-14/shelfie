const passUserToView = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user // grap the local objects (the ones after the rendering)
    } else {
        res.locals.user = null
    }
    next()
}

module.exports = passUserToView