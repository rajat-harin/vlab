//const { CLIENT_ORIGIN } = require('../config')
const CLIENT_ORIGIN  = 'http://localhost:3000'
// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates

module.exports = {

  confirm: id => ({
    subject: 'Vlab GHRCE Confirm Email',
    html: `
    <body style="margin: 0; padding: 0;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0 30px 0;">

                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                    style="border-collapse: collapse; border: 1px solid #cccccc;">
                    <tr>
                        <td align="center" bgcolor="#343a40" style="padding: 40px 0 30px 0;">
                            <img src="cid:logo" alt="GHRECE vlab" width="100" height="100"
                                style="display: block;" />
                            <h1 style="font-family: Arial, sans-serif; color: #fff">GHRCE <div
                                    style="font-family: Arial, sans-serif; color: #fb8c00; "> vLab</div>
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="border-collapse: collapse;">
                                <tr>
                                    <td style="color: #153643; font-family: Arial, sans-serif;">
                                        <h1 style="font-size: 24px; margin: 0;">Greetings,</h1>
                                    </td>

                                </tr>
                                <tr>
                                    <td
                                        style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                                        <p style="margin: 0;">We are glad you chose to join in learning with us. To confirm your email click the link below: </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                                        <a href='${CLIENT_ORIGIN}/register/confirm/${id}'>
                                            click to confirm email
                                        </a>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#fb8c00" style="padding: 30px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="border-collapse: collapse;">
                                <tr>
                                    <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                                        <p style="margin: 0;">regards, GHRCE vLab<br />

                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
    </body>
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`,
    attachments: [{
        filename: 'logo.png',
        path: './client/public/logo.png',
        cid: 'logo' //my mistake was putting "cid:logo@cid" here! 
   }]
  }),
  reset: token => ({
    subject: 'Vlab GHRCE Password reset link',
    html: `
    <body style="margin: 0; padding: 0;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0 30px 0;">

                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                    style="border-collapse: collapse; border: 1px solid #cccccc;">
                    <tr>
                        <td align="center" bgcolor="#343a40" style="padding: 40px 0 30px 0;">
                            <img src="cid:logo" alt="GHRECE vlab" width="100" height="100"
                                style="display: block;" />
                            <h1 style="font-family: Arial, sans-serif; color: #fff">GHRCE <div
                                    style="font-family: Arial, sans-serif; color: #fb8c00; "> vLab</div>
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="border-collapse: collapse;">
                                <tr>
                                    <td style="color: #153643; font-family: Arial, sans-serif;">
                                        <h1 style="font-size: 24px; margin: 0;">Dear User,</h1>
                                    </td>

                                </tr>
                                <tr>
                                    <td
                                        style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                                        <p style="margin: 0;">We have recently receive a password reset request from
                                            you. For password reset click link below: </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                                        <a href='${CLIENT_ORIGIN}/forgot/${token}'>
                                            click to reset password
                                        </a>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#fb8c00" style="padding: 30px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="border-collapse: collapse;">
                                <tr>
                                    <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                                        <p style="margin: 0;">regards, GHRCE vLab<br />

                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
    </body>
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/forgot/${token}`,
    attachments: [{
      filename: 'logo.png',
      path: './client/public/logo.png',
      cid: 'logo' //my mistake was putting "cid:logo@cid" here! 
 }]
  })
  
}