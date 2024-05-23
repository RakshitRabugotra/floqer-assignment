import { GoogleGenerativeAI } from '@google/generative-ai'
import { Summary } from './pocketbase'

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')

export async function run(data: Summary[]) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const prompt = 'Summarize the given data in words:\n' + JSON.stringify(data)

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()
  return text
}
