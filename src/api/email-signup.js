import fetch from "node-fetch"

export default async (req, res) => {
  console.log(`submitted form:`, req.body)

  // For security, only pull out the expected fields from the request
  const formData = {
    first_name: req.body.preferred_name,
    email: req.body.email,
  }

  // Don't call the ConvertKit API if there's no email
  if (!formData.email) {
    res.json({
      status: 406,
      error: "Missing required field",
      message: "/api/email-signup called without required email parameter"
    })
    return
  }

  const endpoint = `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`

  console.log("calling endpoint:", endpoint)

  let response = await fetch(endpoint, {
    method: `POST`,
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      ...formData
    }),
    headers: {
      "content-type": `application/json`,
    },
  })

  const statusFromConvertKit = response.status

  if (statusFromConvertKit === 200) {
    res.json({
      status: 200,
    })
    return
  }

  // If you get here, something went wrong
  // - Log the error
  // - Send back the response status code & responseBody error & message
  console.log(`initial response from ConvertKit:`, response)

  const responseBody = await response.json()
  console.log(`after response.json():`, responseBody)

  res.json({
    status: statusFromConvertKit,
    ...responseBody,
  })
}
