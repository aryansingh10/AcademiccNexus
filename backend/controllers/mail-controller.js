const nodemailer = require("nodemailer");
const sclass = require("../models/sclassSchema.js");
const subject = require("../models/subjectSchema.js");
const dotenv = require("dotenv");
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail', 'Yahoo', 'Outlook'
  auth: {
    user: process.env.MAIL_USERID,
    pass: process.env.MAIL_PASS,
  },
});

const sendMailTeacher = async (req, res) => {
  try {
    const { email, sclassName, password, subName } = req.body;
    // Details of the booked ride
    console.log(req.body);
    const classDetail = await sclass.findById(sclassName);
    const subjectDetail = await subject.findById(subName);
    // console.log("17", classDetail);
    // console.log(classDetail.sclassName);

    const mailOptions = {
      from: "jaiswalarpit1414@gmail.com", // Sender's email address
      to: email,
      subject: "Academic Nexus : Notifiaction to Teachers",
      text: `Your are register for the ${classDetail.sclassName} for subject ${subjectDetail.subName} with an email ${email} and password ${password} `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to  confirmation email.");
      } else {
        console.log("Email sent:", info.response);
        res.status(200).send("Confirmation email sent.");
      }
    });
  } catch (error) {
    console.log("error while sending mail", error);
  }
};

const sendMailStudent = async (req, res) => {
  try {
    const { email, status, rollNum, sclassName, password, date, subName } =
      req.body;
    // Details of the booked ride
    console.log(req.body);
    const classDetail = await sclass.findById(sclassName);
    const subjectDetail = await subject.findById(subName);
    // console.log("17", classDetail);
    // console.log(classDetail.sclassName);

    const mailOptions = {
      from: "jaiswalarpit1414@gmail.com", // Sender's email address
      to: email,
      subject: "Academic Nexus : Notification to Students",
      text: status
        ? `You'r Attendance is marked with status ${status} for subject ${subjectDetail.subName} on ${date} `
        : `You are Added to the ${classDetail.sclassName} , your roll ${rollNum} and password ${password}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to  confirmation email.");
      } else {
        console.log("Email sent:", info.response);
        res.status(200).send("Confirmation email sent.");
      }
    });
  } catch (error) {
    console.log("error while sending mail", error);
  }
};

module.exports = { sendMailStudent, sendMailTeacher };
