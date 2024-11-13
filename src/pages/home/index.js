import React, {useState, useEffect} from 'react'
import { getProducts } from "../../rest/product"
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { addToCart, createCart, getCart, removeLineItem, updateLineItem } from '../../rest/cart'

const categoryList = ['Category1', 'Category2', 'Category3'];
export const Home = () => {
   const [productList, setProductList] = useState([])
   const [cart, setCart] = useState(null)
   const navigate = useNavigate()

   const handleProduct = (productId) => {
        navigate(`pdp/${productId}`)
   }

   const handleAddToCart = async (productId) => {
      try {
         const cartId = localStorage?.getItem('cartId')
         const cart =  cartId ? await getCart(cartId) : await createCart();  
         const cartRes = await addToCart(cart?.id, cart?.version, productId);
         localStorage.setItem('cartId', cart?.id)  
         setCart(cartRes)
     } catch (error) {
         console.error("Error adding to cart:", error);
     }
   }

   const removeFromCart = async (productId) => {
      const lineItemId = cart?.lineItems?.find(item=>item?.productId===productId)?.id
      const res = await removeLineItem(cart?.id, cart?.version, lineItemId)
      setCart(res)
   }

   const isProductInCart = (productId) => {
      return cart?.lineItems?.find(item=>item?.productId===productId)
   }

   const manageQuantity = async(productId, action) => {
      const lineItem = cart?.lineItems?.find(item=>item?.productId===productId)
      const res = await updateLineItem(cart?.id, cart?.version, lineItem?.id, action==='add' ? lineItem?.quantity + 1 : lineItem?.quantity - 1 )
      setCart(res)
   }
   
   const handleQuantity = (productId) => {
      const product = isProductInCart(productId)
      return product ? product?.quantity : 0 
   }

   useEffect(()=>{
      async function fetchProducts(){
           const cartId = localStorage.getItem('cartId')
           const res = await getProducts();
           setProductList(res)
           if(cartId){
             const cartRes = await getCart(cartId)
             setCart(cartRes)
           }
      }
      fetchProducts()
   },[])
    console.log(111, cart)
     return(
      <>
         <div className={styles.headerWrapper}>
            <ul className={styles.categoryWrapper}>
               {
                  categoryList?.map((category, index)=> 
                     <li key={index}>{category}</li>
                  )
               }
            </ul>
         </div>
         <div className={styles.productsContainer}>
            <ul className={styles.productsWrapper}>
               {
                  productList?.map((item)=>
                     <li className={styles.productWrapper}>
                        <img onClick={()=>{handleProduct(item?.productId)}} className={styles.imgWrapper} src={item?.pdpImage?.link?.[0]} alt={item?.productName} width={50} height={50}></img>
                        <h5 className={styles.title}>{item?.productName}</h5>
                        <p className={styles.price}>INR-{item?.price}</p>
                        <div className={`${styles.quantityWrapper} ${handleQuantity(item?.productId) ?'':styles.quantityWrapper1}`}>
                           <button onClick={()=>manageQuantity(item?.productId, 'minus')} disabled={handleQuantity(item?.productId)===1}>-</button>
                           <input type='text' value={handleQuantity(item?.productId)}/>
                           <button onClick={()=>manageQuantity(item?.productId, 'add')}>+</button>
                        </div>
                        <button className={`${styles.btn2} ${isProductInCart(item?.productId) ? styles.btnRemoveFromCart : ''}`} onClick={()=>isProductInCart(item?.productId)?removeFromCart(item?.productId):handleAddToCart(item?.productId)}>{isProductInCart(item?.productId) ? `Remove from cart` : 'Add to Cart'}</button>
                     </li>
                  )
               }
            </ul>
        </div>
        <>{cart?.lineItems?.length <=0 ?
         <div className={`${styles.miniCartWrapper} ${styles.banner}`}>
               Promotion Banner
         </div> :
         <div className={styles.miniCartWrapper}>
            <div className={styles.cartWrapper}>
               <ul className={styles?.cartThumbnailWrapper}>
                  {
                     cart?.lineItems?.slice(0,6)?.map(item=>
                        <li key={item?.id} className={styles?.thumbnail}>
                           <img src={item?.variant?.images?.[0]?.url} alt={item?.name} height={50} width={50}/>
                        </li>
                     )
                  }
               </ul>
               {cart?.lineItems?.length > 6 && <p className={styles.moreItems}>+ {cart?.lineItems?.length - 6} more</p>}
               <button className={styles.reviewCart}>Review Cart</button>
            </div>
            <div className={styles.scanWrapper}>
                  QR Code
            </div>
            <div className={styles.miniCartBtns}>
               <div className={styles.cartTotalWrapper}>
                  <p><b>Tax:</b> {cart?.tax ?? 0} /- INR</p>
                  <p><b>Total:</b> {cart?.totalPrice?.centAmount}/- INR</p>
               </div>
               <button className={styles.placeOrderBtn}>Place Order</button>
            </div>
         </div>
         }
        </>
      </>
     )
}