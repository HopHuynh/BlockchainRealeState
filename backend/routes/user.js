const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");
const checkRole = require("../middleware/checkRole");
const router = require("express").Router();
const verify = require("../middleware/index");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

//ADD AUTHOR

router.post("/dsfs", userController.addUser);
router.post("/signup", verify.verifySignUp2, authController.signup);
router.post("/signin/", authController.signin);
router.post("/comment", verify.authJwt2, userController.addComment);

router.put("/reset-password", authController.resetPassword);

router.put(
  "/api/profile/:id",
  upload.single("img_url"),
  userController.updateAvatar
);
//Forget password & reset password
// router.post("/forgotPassword", authController.forgotPassword);
// router.post("/resetPassword/:token", authController.resetPassword);

//CRUD Post
// router.post(
//   "/post",
//   verify.authJwt2,
//   upload.single("img_url"),
//   userController.addPost
// );

router
  .route("/post")
  .post(verify.authJwt2, upload.array("img_url"), userController.addPost);
router.get("/post", userController.getListPost);
router.get("/post:id", userController.post_details);
// router.put("/post:id",  userController.updatePost);
router.put("/post:id", userController.editPost);

router.delete("/post:id", userController.deletePost);
router.get("/post/user:id", verify.authJwt2, userController.getPosts);

//Pagination
router.get("/post/pagination", userController.paginationPost);

//Search
router.get("/search/:key", userController.searchByKey);
router.get("/conversation/:userId", userController.findUserConversation);
//Filter
router.get("/products/filter/price", userController.getProductsByPrice);
router.post("/user/conversation", userController.addConversation);
router.get("/user/chat/:id", userController.findUser);

router.get(
  "/find/:firstUserId/:secondUserId",
  userController.findTwoConversation
);
router.post("/user/message", userController.addnewMessage);
router.get("/user/message:conversationId", userController.getMessage);

//Admin
router.get("/api/users", userController.getUserList);
router.get("/api/admin/role", verify.authJwt2, userController.getRoleList);

router.delete("/api/users/:id", userController.deleteUser);
router.put("/api/users/:id", userController.editUser);
router.get("/api/user/detail/:id", userController.findUser);

// router.delete(
//   "/admin/:id",
//   verify.authJwt2,
//   checkRole.isAdmin,
//   userController.deleteUser
// );
// router.put(
//   "/admin/:id",
//   verify.authJwt2,
//   checkRole.isAdmin,
//   userController.editUser
// );

//Gov
router.post(
  "/room",
  // verify.authJwt2,
  // checkRole.isGov,
  userController.createRoom
);

router.get(
  "/room/lists",

  userController.getRoomList
);
router.get(
  "/room/users",
  verify.authJwt2,
  checkRole.isGov,
  userController.getUserList
);
router.get(
  "/room/:id",
  // verify.authJwt2,
  // checkRole.isGov,
  userController.getRoom
);
router.put(
  "/room/:id",
  // verify.authJwt2,
  // checkRole.isGov,
  userController.updateRoom
);

// router.get(
//   "/room/users/:id",
//   verify.authJwt2,
//   checkRole.isGov,
//   userController.findUserList
// );

// Notification
router.post("/notif", userController.createNotif);
router.get("/notif/list", userController.getNotifListDsc);
router.get("/notif/count", userController.getNotifLength);
router.get("/notif/role/:role", userController.getRoleNotif);
router.get("/notif/:id", verify.authJwt2, userController.getNotif);
router.put("/notif/:id", userController.updateNotif);
router.get("/notif/status/:id", userController.getNotifStatus);

router.post("/authDocs/", userController.addAuthDocs);
router.get("/authDocs/:id", userController.getAuthDocs);
router.post("/authImgs/", userController.addAuthImgs);
router.get("/authImgs/:id", userController.getAuthImg);
module.exports = router;
