const router = require('./api');
const User = require('../models/user');

router.post('/logout', async (req, res)=>{
    req.logOut();
    res.redirect(process.env.CLIENT_REDIRECT);
});

module.exports = router;
