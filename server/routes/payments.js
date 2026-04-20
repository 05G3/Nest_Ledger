const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const auth = require('../middleware/authMiddleware');

const RENT = 6200;
const RATE = 325; // per 100 units

// Add payment
router.post('/', auth, async (req, res) => {
  try {
    const { type, units, month, year } = req.body;

    let amount = 0;
    if (!type || !month || !year) {
  return res.status(400).json("Missing fields");
}

if (type === 'electricity' && (!units || units < 0)) {
  return res.status(400).json("Invalid units");
}

    if (type === 'rent') {
      amount = RENT;
    } else if (type === 'electricity') {
      amount = Math.round((units / 100) * RATE);
    }

    const payment = await Payment.create({
      userId: req.user.id,
      type,
      units,
      amount,
      month,
      year,
      status: 'paid'
    });

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all payments
router.get('/', auth, async (req, res) => {
try{
  const data = await Payment.find({ userId: req.user.id });
  res.json(data);
}catch(err){
  res.status(500).json({ error: err.message });
}
});

module.exports = router;