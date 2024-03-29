const Client = require("../models/ArModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

exports.signup = async (req, res) => {
  const { name, email, phone, address, professional_title, cname, experience } =
    req.body;
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await Client.findOne({ email: req.body.email });
  if (user) {
    return res.json({
      status: false,
      errors: [
        {
          param: "email",
          message: "User with this email address already exists.",
          code: "RESOURCE_EXISTS",
        },
      ],
    });
  }
  if (name.length < 2) {
    return res.json({
      status: false,
      errors: [
        {
          param: "name",
          message: "Name should be at least 2 characters.",
          code: "INVALID_INPUT",
        },
      ],
    });
  }
  if (req.body.password.length < 6) {
    return res.json({
      status: false,
      errors: [
        {
          param: "name",
          message: "Name should be at least 2 characters.",
          code: "INVALID_INPUT",
        },
        {
          param: "password",
          message: "Password should be at least 6 characters.",
          code: "INVALID_INPUT",
        },
      ],
    });
  }
  const newUser = new Client({
    name: name,
    email: email,
    phone: phone,
    address: address,
    professional_title: professional_title,
    cname: cname,
    experience: experience,
    password: encryptedPassword,
  });
  await newUser.save();
  res.json({
    status: true,
    content: {
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        professional_title: newUser.professional_title,
        cname: newUser.cname,
        experience: newUser.experience,
        created_at: newUser.created_at,
      }
    },
  });
};

exports.signin = async (req, res) => {
  const user = await Client.findOne({ email: req.body.email });
  // console.log(user);
  try {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      return res.json({
        status: true,
        content: {
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
          },
          meta: {
            access_token: jwt.sign(
              { id: user.id, email: user.email },
              "jojopjeojo",
              {
                expiresIn: "2h",
              }
            ),
          },
        },
      });
    } else if (!user) {
      return res.status(400).json({
        status: false,
        errors: [
          {
            param: "email",
            message: "Please provide a valid email",
            code: "INVALID_CREDENTIALS",
          },
        ],
      });
    } else {
      return res.json({
        status: false,
        errors: [
          {
            param: "password",
            message: "The credentials you provided are invalid",
            code: "INVALID_CREDENTIALS",
          },
        ],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getme = async (req, res) => {
  try {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({
        status: false,
        errors: [
          {
            message: "You need to sign in to proceed.",
            code: "NOT_SIGNEDIN",
          },
        ],
      });
    }
    const token = authHeader.split(" ")[1];
    const data = await jwtDecode(token);
    // console.log(data, "nytj");
    let user = await Client.find({ id: data.id });
    // console.log(user[0].id);
    return res.json({
      status: true,
      content: {
        data: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          created_at: user[0].created_at,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
