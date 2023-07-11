// const {
//   default: Conversation,
// } = require("../../frontend/src/components/conversation/conversation");
User = require("./user.model");
Post = require("./post.model");
Product = require("./product.model");
Comments = require("./comment.model");
User_Per = require("./user_permistion.model");
Conversations = require("./conversation.model");
Message = require("./message.model");
const db = {};
db.User = User;
db.Post = Post;
db.Product = Product;
db.Comments = Comments;
db.User_Per = User_Per;
db.Message = Message;
db.Conversations = Conversations;
module.exports = { db };
