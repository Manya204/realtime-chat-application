import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "")

        if(!user || !isPasswordCorrect){
          return res.status(400).json({error:"Invalid email or password"});
        }

        generateToken(user._id,res);
        res.status(200).json({
          _id:user._id,
          profile:user.profile,
        })
        

    }catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
};

export const logout = async (req, res) => {
  try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"});

  }catch (error) {
        console.log("Error in logout", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //hashing of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //https://avatar.placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      profile: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {

      generateToken(newUser._id,res);
        await newUser.save();

        res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        gender: newUser.gender,
        profile: newUser.profile,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" }); //client error
    }
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({ error: "Internal server error" }); //server error
  }
};
