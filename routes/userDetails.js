const router = require('./api');
const User = require('../models/userDetails');
router.get('/getContactInfo', async (req, res, next) => {
  try {
    const users = await User.getRecrods()
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Error While getting Shipping Details");
  }
});

router.get('/getContactInfo/:id', async (req, res, next) => {
  console.log("param", req.params.id)
  try {
    const users = await User.getRecrod({ '_id': req.params.id })
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Error While getting Shipping Details");
  }
});

router.post('/contactInfo', async (req, res, next) => {
  if (req.body) {
    let users = null;
      users = await User.createRecrod({
        id: req.body._id,
        full_name: req.body.full_name,
        email: req.body.email,
        full_address: req.body.full_address,
        city_name: req.body.city_name,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        billing_address: req.body.billing_address,
        billing_city_name: req.body.billing_city_name,
        billing_state: req.body.billing_state,
        billing_zip_code: req.body.billing_zip_code,
        billing_country: req.body.billing_country,
        card_no: req.body.card_no,
        valid_date: req.body.valid_date,
        CVC: req.body.CVC
      });
      res.json(users);
  } else {
    res.json({
      error: 'The input field is empty'
    })
  }
});

module.exports = router;
