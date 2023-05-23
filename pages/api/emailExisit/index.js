import dbConnect from '@/util/mongo';
import Users1 from '@/models/Users1';
import AWS from 'aws-sdk';

// Load AWS credentials from environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Create an Amazon SES object
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export default async function emailExisit(req, res) {
  const { method } = req;
  dbConnect();

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
    return;
  }

  const { oldEmail } = req.body;

  const user = await Users1.findOne({ email: oldEmail });

  if (user) {
    // Email parameters
    const params = {
      Destination: { 
        ToAddresses: [oldEmail]
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: "Hello, please use the following link to unsubscribe if you wish to stop receiving these emails: <unsubscribe link>"
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email'
        }
      },
      Source: "mohannadosman2@gmail.com",// sip email from aws SMTP
    };

    // Send the email
    ses.sendEmail(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        res.status(500).json({ message: 'Error sending email', error: err.message }); // Sends the error message in the response
      } else {
        console.log(data);
        res.status(200).json({ message: 'Email sent' });
      }
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}
