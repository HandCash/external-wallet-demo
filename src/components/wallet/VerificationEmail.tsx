import React from 'react';

const VerificationEmail: React.FC = () => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to On Chain Casino</title>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .logo {
            display: block;
            margin: 0 auto 20px;
            max-width: 200px;
          }
          .verification-code {
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 5px;
            margin: 20px 0;
            padding: 10px;
            text-align: center;
          }
          h1 {
            color: #1a73e8;
          }
          p {
            margin: 10px 0;
          }
          small {
            color: #777;
          }
        `}
      </style>
    </head>
    <body>
      <h1>Welcome to On Chain Casino!</h1>

      <p>Dear Valued User,</p>

      <p>
        We're thrilled to welcome you to On Chain Casino, where blockchain meets
        entertainment! Thank you for joining our community of players who enjoy
        cutting-edge gaming experiences.
      </p>

      <p>
        To complete your registration and ensure the security of your account,
        please use the following verification code:
      </p>

      <div className="verification-code">{'{code}'}</div>

      <p>
        Please enter this code on the verification page to activate your
        account. This code will expire in <strong>15 minutes</strong> for
        security reasons.
      </p>

      <p>
        Once verified, you'll have full access to our wide range of games, secure
        transactions, and exciting promotions.
      </p>

      <p>
        If you didn't request this verification code, please ignore this email or
        contact our support team immediately.
      </p>

      <p>We're looking forward to seeing you at the tables!</p>

      <p>
        Best regards,<br />
        The On Chain Casino Team
      </p>

      <p>
        <small>
          This is an automated message, please do not reply directly to this
          email. If you need assistance, please contact our support team.
        </small>
      </p>
    </body>
  </html>
);

export default VerificationEmail;
