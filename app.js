// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// app.use(express.json());
// const cors = require("cors");
// app.use(cors());
// const bcrypt = require("bcryptjs");
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
// const multer = require('multer');

// const jwt = require("jsonwebtoken");
// var nodemailer = require("nodemailer");

// // const JWT_SECRET =
// //   "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

// // const mongoUrl =
// //   "mongodb+srv://adarsh:adarsh@cluster0.zllye.mongodb.net/?retryWrites=true&w=majority";

// const JWT_SECRET = "bkhdbdkchd()Teg2n#fbeheuugfwbhjbvvhbk"; // Define your JWT secret

// const mongoUrl = "mongodb+srv://anushkam254:TjLFXNtclHKd4LbS@cluster0.uwac3kx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



// mongoose
//   .connect(mongoUrl, {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((e) => console.log(e)); 

// require("./userDetails");
// require("./imageDetails");

// const User = mongoose.model("UserInfo");
// const Images = mongoose.model("ImageDetails");
// app.post("/register", async (req, res) => {
//   const { fname, lname, email, password, userType } = req.body;

//   const encryptedPassword = await bcrypt.hash(password, 10);
//   try {
//     const oldUser = await User.findOne({ email });

//     if (oldUser) {
//       return res.json({ error: "User Exists" });
//     }
//     await User.create({
//       fname,
//       lname,
//       email,
//       password: encryptedPassword,
//       userType,
//     });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.send({ status: "error" });
//   }
// });

// app.post("/login-user", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.json({ error: "User Not found" });
//   }
//   if (await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({ email: user.email }, JWT_SECRET, {
//       expiresIn: "15m",
//     });

//     if (res.status(201)) {
//       return res.json({ status: "ok", data: token });
//     } else {
//       return res.json({ error: "error" });
//     }
//   }
//   res.json({ status: "error", error: "InvAlid Password" });
// });

// app.post("/userData", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = jwt.verify(token, JWT_SECRET, (err, res) => {
//       if (err) {
//         return "token expired";
//       }
//       return res;
//     });
//     console.log(user);
//     if (user == "token expired") {
//       return res.send({ status: "error", data: "token expired" });
//     }

//     const useremail = user.email;
//     User.findOne({ email: useremail })
//       .then((data) => {
//         res.send({ status: "ok", data: data });
//       })
//       .catch((error) => {
//         res.send({ status: "error", data: error });
//       });
//   } catch (error) {}
// });

// app.listen(5000, () => {
//   console.log("Server Started");
// });

// app.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const oldUser = await User.findOne({ email });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//       expiresIn: "5m",
//     });
//     const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
   
   
//    //nodemailer part
   
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "anushkamalhotra2003@gmail.com",
//         pass: "icti erwi txcs tthh",
//       },
//     });

//     var mailOptions = {
//       from: "anushkamalhotra2003@gmail.com",
//       to: email,
//       subject: "Password Reset",
//       text: link,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//     console.log(link);
//   } catch (error) {}
// });

// app.get("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   console.log(req.params);
//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     res.render("index", { email: verify.email, status: "Not Verified" });
//   } catch (error) {
//     console.log(error);
//     res.send("Not Verified");
//   }
// });

// app.post("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     await User.updateOne(
//       {
//         _id: id,
//       },
//       {
//         $set: {
//           password: encryptedPassword,
//         },
//       }
//     );

//     res.render("index", { email: verify.email, status: "verified" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "Something Went Wrong" });
//   }
// });

// app.get("/getAllUser", async (req, res) => {
//   let query = {};
//   const searchData = req.query.search;
//   if (searchData) {
//     query = {
//       $or: [
//         { fname: { $regex: searchData, $options: "i" } },
//         { email: { $regex: searchData, $options: "i" } },
//       ],
//     };
//   }

//   try {
//     const allUser = await User.find(query);
//     res.send({ status: "ok", data: allUser });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/deleteUser", async (req, res) => {
//   const { userid } = req.body;
//   try {
//     User.deleteOne({ _id: userid }, function (err, res) {
//       console.log(err);
//     });
//     res.send({ status: "Ok", data: "Deleted" });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/upload-image", async (req, res) => {
//   const { base64 } = req.body;
//   try {
//     await Images.create({ image: base64 });
//     res.send({ Status: "ok" });
//   } catch (error) {
//     res.send({ Status: "error", data: error });
//   }
// });

// app.get("/get-image", async (req, res) => {
//   try {
//     await Images.find({}).then((data) => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) {}
// });





// //gpts
// const Image = mongoose.model("Image", { filename: String });

// // Multer configuration for file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Directory where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // File name will be current timestamp + original file name
//   }
// });

// const upload = multer({ storage: storage });

// // Endpoint to upload image
// app.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const { filename } = req.file;
//   const imagePath = path.join(__dirname, 'uploads', filename);

//   // Save the filename to the database
//   const image = new Image({ filename });
//   image.save()
//     .then(() => {
//       res.json({ filename });
//     })
//     .catch((error) => {
//       // Delete the uploaded file if saving to database fails
//       fs.unlink(imagePath, (err) => {
//         if (err) {
//           console.error("Error deleting file:", err);
//         }
//       });
//       res.status(500).json({ error: "Failed to save image to database" });
//     });
// });

// // Serve uploaded images statically
// app.use('/uploads', express.static('uploads'));





// app.get("/paginatedUsers", async (req, res) => {
//   const allUser = await User.find({});
//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);

//   const startIndex = (page - 1) * limit;
//   const lastIndex = page * limit;

//   const results = {};
//   results.totalUser = allUser.length;
//   results.pageCount = Math.ceil(allUser.length / limit);

