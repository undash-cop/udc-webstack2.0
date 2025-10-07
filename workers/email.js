// Simple email worker for sending emails
// This can be used as a separate worker or integrated into the main worker

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    if (request.method === 'POST') {
      try {
        const emailData = await request.json();
        
        // Send email using SendGrid
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: emailData.to }],
            }],
            from: { email: emailData.from },
            subject: emailData.subject,
            content: [{
              type: 'text/html',
              value: emailData.html
            }]
          })
        });

        if (!response.ok) {
          throw new Error(`SendGrid error: ${response.status}`);
        }

        return new Response(JSON.stringify({
          success: true,
          message: 'Email sent successfully'
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Email sending error:', error);
        return new Response(JSON.stringify({
          success: false,
          error: 'Failed to send email'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
};
