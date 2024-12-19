import express from "express"
import mysql from "mysql2"
import cors from "cors"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'

import axios from 'axios'

import nodemailer from 'nodemailer'

import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const salt = 10

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Koiespretion2004!",
    database: "dsm"
})

const sendMail = async ({email, subject, html}) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        auth: {
            user: "nguyenkhoi200455@gmail.com",
            pass: "obtb crvl ldug qbwe"
        }
    })

    const message = {
        from: '61House',
        to: email,
        subject: subject,
        html: html
    }

    const result = await transporter.sendMail(message);
    return result;
}

// CRUD Operations
// POST (Create) A USER (Sign In)
app.post("/register", (req, res) => {
    const q = "INSERT INTO user (`username`, `email`, `phoneNumber`, `password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({error: "Error for hashing password"});

        const values = [
            req.body.username,
            req.body.email,
            req.body.phoneNumber,
            hash
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.send(`Error Message: ${err}`);
            return res.json({status: "Successful"});
        });
    })
});

// POST (Create) A USER (Log In)
app.post("/login", (req, res) => {
    const q = "SELECT * FROM user WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.send(`Error Message: ${err}`);

        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.send(`Error Message: ${err}`);
                if (response) {
                    const {id, username, email, phoneNumber} = data[0];
                    const token = jwt.sign({id, username, email, phoneNumber}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({status: "Successful"});
                } else {
                    return res.json({error: "Password not match!"});
                }
            })
        } else {
            return res.json({error: "Email does not exist!"})
        }
    })
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        console.log("You are not authenticated!");
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json(`Error Message: ${err}`)
            } else {
                req.id = decoded.id;
                req.username = decoded.username;
                req.email = decoded.email;
                req.phoneNumber = decoded.phoneNumber;
                next();
            }
        })
    }
}

app.get("/", verifyUser, (req, res) => {
    return res.json({status: "Successful", id: req.id, name: req.username, email: req.email, phone: req.phoneNumber}); 
})

app.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({status: "Successful"}); 
})

// GET (Read) ALL USERS
app.get("/user", (req, res) => {
    const q = "SELECT * FROM user"
    db.query(q, (err, data) => {
        if (err) return res.json(`Error Message: ${err}`)
        return res.json(data)
    })
})

