import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        // Parse FormData from the request
        const formData = await req.formData();
        const body = Object.fromEntries(formData.entries());

        console.log('Received request body:', body);

        // Extract file
        const file = formData.get("resume");

        let attachment = null;
        if (file && file instanceof Blob) {
            const buffer = Buffer.from(await file.arrayBuffer());
            attachment = {
                filename: file.name,
                content: buffer,
                contentType: file.type,
            };
        }

        // Set up Nodemailer transporter with Elastic Email SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 2525, // Use 587 for TLS or 465 for SSL
            secure: false,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_INFO,
                pass: process.env.NEXT_PUBLIC_PASSWORD_INFO,
            },
        });

        // Construct email message
        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL_INFO,
            to: process.env.NEXT_PUBLIC_EMAIL_INFO,
            subject: `New Job Enquiry from ${body.name}`,
            html: `
                <h2>Job Enquiry</h2>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Phone:</strong> ${body.phone}</p>
                <p><strong>Job:</strong> ${body.job}</p>
                <p><strong>Comments:</strong> ${body.comments}</p>
            `,
            attachments: attachment ? [attachment] : [], // Attach the file if available
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);

        return Response.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return Response.json({ error: 'An error occurred while processing the request' }, { status: 500 });
    }
}