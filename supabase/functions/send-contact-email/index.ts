import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { discordUser, email, subject, message } = await req.json()

    // Store in database
    const { data, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        discord_user: discordUser,
        email: email,
        subject: subject,
        message: message
      })
      .select()

    if (dbError) {
      throw dbError
    }

    // Send email using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (resendApiKey) {
      const emailBody = `
New Contact Form Submission!

Discord User: ${discordUser}
Email: ${email}
Subject: ${subject}

Message:
${message}

Submitted at: ${new Date().toLocaleString()}

You can view all submissions in your admin panel.
      `.trim()

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Hope\'s Services <noreply@yourdomain.com>', // You'll need to configure this
          to: ['unbeliveable.vanis@gmail.com'],
          subject: `Contact Form: ${subject} - from ${discordUser}`,
          text: emailBody,
        }),
      })

      if (!emailResponse.ok) {
        console.error('Failed to send email:', await emailResponse.text())
      }
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})