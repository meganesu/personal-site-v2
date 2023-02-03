export default async (req, res) => {
  console.log(`submitted form:`, req.body)

  const endpoint = `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`

  console.log("calling endpoint:", endpoint)

  let response = await fetch(endpoint, {
    method: `POST`,
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      ...req.body,
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
  // - Log the request body & error
  // - Send back the response status code & responseBody error & message
  console.log(`initial response from ConvertKit:`, response)

  const responseBody = await response.json()
  console.log(`after response.json():`, responseBody)

  res.json({
    status: statusFromConvertKit,
    ...responseBody,
  })
}
