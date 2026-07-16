import { createAPIFileRoute } from '@tanstack/react-start/api'
import { appendFile } from 'fs/promises'

export const APIRoute = createAPIFileRoute('/api/contact')({
  POST: async ({ request }) => {
    try {
      let payload: any = {}
      const contentType = request.headers.get('content-type') || ''
      
      if (contentType.includes('application/json')) {
        payload = await request.json()
      } else if (
        contentType.includes('application/x-www-form-urlencoded') || 
        contentType.includes('multipart/form-data')
      ) {
        const formData = await request.formData()
        for (const [key, value] of formData.entries()) {
          payload[key] = value
        }
      }

      const { name, email, phone, interest, insurance, message } = payload
      
      if (!name || !email) {
        return new Response(JSON.stringify({ success: false, error: 'Name and email are required.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      const now = new Date().toISOString()
      const submission = {
        name: String(name).trim(),
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : '',
        interest: interest ? String(interest).trim() : '',
        insurance: insurance ? String(insurance).trim() : '',
        message: message ? String(message).trim() : '',
        status: 'pending',
        timestamp: now
      }

      await appendFile(
        '/home/team/shared/contact_submissions.json',
        JSON.stringify(submission) + '\n',
        'utf-8'
      )

      console.log(`[API Contact] Received contact form submission from ${name} (${email}) and appended to JSON file.`)

      return new Response(JSON.stringify({ success: true, message: 'Your message has been received!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (err: any) {
      console.error('[API Contact Error]', err)
      return new Response(JSON.stringify({ success: false, error: err.message || 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
})