//   if (lastIndex < allUser.length) {
//     results.next = {
//       page: page + 1,
//     };
//   }
//   if (startIndex > 0) {
//     results.prev = {
//       page: page - 1,
//     };
//   }
//   results.result = allUser.slice(startIndex, lastIndex);
//   res.json(results);
// });




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));
app.use('/uploads', express.static('uploads'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const JWT_SECRET = "bkhdbdkchd()Teg2n#fbeheuugfwbhjbvvhbk";
const mongoUrl = "mongodb+srv://anushkam254:TjLFXNtclHKd4LbS@cluster0.uwac3kx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

// Ensure the upload directories exist
const uploadDir = path.join(__dirname, 'files');
const imageUploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
if (!fs.existsSync(imageUploadDir)) {
  fs.mkdirSync(imageUploadDir);
}

// Multer configuration for file uploads
const storagePdf = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadPdf = multer({ storage: storagePdf });
const uploadImage = multer({ storage: storageImage });

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
require("./userDetails");
require("./imageDetails");

const User = mongoose.model("UserInfo");
const Images = mongoose.model("ImageDetails");
const Image = mongoose.model("Image", { filename: String });

// File upload endpoint
app.post("/upload-files", uploadPdf.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

// app.get("/get-files", async (req, res) => {
//   try {
//     PdfSchema.find({}).then(data => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) { }
// });


app.get("/get-files", async (req, res) => {
  try {
      const pdf = await PdfSchema.findOne({});
      res.send({ status: "ok", data: pdf });
  } catch (error) {
      res.status(500).send({ status: "error", message: "Failed to fetch PDF file" });
  }
});

//delete pdf
// app.delete("/delete-file/:id", async (req, res) => {
//   const fileId = req.params.id;
//   try {
//     const deletedFile = await PdfSchema.findByIdAndDelete(fileId);
//     if (!deletedFile) {
//       return res.status(404).send({ status: "error", message: "PDF file not found" });
//     }
//     const filePath = path.join(uploadDir, deletedFile.pdf);
//     fs.unlinkSync(filePath); // Delete the file from storage
//     res.send({ status: "ok", message: "PDF file deleted successfully" });
//   } catch (error) {
//     res.status(500).send({ status: "error", message: "Failed to delete PDF file" });
//   }
// });


app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;

    // Nodemailer part
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anushkamalhotra2003@gmail.com",
        pass: "icti erwi txcs tthh",
      },
    });

    var mailOptions = {
      from: "anushkamalhotra2003@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) { }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});


// app.post("/updateUser",async(req,res)=>{
//   const{id,fname,lname}=req.body;
//   try{
//     await User.updateOne({_id:id},{
//       $set:{
//         fname:fname,
//         lname:lname,
//       }
//     });
//     return res.json({status:"ok",data:"updated"})
//   } catch(error){
//     return res.json({status:"error",data:"error"})
//   }
// })


// app.post("/updateUser", async (req, res) => {
//   const { id, fname, lname } = req.body;
//   console.log("Received update request:", req.body);
//   try {
//     await User.updateOne({ _id: id }, {
//       $set: {
//         fname: fname,
//         lname: lname,
//       }
//     });
//     console.log("Update result:", result);
//     return res.json({ status: "ok", data: "updated" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.json({ status: "error", data: error });
//   }
// });



// app.post("/updateUser", async (req, res) => {
//   const { id, fname, lname } = req.body;
//   console.log("Received update request:", req.body);
//   try {
//     const result = await User.updateOne({ _id: id }, {
//       $set: {
//         fname: fname,
//         lname: lname,
//       }
//     });
//     console.log("Update result:", result);
//     if (result.nModified === 1) {
//       return res.json({ status: "ok", data: "updated" });
//     } else {
//       return res.json({ status: "error", data: "No user updated" });
//     }
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.json({ status: "error", data: error });
//   }
// });




app.post("/updateUser", async (req, res) => {
  const { id, fname, lname } = req.body;
  console.log("Received update request:", req.body);
  try {
    console.log("Attempting to update user...");
    const result = await User.updateOne({ _id: id }, {
      $set: {
        fname: fname,
        lname: lname,
      }
    });
    console.log("Update result:", result);
    if (result.nModified === 1) {
      console.log("User updated successfully.");
      return res.json({ status: "ok", data: "updated" });
    } else {
      console.log("No user updated.");
      return res.json({ status: "error", data: "No user updated" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.json({ status: "error", data: error });
  }
});


app.get("/getAllUser", async (req, res) => {
  let query = {};
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { fname: { $regex: searchData, $options: "i" } },
        { email: { $regex: searchData, $options: "i" } },
      ],
    };
  }

  try {
    const allUser = await User.find(query);
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    User.deleteOne({ _id: userid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ Status: "ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    await Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) { }
});

// Endpoint to upload image
app.post("/upload", uploadImage.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { filename } = req.file;
  const imagePath = path.join(__dirname, 'uploads', filename);

  // Save the filename to the database
  const image = new Image({ filename });
  image.save()
    .then(() => {
      res.json({ filename });
    })
    .catch((error) => {
      // Delete the uploaded file if saving to database fails
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
      res.status(500).json({ error: "Failed to save image to database" });
    });
});

// Paginated users endpoint
app.get("/paginatedUsers", async (req, res) => {
  const allUser = await User.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const results = {};
  results.totalUser = allUser.length;
  results.pageCount = Math.ceil(allUser.length / limit);

  if (lastIndex < allUser.length) {
    results.next = {
      page: page + 1,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    };
  }
  results.result = allUser.slice(startIndex, lastIndex);
  res.json(results);
});

// Simple API endpoint for testing
app.get("/", async (req, res) => {
  res.send("Success!!");
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});









