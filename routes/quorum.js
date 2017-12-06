const router = require('express').Router();
const quorum = require('../controllers/quorum');


router.post("/create/slice", quorum.createSlice);
router.get("/view/quorum", quorum.veiwQuorum);

module.exports = router;