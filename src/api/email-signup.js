export default async (req, res) => {
  console.log(`submitted form`, req.body)

  const endpoint = `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`

  console.log("calling endpoint:", endpoint)
  let data = await fetch(endpoint, {
    method: `POST`,
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      ...req.body,
    }),
    headers: {
      "content-type": `application/json`,
    },
  })

  console.log(`initial response from ConvertKit:`, data)

  data = await data.json()
  console.log(`json response from ConvertKit:`, data)

  res.json(`ok`)
}