const User = require("../db/userScema");
const Blogs = require("../db/blogScema");
const Comment = require("../db/commentSchema")
const path = require("path");
const mongoose = require('mongoose')

const loginController = async (req, res) => {
  const { rollNo, Name } = req.body;

  try {
    const user = await User.findOne({ rollNo: rollNo, Name: Name });

    if (user.rollNo == rollNo && user.Name == Name) {
      res.redirect("/api/question");
    } else {
      res.status(404).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const registerController = async (req, res) => {
  const { email, password, } = req.body;
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      res.status(500).send({ message: "User already Exists" });
    } else {
      await User.create({ email: email, password: password})
          .then(() => {
          res.send("User Created");
        })
        .catch((err) => {
          console.log(err);
        });
        
        //res.redirect("/api/login");
      }
  } catch (err) {
    console.log(err);
  }
};

const getLoginController = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
};

//      GET BLOGS
const getBlogsController = async (req, res) => {
    const u_id = req.params.id;
    const blogs = await Blogs.find({}).populate('createdBy');
  
  let usersBlogs = blogs.filter((item) => {
      if (item.createdBy.id === u_id) {
        console.log(item)
        return true;
      }
    })
    res.send(usersBlogs);
};
//     POST BLOGS
    
const postBlogsController = async (req, res) => {
    const { author, title, desc, email,likes,dislikes } = req.body;
    let u_id = await User.findOne({ email: email });
    try {
        let blogs = await Blogs.create({
          author: author,
          title: title,
          desc: desc,
          likes: likes,
          dislikes: dislikes,
          createdBy:u_id._id
        });

      await User.updateOne({ email: email }, { $push: { blogs: blogs.id } });

        res.send("Blog Posted");
        console.log(blogs)
    } catch (err){
        console.log(err);
    }
};
    // POST COMMENTS
const commentController = async (req, res) => {
  try {
    const b_id = req.params.id;
    const { content, email } = req.body;
    const u_id = await User.findOne({ email: email })
    console.log(u_id)
    await Comment.create({ content: content, blogId: b_id, createdBy: u_id._id })
    res.send("Comment Addeded...")
  } catch (err) {
    if (err) console.log(err);
  }
};

// GET COMMENTS
    
const getCommentController = async (req, res) => {
  try {
    const b_id = req.params.id;
    const blog = await Blogs.find({ _id: b_id }).populate("createdBy");
    const comment = await Comment.find({ blogId: b_id }).populate("createdBy");
    console.log("comment", comment);
    console.log("blog", blog);
    res.send(comment)
  } catch (err) {
    if (err) console.log(err);
  }
};



module.exports = {
  loginController,
  registerController,
  getLoginController,
  getBlogsController,
  postBlogsController,
  commentController,
  getCommentController,
};
