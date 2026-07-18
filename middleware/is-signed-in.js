// This makes sure only the signed in users could submit a form


const isSignedIn = (req, res, next) => {
    if (req.session.user) return next() // if there is a user keep going
    res.redirect('/auth/sign-in') // if not, redirect them to the sign in page
}

module.exports = isSignedIn