import { generateClient } from 'aws-amplify/data';

const client = generateClient({
  authMode: 'identityPool'
});

/**
 * Submit contact form
 * @param {Object} formData - Form data
 * @param {string} formData.name - Sender name
 * @param {string} formData.email - Sender email
 * @param {string} formData.subject - Message subject (optional)
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} Submission result
 */
export async function submitContactForm(formData) {
  try {
    const { name, email, subject, message } = formData;

    // Validation
    if (!name || !email || !message) {
      throw new Error('Name, email, and message are required');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }

    // Create submission
    const { data, errors } = await client.models.ContactSubmission.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : null,
      message: message.trim(),
      status: 'new',
      submittedAt: new Date().toISOString(),
      ipAddress: null // Client-side can't reliably get IP
    });

    if (errors) {
      console.error('Error submitting contact form:', errors);
      throw new Error('Failed to submit message');
    }

    return {
      success: true,
      data,
      message: 'Message sent successfully!'
    };
  } catch (error) {
    console.error('Exception submitting contact form:', error);
    return {
      success: false,
      error: error.message || 'Failed to submit message'
    };
  }
}