// PUT (Update) A USER
app.put("/user/:id", (req, res) => {
    const userId = req.params.id;
    const q = "UPDATE user SET `username` = ?, `email` = ?, `password` = ?, `phoneNumber` = ?, `role` = ? WHERE id = ?";
  
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.phoneNumber,
        req.body.role
    ];
  
    db.query(q, [...values, userId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});

// DEL (Delete) A USER
app.delete("/user/:id", (req, res) => {
    const userId = req.params.id
    const q = "DELETE FROM user WHERE id = ?"
  
    db.query(q, [userId], (err, data) => {
      if (err) return res.send(err)
      return res.json(data)
    })
})

// GET (Read) ALL CATEGORIES
app.get("/category", (req, res) => {
    const q = "SELECT * FROM category"
    db.query(q, (err, data) => {
        if (err) return res.json(`Error Message: ${err}`)
        return res.json(data)
    })
})

// POST (Create) A PRODUCT
app.post("/product", (req, res) => {
    const q = "INSERT INTO product (`productName`, `productDesc`, `productPrice`, `productImage`, `categoryID`, `bestSelling`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.desc,
        req.body.price,
        req.body.image,
        req.body.categoryID,
        req.body.bestSelling
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

// GET (Read) ALL PRODUCTS
app.get("/product", (req, res) => {
    const q = "SELECT * FROM product"
    db.query(q, (err, data) => {
        if (err) return res.json(`Error Message: ${err}`)
        return res.json(data)
    })
})

// PUT (Update) A PRODUCT
app.put("/product/:id", (req, res) => {
    const productId = req.params.id;
    const q = "UPDATE product SET `productName`= ?, `productDesc`= ?, `productPrice`= ?, `productImage`= ?, `categoryID`= ?, `bestSelling`= ? WHERE id = ?";
  
    const values = [
        req.body.name,
        req.body.desc,
        req.body.price,
        req.body.image,
        req.body.categoryID,
        req.body.bestSelling
    ];
  
    db.query(q, [...values, productId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

// DEL (Delete) A PRODUCT
app.delete("/product/:id", (req, res) => {
    const productId = req.params.id;
    const q = "DELETE FROM product WHERE id = ?";
  
    db.query(q, [productId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

//
// POST (Create) A REVIEW
app.post("/review", (req, res) => {
    const q = "INSERT INTO review (`userId`, `productId`, `reviewContent`, `reviewDate`) VALUES (?)";

    const values = [
        req.body.userId,
        req.body.productId,
        req.body.reviewContent,
        req.body.reviewDate
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

// GET (Read) ALL REVIEWS
app.get("/review", (req, res) => {
    const q = "SELECT review.*, user.id, user.username FROM review INNER JOIN user ON review.userId = user.id"
    db.query(q, (err, data) => {
        if (err) return res.json(`Error Message: ${err}`)
        return res.json(data)
    })
})


// DEL (Delete) A REVIEW
app.delete("/review/:id", (req, res) => {
    const reviewId = req.params.id;
    const q = "DELETE FROM review WHERE id = ?";
  
    db.query(q, [reviewId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
// MOMO payment link
app.post("/payment", async (req, res) => {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b'; // back to our page
    var ipnUrl = 'https://a02a-14-186-70-208.ngrok-free.app/callback'; // thank you page
    var requestType = "payWithMethod";
    var amount = '50000';
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData ='';
    var orderGroupId ='';
    var autoCapture =true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        partnerName : "Test",
        storeId : "MomoTestStore",
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        lang : lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData : extraData,
        orderGroupId: orderGroupId,
        signature : signature
    });

    /*
    //Create the HTTPS objects
    const https = require('https');
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    //Send the request and get the response
    const req = https.request(options, res => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
            console.log('Body: ');
            console.log(body);
            console.log('resultCode: ');
            console.log(JSON.parse(body).resultCode);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    })

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });
    // write data to request body
    console.log("Sending....")
    req.write(requestBody);
    req.end();
    */

    // Options
    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
    }

    let result;
    try {
        result = await axios(options)
        return res.status(200).json(result.data)
    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
})

app.use(express.urlencoded({extended: true}));

app.post("/callback", async (req, res) => {
    console.log("Callback called")
    console.log(req.body)

    return res.status(200).json(req.body)
})

app.post("/transaction-status", async (req, res) => {
    const {orderId} = req.body

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

    const crypto = require('crypto');
    const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

    const requestBody = JSON.stringify({
        partnerCode: "MOMO",
        requestId: orderId,
        orderId,
        signature,
        lang: "vi"
    })

    // Options
    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/query",
        headers: {
            'Content-Type': "application/json"
        },
        data: requestBody
    }

    let result = await axios(options);
    return res.status(200).json(result.data)
})

// SEND EMAIL
app.post("/success", async (req, res) => {
    await sendMail({
        email: req.body.email,
        subject: "Your order has been sent!",
        html: `
            <h1>Order Sent Successfully!</h1>
            <p>Your order has been sent successfully! Here is your order information:</p>
            <ul>
                <li>Username: ${req.body.username}</li>
                <li>Email: ${req.body.email}</li>
                <li>Phone Number: ${req.body.phoneNumber}</li>
                <li>Address: ${req.body.address}</li>
            </ul>
            <p>Please wait until your phone receives a call from the delivery person that tells you to receive your drink!</p>
        `
    })

    return res.status(200).json({status: "Successful"});
})

app.listen(8800, () => {
    console.log("Connected to backend!")
})