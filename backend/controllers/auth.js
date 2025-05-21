const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, username, password, name, surname, dob, phone } = req.body;

    const checkEmailExists = await User.findOne({ email });

    if (checkEmailExists) {
      return res.status(400).json({
        status: "fail",
        message: "Seems like you already have an account please log in",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
      surname,
      dob,
      phone,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong while trying to create your user",
      error: e.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exists | return 401
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    console.log("User", user.username);

    // compare password matches hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    // check if match | return 401
    if (!passwordMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    // create token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "60m",
      }
    );

    // send back status of 200
    res.status(200).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong while trying to log you in",
      error: e.message,
    });
  }
};
