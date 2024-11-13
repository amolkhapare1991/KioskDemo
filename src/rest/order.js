import { token } from "./product"
export async function placeOrder (cartId, cartVersion) {
    try {
      const orderRawResponse = await fetch(
        'https://api.us-central1.gcp.commercetools.com/abhijeet/orders',
        {
          method: 'POST',
          headers: {
            Authorization: token
          },
          body: JSON.stringify({
            id: cartId,
            version: cartVersion
          })
        }
      )
      const orderData = await orderRawResponse.json()
      const orderResponse = {
        errorMessage: orderData?.message,
        id: orderData?.id
      }
      return orderResponse
    } catch (e) {
      return { errorMessage: 'Unable to fetch data from server.' }
    }
  }