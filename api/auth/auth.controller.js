const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    console.log('req.body in login in auth controller', req.body);
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        // console.log('req.body in signup in user service', req.body);
        const { username, password, fullname, imgUrl, email,savedNotifications } = req.body
        // Never log passwords
        // logger.debug(fullname + ', ' + username + ', ' + password)
        const account = await authService.signup(username, password, fullname, imgUrl, email,savedNotifications)//ADD IS HOST AND ORDERS
        // const account = await authService.signup(req.body)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))//good
        const user = await authService.login(username, password)
        // const user = await authService.login(req.body)
        req.session.user = user//not good
        console.log('req.session.user in signup', req.session.user);//not good//diff object
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res){
    try {
        // req.session.destroy()
        req.session.user = null;
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}