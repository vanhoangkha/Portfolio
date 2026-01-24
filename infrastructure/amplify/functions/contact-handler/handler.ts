import type { Handler } from 'aws-lambda';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.AWS_REGION });

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/**
 * Contact form handler
 * Sends email notification and stores submission
 */
export const handler: Handler = async (event) => {
  console.log('Contact form submission:', event);

  try {
    const body: ContactFormData = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Missing required fields: name, email, message',
        }),
      };
    }

    // Send email notification via SES
    const emailParams = {
      Source: process.env.SES_EMAIL_FROM!,
      Destination: {
        ToAddresses: [process.env.ADMIN_EMAIL!],
      },
      Message: {
        Subject: {
          Data: `Portfolio Contact: ${body.subject || 'New Message'} from ${body.name}`,
        },
        Body: {
          Text: {
            Data: `
Name: ${body.name}
Email: ${body.email}
Subject: ${body.subject || 'N/A'}

Message:
${body.message}

---
This message was sent from your portfolio contact form.
            `,
          },
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${body.name}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Subject:</strong> ${body.subject || 'N/A'}</p>
              <hr>
              <p><strong>Message:</strong></p>
              <p>${body.message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p><small>This message was sent from your portfolio contact form.</small></p>
            `,
          },
        },
      },
    };

    await ses.send(new SendEmailCommand(emailParams));

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Thank you for your message! I will get back to you soon.',
        success: true,
      }),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to send message. Please try again later.',
      }),
    };
  }
};
