// pages/api/proxy/[...path].js
import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path = [] } = req.query;
  const query = req.query;
  // Construir la URL de destino
  const url = `https://api.coingecko.com/${
    Array.isArray(path) ? path.join("/") : path
  }`;

  try {
    const response = await axios.get(url, {
      params: query,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    const status = (error as AxiosError).response?.status || 500;
    const message =
      (error as AxiosError).response?.data ||
      "Error al obtener datos de CoinGecko";
    res.status(status).json({ error: message });
  }
}
