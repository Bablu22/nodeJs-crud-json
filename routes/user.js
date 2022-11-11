const router = require("express").Router();
const {
    getUser,
    postUser,
    updateUser,
    multipleUserUpdate,
    deleteUser,
} = require("../controllers/userController");

router.route("/").get(getUser).post(postUser).patch(multipleUserUpdate);
router.route("/:id").patch(updateUser).delete(deleteUser);

module.exports = router;
