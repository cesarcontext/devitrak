require("dotenv").config(); //connect with dotenv file

const accountSid = (process.env.REACT_APP_TWILIO_ACCOUNT_SID); 
const authToken = (process.env.REACT_APP_TWILIO_AUTH_TOKEN); 
const client = require('twilio')(accountSid, authToken); 
 
// export const whatsappNotification = (body, to) => {
//  client.messages 
//       .create({ 
//          body: body, 
//          from: 'whatsapp:+14155238886',       
//          to: to 
//        }) 
//       .then(message => {console.log(message.sid); console.log(message)}) 
//       .done();   
// }

client.messages 
      .create({ 
         body: "Testing with another phone number", 
         from: 'whatsapp:+14155238886',       
         to: "whatsapp:+17863621021" 
       }) 
      .then(message => {console.log(message.sid); console.log(message)}) 
      .done();   

      client.messages
      .create({body: 'Hi there', from: '+15017122661', to: '+17863621021'})
      .then(message => console.log(message.sid))
      .done()