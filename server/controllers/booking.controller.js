const catchAsync = require("../utils/catchAsync");
const Booking = require("./../models/booking");
const sendEmail = require("../utils/email");
const stripe = require("stripe")(
  "sk_test_51L9MW0SG4PrYvfaFRs0xKudT94mEtRm3IsLvJVeRjm4tcCQuDyidVFrkJAL3tsnnC6eP5cmTW4Y7Cj0HLBR2wCJL00XY0Bx4X8"
);
const fs = require("fs");

exports.getAllBookings = catchAsync(async (req, res, next) => {
  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  const bookings = await Booking.find().skip(skip).limit(limit);

  res.status(200).json({
    status: "success",
    data: bookings,
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: booking,
  });
});

exports.getStripeKey = catchAsync(async (req, res, next) => {
  // Stripe Payment integration
  const total = req.body.amount;

  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "inr",
  });

  res.status(201).json({
    status: "success",
    data: {
      clientSecret: payment.client_secret,
    },
  });
});

exports.sendPaymentMail = catchAsync(async (req, res, next) => {
  //1) Send it to user's email
  const message = `Thank you for your payment of`;

  //1A) Reading template from the views
  let template = fs.readFileSync(
    `${__dirname}/../views/mail_template.handlebars`,
    "utf-8"
  );

  const original_template = template;
  template = template.replace(/{%MESSAGE%}/g, message);
  template = template.replace(/{%TITLE%}/g, "Payment received");
  template = template.replace(/{%NOPAYMENT%}/g, "payment");
  template = template.replace(/{%USERNAME%}/g, req.user.name);
  template = template.replace(/{%AMOUNT%}/g, req.body.amount);
  template = template.replace(/{%RESETPASSWORD%}/g, "");
  template = template.replace(
    /{%DATE%}/g,
    String(new Date(Date.now()).toDateString()).slice(4)
  );
  template = template.replace(/{%HOTEL%}/g, req.body.hotel);
  template = template.replace(/{%ROOMNUMBERS%}/g, req.body.rooms);
  template = template.replace(/{%DATES%}/g, req.body.dates);

  //3B) Writing into the template file
  fs.writeFileSync(
    `${__dirname}/../views/mail_template.handlebars`,
    template,
    "utf-8"
  );

  try {
    await sendEmail({
      email: req.user.email,
      subject: "Payment sucess",
    });

    //Finally, writing the original file again
    fs.writeFile(
      `${__dirname}/../views/mail_template.handlebars`,
      original_template,
      "utf-8",
      () => {
        console.log("completed writing back...");
      }
    );

    return res.status(200).json({
      status: "success",
      message: "payment success",
    });
  } catch (err) {
    //Finally, writing the original file again
    fs.writeFile(
      `${__dirname}/../views/mail_template.handlebars`,
      original_template,
      "utf-8",
      () => {
        console.log("completed writing back...");
      }
    );

    return next(
      new AppError(
        "There was an error sending th email. Please try agian later",
        500
      )
    );
  }
});

exports.getBookingsByDay = catchAsync(async (req, res, next) => {
  const stats = await Booking.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        numBookings: { $sum: 1 },
        sumAmount: { $sum: "$amount" },
        avgAmount: { $avg: "$amount" },
        minAmountDonated: { $min: "$amount" },
        maxAmountDonated: { $max: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: stats,
  });
});
