import axios from "axios";
import nodemailer from "nodemailer";
import { createRequire } from 'module';

const require = createRequire(import.meta.url)

export const momoPayment = async (req, res) => {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b'; // back to our page
    var ipnUrl = 'https://a02a-14-186-70-208.ngrok-free.app/callback'; // thank you page
    var requestType = "payWithMethod";
    var amount = req.body.total.toString();
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData ='';
    var orderGroupId ='';
    var autoCapture =true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + process.env.ACCESS_KEY + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', process.env.SECRET_KEY)
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
    // Create the HTTPS objects
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

    // Send the request and get the response
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

    // Write data to request body
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
}

export const callback = async (req, res) => {
    console.log("Callback called")
    console.log(req.body)

    return res.status(200).json(req.body)
}

export const transactionStatus = async (req, res) => {
    const {orderId} = req.body

    const rawSignature = `accessKey=${process.env.ACCESS_KEY}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

    const crypto = require('crypto');
    const signature = crypto
    .createHmac("sha256", process.env.SECRET_KEY)
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
}

const sendMail = async ({email, subject, html}) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        auth: {
            user: "nguyenkhoi200455@gmail.com",
            pass: process.env.MAIL_PASS
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

export const sendEmail = async (req, res) => {
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
}