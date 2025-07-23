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

    const { 
      discordUser, 
      email, 
      commissionType, 
      animationType, 
      description, 
      deadline, 
      customSize, 
      referenceFileName 
    } = await req.json()

    // Store in database
    const { data, error: dbError } = await supabase
      .from('commission_submissions')
      .insert({
        discord_user: discordUser,
        email: email,
        commission_type: commissionType,
        animation_type: animationType,
        description: description,
        deadline: deadline || null,
        custom_size: customSize || null,
        reference_file_name: referenceFileName || null
      })
      .select()

    if (dbError) {
      throw dbError
    }

    // Send email using Resend (you'll need to add RESEND_API_KEY to your Supabase secrets)
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (resendApiKey) {
      const emailBody = `
New Commission Request Received!

Discord User: ${discordUser}
Email: ${email}
Commission Type: ${commissionType}
Animation Type: ${animationType || 'Not specified'}
Description: ${description}
Deadline: ${deadline || 'Not specified'}
Custom Size: ${customSize || 'Not specified'}
Reference File: ${referenceFileName || 'None uploaded'}

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
          from: 'Hope\'s Services <unbeliveable.vanis@gmail.com>', // You'll need to configure this
          to: ['unbeliveable.vanis@gmail.com'],
          subject: `New Commission Request from ${discordUser}`,
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