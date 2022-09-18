import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const GOOGLE_MAP_API_KEY_FOR_SERVER = process.env.GOOGLE_MAP_API_KEY_FOR_SERVER

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const address = req.body.address
  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address,
        components: 'country: JP',
        key: GOOGLE_MAP_API_KEY_FOR_SERVER,
      },
    }
  )
  res.status(200).json(response.data.results[0].geometry.location)
}

export default handler
