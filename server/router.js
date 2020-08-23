const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('router is all set and server is running');
});

module.exports = router;