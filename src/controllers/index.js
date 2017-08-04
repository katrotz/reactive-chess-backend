const express = require('express');
const router = express.Router();
const pkg = require('./../../package.json');

router.use('/graphql', require('./graphql'));

router.route('/')
    .get((req, res) => {
        res.json({
            name: pkg.name,
            version: pkg.version,
            description: pkg.description
        });
    });

module.exports = router;
