import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCart, setShippingAddress } from '../../rest/cart'
import { placeOrder } from '../../rest/order'
import { OrderSuccessfulPopUp } from '../../components/orderSuccessfulPopUp'
import styles from './Cart.module.css'

export const Cart = () => {
    const navigate = useNavigate()
    const {cartId}=useParams()
    const [cart, setCart] = useState(null)
    const [order, setOrder] = useState(null)

    const handlePlaceOrder = async() => {
        try {
          localStorage.removeItem('cartId')
          const responseCart = await setShippingAddress(cart?.id, cart?.version)
          const placeOrderRes = await placeOrder(responseCart?.id, responseCart?.version)
          setOrder(placeOrderRes)
        } catch(error){
            console.log(error)
        }
    }

    const handleAddMoreProducts = () => {
           localStorage.setItem('cartId', cart?.id)
           navigate('/')
    }

    useEffect(()=>{
        const fetchCart = async()=>{
             const cartRes = await getCart(cartId)
             setCart(cartRes)
        }
        fetchCart()
    },[])
    
     return(
        <div className={styles.cartWrapper}>
            <h5>Cart</h5>
            {
                cart?.lineItems?.map(item=>(
                    <div key={item?.id} className={styles.itemWrapper}>
                        <img src={item?.variant?.images?.[0]?.url} alt={item?.name} width={100} height={100}/>
                        <div>
                            <p className={styles.title}><span>Item-id:</span> {item?.id}</p>
                            <p className={styles.title}><span>Name:</span> {item?.name}</p>
                        </div>
                    </div>
                )

                )
            }
            <button className={styles.abort} onClick={()=>{localStorage.removeItem('cartId'); navigate('/')}}>Abort</button>
            <div className={styles.button}>
                <button className={styles.button1} onClick={handleAddMoreProducts}>Add more product</button>
                <button className={styles.button2} onClick={handlePlaceOrder}>Place Order</button>
            </div>
    
            {order && <div className={styles?.popUpContainer}>
                <OrderSuccessfulPopUp order={order}/></div>}
        </div>
     )
}