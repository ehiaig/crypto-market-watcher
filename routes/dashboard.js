const express = require('express');

const router = express.Router();


router.get('/dashboard', (req, res) => {

   res.render('dashboard', {
      title: 'Crypto Market Dashboard'
   })
});


module.exports = router;
