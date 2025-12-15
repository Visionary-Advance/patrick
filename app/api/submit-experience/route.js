import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email') || 'Not provided';
    const phone = formData.get('phone');
    const workedBefore = formData.get('workedBefore');
    const experience = formData.get('experience');
    const photo = formData.get('photo');

    // Validate required fields
    if (!firstName || !lastName || !phone || !workedBefore || !experience) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Prepare email configuration
    const emailConfig = {
      from: 'noreply@mail.visionaryadvance.com', // Update this with your verified domain
      to: ['brandon@visionaryadvance.com'], // Update with your actual email
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
