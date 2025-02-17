import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        // Parse the request body to get the email details
        const { name, email, phone, service, industry_type, comments } = await req.json();

        // Create the transporter using Elastic Email (or any SMTP service)
        const transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com', // Replace with your email service host
            port: 2525, // or another port like 587 or 465 depending on your email service
            secure: false,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_SERVICE, // Your email username
                pass: process.env.NEXT_PUBLIC_PASSWORD_SERVICE, // Your email password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL_SERVICE, // Replace with your sender email
            to: process.env.NEXT_PUBLIC_EMAIL_SERVICE, // Recipient's email address
            subject: `Enquiry from ${name} for Installation`,
            html: `
                <h2>Enquiry for Installation</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Industry Type:</strong> ${industry_type}</p>
                <p><strong>Comments:</strong> ${comments}</p>
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
