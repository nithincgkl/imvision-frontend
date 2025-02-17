import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        // Parse the request body to get the email details
        const { name, email, service, company } = await req.json();

        // Create the transporter using Elastic Email (or any SMTP service)
        const transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com', // Replace with your email service host
            port: 2525, // or another port like 587 or 465 depending on your email service
            secure: false,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_INFO, // Your email username
                pass: process.env.NEXT_PUBLIC_PASSWORD_INFO, // Your email password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL_INFO, // Replace with your sender email
            to: process.env.NEXT_PUBLIC_EMAIL_INFO, // Recipient's email address
            subject: `New Contact Enquiry from ${name}`,
            html: `
                <h2>Contact Enquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Company:</strong> ${company}</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Return a success response
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
    }
}
