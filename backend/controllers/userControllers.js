const { User } = require("../models/user.model.js");
const { Comment } = require("../models/comment.model");
const { Post } = require("../models/post.model");
const { Conversations } = require("../models/conversation.model");
const { RoomOrder } = require("../models/room_order.model.js");
// const db = require("../models/index");
const { Landpapers } = require("../models/landpapers.model");
const { Message } = require("../models/message.model.js");
const { Notif } = require("../models/notif.model.js");
const { AuthDocSchema } = require("../models/authDoc.model.js");
const { AuthImgSchema } = require("../models/authImg.model.js");

const userController = {
  //ADD AUTHOR
  addUser: async (req, res) => {
    try {
      const newAuthor = new User(req.body);
      const savedAuthor = await newAuthor.save();
      res.status(200).json({ statusCode: 200, content: savedAuthor });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //Update user
  editUser: async (req, res) => {
    try {
      const eUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );

      if (eUser) {
        res
          .status(200)
          .json({ statusCode: 200, message: "Updated successful" });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //Delete user by admin
  deleteUser: async (req, res) => {
    try {
      const dUser = await User.findByIdAndRemove({ _id: req.params.id });

      if (dUser) {
        res.status(200).json({ statusCode: 200, message: "Success" });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  getUserList: async (req, res) => {
    try {
      const userList = await User.find({}).sort({ roles: 1 });
      console.log(userList);
      if (userList.length > 0) {
        res.status(200).json({ statusCode: 200, content: userList });
      } else {
        res.status(200).json({ statusCode: 200, message: [] });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getRoleList: async (req, res) => {
    try {
      const { roles } = req.query;

      let query = {};
      if (roles) {
        query = { roles: roles };
      }
      const userList = await User.find(query).lean();
      console.log(userList);
      if (userList.length > 0) {
        res.status(200).json({ statusCode: 200, content: userList });
      } else {
        res.status(200).json({ statusCode: 200, message: [] });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  // findUserList: async (req, res) => {
  //   try {
  //     const userList = await RoomOrder.findById({
  //       _id: req.params.id,
  //     }).populate("user");
  //     console.log(userList);
  //     if (userList) {
  //       res.status(200).json({ statusCode: 200, content: userList });
  //     } else {
  //       res.status(400).json({ statusCode: 200, message: "Not users!" });
  //     }
  //   } catch (err) {
  //     res.status(500).json(err); //HTTP REQUEST CODE
  //   }
  // },

  findUser: async (req, res) => {
    try {
      // console.log("req", req.body);
      // const newUser = new User(req.body);
      console.log("req", req.params);
      const user = await User.findOne({ _id: req.params.id });
      if (user) {
        res.status(200).send({ statusCode: 200, content: user });
      }

      // .then((user) => {
      //   if (user) {
      //     res.status(200).send({ statusCode: 200, message: user.name });
      //   }
      // })
      // .catch((error) => {
      //   res.status(404).send({ statusCode: 404, message: error.message });
      // });
    } catch (err) {
      res.status(500).send(err); //HTTP REQUEST CODE
    }
  },
  updateAvatar: async (req, res) => {
    try {
      const userId = req.params.id;
      const img_url = req.file.filename; // Lấy tên tệp avatar đã tải lên (filename thay vì originalname)

      const editAvt = await User.findByIdAndUpdate(
        userId,
        { img_url: img_url }, // Sử dụng tên tệp để cập nhật img_url
        { new: true }
      );

      console.log(editAvt);
      if (editAvt) {
        await editAvt.save();
        res.status(200).json({ statusCode: 200, message: "Success" });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //CRUD Comment
  addComment: async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      res.status(200).json({ statusCode: 200, content: savedComment });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //CRUD Post
  addPost: async (req, res) => {
    const {
      user,
      index,
      price,
      area,
      length,
      wide,
      status,
      address,
      name,
      floor,
      juridical,
      interior,
      bedroom,
      bathroom,
      usablearea,
    } = req.body;
    console.log("hgds", user);
    const img_url = req.files?.map((file) => file.originalname);

    const post = new Post({
      user,
      img_url,
      index,
      price,
      area,
      length,
      wide,
      status,
      address,
      name,
      floor,
      juridical,
      interior,
      bedroom,
      bathroom,
      usablearea,
    });

    post.save().then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully",
        content: createdPost,
      });
    });
  },

  add_file_land_paperfile: (req, res) => {
    console.log("req.file", req);
    const file = req.file.filename;

    const landpapersFile = new Landpapers({ file });
    landpapersFile.save().then((landpapers) => {
      res.status(201).json({
        message: "Post added successfully",
        content: landpapers,
      });
    });
  },
  add_file_land_paperimg: (req, res) => {
    console.log("req.file", req.file.filename);

    const img_url = req.file.filename;
    const landpapersImg = new Landpapers({ img_url });
    landpapersImg.save().then((landpapers) => {
      res.status(201).json({
        message: "Post added successfully",
        content: landpapers,
      });
    });
  },
  post_details: async (req, res) => {
    try {
      const detail = await Post.findById({ _id: req.params.id }).populate(
        "user"
      );

      if (detail) {
        res
          .status(200)
          .json({ statusCode: 200, message: "thành công", content: detail });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getListPost: async (req, res) => {
    try {
      const listPost = await Post.find({});

      if (listPost.length > 0) {
        res.status(200).json({ statusCode: 200, content: listPost });
      } else {
        res.status(200).json({ statusCode: 200, message: [] });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  editPost: async (req, res) => {
    try {
      const ePost = await Post.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );

      if (ePost) {
        res.status(200).json({ statusCode: 200, content: ePost });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  updatePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const { name, price, area, address } = req.body;
      console.log("post ID", postId);

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          name,
          price,
          area,
          address,
        },
        { new: true }
      );

      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const dPost = await Post.findByIdAndRemove({ _id: req.params.id });

      if (dPost) {
        res.status(200).json({ statusCode: 200, message: "Success" });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  paginationPost: async (req, res) => {
    // Get page number and limit from query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // Calculate skipIndex
    const skipIndex = (page - 1) * limit;

    try {
      // Get posts with skip and limit
      const results = await Post.find().skip(skipIndex).limit(limit);

      // Get total count of posts
      const count = await Post.countDocuments();

      // Calculate total number of pages
      const totalPages = Math.ceil(count / limit);

      res.status(200).json({
        posts: results,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // chat mess
  addConversation: async (req, res) => {
    try {
      const conversation = await Conversations.findOne({
        members: { $all: [req.body.senderId, req.body.reciverId] },
      });
      if (!conversation) {
        const newConversation = await new Conversations({
          members: [req.body.senderId, req.body.reciverId],
        });
        const savedConversation = await newConversation.save();

        res.status(200).json({ statusCode: 200, content: savedConversation });
      } else {
        res.status(200).json({ statusCode: 200, content: "đã có" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  findUserConversation: async (req, res) => {
    console.log("hágdgsa", req.params.userId);
    try {
      const conversation = await Conversations.find({
        members: { $in: [req.params.userId] },
      });
      console.log("hágdgsa", conversation);

      res.status(200).json({ statusCode: 200, content: conversation });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  findTwoConversation: async (req, res) => {
    try {
      const conversation = await Conversations.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addnewMessage: async (req, res) => {
    const newMessage = new Message(req.body);

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get

  getMessage: async (req, res) => {
    console.log("idconversation", req.params.conversationId);
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json({ content: messages });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get API Post join User

  getUserPosts: async (req, res) => {
    try {
      const userData = await User.findOne({ _id: req.params.id }).populate(
        "Post"
      );
      if (userData) {
        res.status(200).json({ statusCode: 200, message: userData });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //Search
  searchByKey: async (req, res) => {
    try {
      const title = await Post.find({
        // Search không biệt in hoa/thường
        name: { $regex: new RegExp(req.params.key, "i") },
        // $or: [{ name: { $regex: req.params.key } }],
      });

      if (title) {
        res.status(200).json({ statusCode: 200, title });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  getPosts: async (req, res) => {
    try {
      const postData = await Post.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_id",
          },
        },
      ]);
      if (postData) {
        res.status(200).json({ statusCode: 200, message: postData });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //Filter price
  getProductsByPrice: async (req, res) => {
    try {
      const minPrice = parseInt(req.query.minPrice) || 0;
      const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_VALUE;
      const filteredProducts = await Post.find({
        price: { $gte: minPrice, $lte: maxPrice },
      });
      res.status(200).json({ products: filteredProducts });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createNotif: async (req, res) => {
    try {
      const { userId, username, userWallet, postId, type, to, detail } =
        req.body;
      const addNotif = new Notif({
        userId,
        username,
        userWallet,
        postId,
        type,
        to,
        detail,
      });

      addNotif.save().then((addNotif) => {
        res.status(201).json({
          message: "Room added successfully",
          content: addNotif,
        });
      });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getNotif: async (req, res) => {
    try {
      const notif = await Notif.findById({ _id: req.params.id }, req.body);
      console.log(notif);
      if (notif) {
        res
          .status(200)
          .json({ statusCode: 200, message: "Successful", content: notif });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getRoleNotif: async (req, res) => {
    try {
      const notifs = await Notif.find({ to: req.params.role });
      console.log(notifs);
      if (notifs) {
        res
          .status(200)
          .json({ statusCode: 200, message: "Successful", content: notifs });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getNotifList: async (req, res) => {
    try {
      const listNotif = await Notif.find({});
      if (listNotif) {
        res
          .status(200)
          .json({ statusCode: 200, message: "Successful", content: listNotif });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  getNotifListDsc: async (req, res) => {
    try {
      const listNotif = await Notif.find({}).sort({ _id: -1 });
      if (listNotif) {
        res
          .status(200)
          .json({ statusCode: 200, message: "Successful", content: listNotif });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getNotifListDsc: async (req, res) => {
    try {
      const listNotif = await Notif.find({}).sort({ _id: -1 });
      if (listNotif) {
        res
          .status(200)
          .json({ statusCode: 200, message: "Successful", content: listNotif });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getNotifLength: async (req, res) => {
    try {
      const countNotif = await Notif.find({});

      if (countNotif) {
        res.status(200).json({
          statusCode: 200,
          message: "Successful",
          content: { count: countNotif.length },
        });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getNotifStatus: async (req, res) => {
    try {
      const findStatus = await Notif.findOne({ status: true });

      if (findStatus) {
        res.status(200).json({
          statusCode: 200,
          message: "Successful",
          content: findStatus,
        });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  updateNotif: async (req, res) => {
    try {
      const notifId = req.params.id;
      const newStatus = req.body.status;
      const editNotif = await Notif.findByIdAndUpdate(
        notifId,
        { status: newStatus },
        { new: true }
      );

      if (editNotif) {
        res.status(200).json({
          statusCode: 200,
          message: "Successful",
          content: editNotif,
        });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  // Gov
  createRoom: async (req, res) => {
    try {
      const { sellerId, BuyerIds, status } = req.body;
      console.log("BuyerIds", BuyerIds);
      const roomOrder = new RoomOrder({
        sellerId,
        BuyerIds,
        status,
      });

      roomOrder.save().then((createdRoom) => {
        res.status(201).json({
          message: "Room added successfully",
          content: createdRoom,
        });
      });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getRoomList: async (req, res) => {
    try {
      const listRoom = await RoomOrder.find({});
      if (listRoom) {
        res.status(200).json({ statusCode: 200, message: listRoom });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getRoom: async (req, res) => {
    try {
      const Room = await RoomOrder.findById({ _id: req.params.id }, req.body);
      if (Room) {
        res.status(200).json({ statusCode: 200, message: Room });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  updateRoom: async (req, res) => {
    try {
      const updateRoom = await RoomOrder.findByIdAndUpdate(
        { _id: req.params.id },
        { status: true }
      );
      if (updateRoom) {
        res
          .status(200)
          .json({ statusCode: 200, message: "Updated successful" });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  addAuthDocs: async (req, res) => {
    try {
      const { urls, from, postId } = req.body;
      const addAuthDocs = new AuthDocSchema({
        urls,
        from,
        postId,
      });

      addAuthDocs.save().then((data) => {
        res.status(200).json({
          message: "Docs added successfully",
          content: data,
        });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAuthDocs: async (req, res) => {
    try {
      const data = await AuthDocSchema.find({ postId: req.parms.id });
      if (data) {
        res.status(200).json({ data });
      } else {
        res.status(404).json({ data: "Not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("interal server error");
    }
  },
  addAuthImgs: async (req, res) => {
    try {
      const { urls, from, postId } = req.body;
      const addAuthDocs = new AuthImgSchema({
        urls,
        from,
        postId,
      });

      addAuthDocs.save().then((data) => {
        res.status(200).json({
          message: "Docs added successfully",
          content: data,
        });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAuthImg: async (req, res) => {
    try {
      const data = await AuthImgSchema.find({ postId: req.parms.id });
      if (data) {
        res.status(200).json({ data });
      } else {
        res.status(404).json({ data: "Not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("interal server error");
    }
  },
};
module.exports = userController;
