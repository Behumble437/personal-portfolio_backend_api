const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// create jwt token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// SIGN UP
module.exports.signup = async function (req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const newUser = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        created: newUser.created,
        updated: newUser.updated,
      },
    });
  } catch (error) {
    console.log("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// SIGN IN
module.exports.signin = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Sign in successful.",
      token: token,
      data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        created: user.created,
        updated: user.updated,
      },
    });
  } catch (error) {
    console.log("Signin error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL USERS
module.exports.getUsers = async function (req, res, next) {
  try {
    let users = await User.find({}, "-password").sort({ created: -1 });

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// GET USER BY ID
module.exports.getUserById = async function (req, res, next) {
  try {
    let id = req.params.id;

    let user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// UPDATE USER
module.exports.updateUser = async function (req, res, next) {
  try {
    let id = req.params.id;
    const { firstname, lastname, email, password } = req.body;

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // update fields only if sent
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email.toLowerCase();

    // if password is updated, hash it manually
    if (password) user.password = password;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        created: user.created,
        updated: user.updated,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// DELETE USER
module.exports.deleteUser = async function (req, res, next) {
  try {
    let id = req.params.id;

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};