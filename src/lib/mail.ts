import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export async function sendShortlistedEmail(
  email: string
) {
  await transporter.sendMail({
    to: email,
    subject:
      "Application Shortlisted",
    html:
      "<h2>Congratulations!</h2><p>Your application has been shortlisted.</p>",
  });
}

export async function sendSelectedEmail(
  email: string
) {
  await transporter.sendMail({
    to: email,
    subject:
      "Application Selected",
    html:
      "<h2>Congratulations!</h2><p>You have been selected.</p>",
  });
}

export async function sendRejectedEmail(
  email: string
) {
  await transporter.sendMail({
    to: email,
    subject:
      "Application Update",
    html:
      "<h2>Application Update</h2><p>Your application was not selected.</p>",
  });
}

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const verifyUrl =
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: `"Campus Placement Portal" <${process.env.EMAIL_USER}>`,
    sender: process.env.EMAIL_USER,
    replyTo: process.env.EMAIL_USER,

    to: email,

    subject: "Verify Your Campus Placement Portal Account",

    text: `
Welcome to Campus Placement Portal

Thank you for registering.

Please verify your email address using the link below:

${verifyUrl}

This verification link is required to activate your account.

If you did not create this account, you can safely ignore this email.

Campus Placement Portal Team
    `,

    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 20px;">

        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            background:#ffffff;
            border-radius:10px;
            overflow:hidden;
            box-shadow:0 2px 10px rgba(0,0,0,0.08);
          "
        >

          <tr>
            <td
              style="
                background:#2563eb;
                color:#ffffff;
                padding:25px;
                text-align:center;
              "
            >
              <h1 style="margin:0;font-size:24px;">
                Campus Placement Portal
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:35px;">

              <h2 style="color:#111827;">
                Welcome!
              </h2>

              <p style="color:#4b5563;line-height:1.7;">
                Thank you for registering on Campus Placement Portal.
                To activate your account and start using all features,
                please verify your email address.
              </p>

              <div style="text-align:center;margin:35px 0;">
                <a
                  href="${verifyUrl}"
                  style="
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    padding:14px 28px;
                    border-radius:6px;
                    display:inline-block;
                    font-weight:bold;
                  "
                >
                  Verify Email Address
                </a>
              </div>

              <p style="color:#4b5563;line-height:1.7;">
                If the button above does not work, copy and paste the
                following link into your browser:
              </p>

              <p
                style="
                  word-break:break-all;
                  color:#2563eb;
                "
              >
                ${verifyUrl}
              </p>

              <hr
                style="
                  border:none;
                  border-top:1px solid #e5e7eb;
                  margin:30px 0;
                "
              />

              <p style="color:#6b7280;font-size:14px;">
                If you did not create this account,
                you can safely ignore this email.
              </p>

            </td>
          </tr>

          <tr>
            <td
              style="
                background:#f9fafb;
                padding:20px;
                text-align:center;
                color:#6b7280;
                font-size:12px;
              "
            >
              © ${new Date().getFullYear()} Campus Placement Portal
              <br />
              Automated Email • Please Do Not Reply
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `,
  });
}
export async function sendInterviewEmail(
  email: string,
  interviewDate: string,
  interviewTime: string,
  meetingLink: string
) {
  await transporter.sendMail({
    to: email,

    subject:
      "Interview Scheduled",

    html: `
      <h2>Interview Scheduled</h2>

      <p>Your interview has been scheduled.</p>

      <p>
        <strong>Date:</strong>
        ${interviewDate}
      </p>

      <p>
        <strong>Time:</strong>
        ${interviewTime}
      </p>

      <p>
        <strong>Meeting Link:</strong>
        <a href="${meetingLink}">
          Join Interview
        </a>
      </p>
    `,
  });
}

export async function sendResetPasswordEmail(
  email: string,
  token: string
) {
  const resetUrl =
    `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;

  await transporter.sendMail({
    from: `"Campus Placement Portal" <${process.env.EMAIL_USER}>`,
    sender: process.env.EMAIL_USER,
    replyTo: process.env.EMAIL_USER,

    to: email,

    subject: "Reset Your Password",

    text: `
Password Reset Request

We received a request to reset your password.

Use the link below:

${resetUrl}

This link will expire in 1 hour.

If you did not request this password reset,
please ignore this email.

Campus Placement Portal Team
    `,

    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Password Reset</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 20px;">

<table width="600" cellpadding="0" cellspacing="0"
style="
background:#ffffff;
border-radius:10px;
overflow:hidden;
box-shadow:0 2px 10px rgba(0,0,0,0.08);
">

<tr>
<td style="
background:#dc2626;
color:#fff;
padding:25px;
text-align:center;
">
<h1>Password Reset</h1>
</td>
</tr>

<tr>
<td style="padding:35px;">

<p>
We received a request to reset your account password.
</p>

<div style="text-align:center;margin:30px 0;">
<a
href="${resetUrl}"
style="
background:#dc2626;
color:#ffffff;
padding:14px 28px;
border-radius:6px;
text-decoration:none;
font-weight:bold;
"
>
Reset Password
</a>
</div>

<p>
If the button doesn't work:
</p>

<p style="
word-break:break-all;
color:#2563eb;
">
${resetUrl}
</p>

<p>
This link expires in 1 hour.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
    `,
  });
}