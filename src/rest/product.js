export const token = `Bearer xgLCnjc7XU63nyVM-sdWmWjnROh8e2mj`
export async function getProducts () {
    try {
      const productRawResponse = await fetch(
        `https://api.us-central1.gcp.commercetools.com/abhijeet/products`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      const productData = await productRawResponse.json()
  
      const products = productData?.results?.map((item)=>{
        return {
            productId: item?.id,
            sku: item?.masterData?.current?.masterVariant?.sku,
            currency: 'INR',
            productName: item?.masterData?.current?.name['en-IN'],
            productDescription:
            item?.masterData?.current?.description['en-IN'],
        pdpImage: {
          alt: item?.masterData?.current?.masterVariant?.images?.map(
            (image) => image?.label
          ),
          link: item?.masterData?.current?.masterVariant?.images?.map(
            (image) => image?.url
          )
        },
        attributes: item?.masterData?.current?.masterVariant?.attributes,
        price: item?.masterData?.current?.masterVariant?.prices?.[0]?.value?.centAmount
        }
      })
      return products;
    } catch (e) {
      return { errorMessage: 'Unable to fetch data from server.' }
    }
  }

  export async function getProductById (productId) {
    try {
      const productRawResponse = await fetch(
        `https://api.us-central1.gcp.commercetools.com/abhijeet/products/${productId}`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      const productData = await productRawResponse.json()
      const product = {
        productId: productData?.id,
        sku: productData?.masterData?.current?.masterVariant?.sku,
        currency: 'INR',
        productName: productData?.masterData?.current?.name['en-IN'],
        productDescription:
          productData?.masterData?.current?.description['en-IN'],
        pdpImage: {
          alt: productData?.masterData?.current?.masterVariant?.images?.map(
            (image) => image?.label
          ),
          link: productData?.masterData?.current?.masterVariant?.images?.map(
            (image) => image?.url
          )
        },
        attributes: productData?.masterData?.current?.masterVariant?.attributes
      }
      return product
    } catch (e) {
      return { errorMessage: 'Unable to fetch data from server.' }
    }
  }