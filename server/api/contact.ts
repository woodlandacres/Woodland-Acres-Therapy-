import { defineEventHandler, readBody } from 'h3'
import { appendFile } from 'fs/promises'

export default defineEventHandler(async (event) => {
  try {
    const payload = await readBody(event)
    const { name, email, phone, interest, insurance, message } = payload

    if (!name || !email) {
      event.node.res.statusCode = 400
      return { success: false, error: 'Name and email are required.' }
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

    console.log(`[Nitro API] Received contact form submission from ${name} (${email})`)
    return { success: true, message: 'Your message has been received!' }
  } catch (err: any) {
    console.error('[Nitro API Error]', err)
    event.node.res.statusCode = 500
    return { success: false, error: err.message || 'Internal server error' }
  }
})
