export const otpTemplate = (otp: string, email: string) => {
  return {
    to: email,
    subject: 'Your OTP Code',
    html: ` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                background: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: auto;
            }
            h1 {
                color: #333;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #4CAF50;
            }
            p {
                color: #666;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Your OTP Code</h1>
            <p>Hello!</p>
            <p>Your One-Time Password (OTP) is:</p>
            <p class="otp">${otp}</p>
            <p>This OTP is valid for 10 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <div class="footer">
                <p>Thank you!</p>
            </div>
        </div>
    </body>
    </html>`,
  };
};
