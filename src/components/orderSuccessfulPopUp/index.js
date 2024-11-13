import { useNavigate } from "react-router-dom";
import styles from './OrderSuccessfulPopUp.module.css'

export const OrderSuccessfulPopUp = ({order}) => {
    const navigate = useNavigate()
    return (
        <div className={styles.popUpWrapper}>
            <h6>Order Placed Succesfully.</h6>
            <p>Order Id: {order?.id}</p>
            <p>Visit Again !!! Thanks.</p>
            <button onClick={()=>navigate('/')}>Ok</button>
        </div>
    );
};
