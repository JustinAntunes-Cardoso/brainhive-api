const router = require("express").Router();

const {
  getEasyWords,
  getMediumWords,
  getHardWords
} = require("../controllers/wordsController");

router.route("/easy").get(getEasyWords);

router.route("/medium").get(getMediumWords);

router.route("/hard").get(getHardWords);

module.exports = router;