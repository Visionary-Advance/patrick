import { Resend } from 'resend';
import { NextResponse } from 'next/server';

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // skip verification if key not configured yet
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  });
  const data = await res.json();
  return data.success && data.score >= 0.5;
}

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const formData = await request.formData();

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email') || 'Not provided';
    const phone = formData.get('phone');
    const workedBefore = formData.get('workedBefore');
    const experience = formData.get('experience');
    const photo = formData.get('photo');
    const recaptchaToken = formData.get('recaptchaToken');

    // Validate required fields
    if (!firstName || !lastName || !phone || !workedBefore || !experience) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const isHuman = await verifyRecaptcha(recaptchaToken);
      if (!isHuman) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Prepare email configuration
    const emailConfig = {
      from: 'noreply@mail.visionaryadvance.com', // Update this with your verified domain
      to: ['info@patrickfire.com'], // Update with your actual email
      replyTo: email !== 'Not provided' ? email : undefined,
      subject: `New Experience Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Experience Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Worked for Patrick before:</strong> ${workedBefore === 'yes' ? 'Yes' : 'No'}</p>
        <p><strong>Experience:</strong></p>
        <p>${experience.replace(/\n/g, '<br>')}</p>
        ${photo ? '<p><strong>Photo:</strong> See attachment</p>' : ''}
      `,
    };

    // Add photo attachment if present
    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      emailConfig.attachments = [
        {
          filename: photo.name,
          content: buffer,
        },
      ];
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send(emailConfig);

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing experience submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
