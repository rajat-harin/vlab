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
      <a href='${CLIENT_ORIGIN}/register/confirm/${id}'>
        click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })
  
}