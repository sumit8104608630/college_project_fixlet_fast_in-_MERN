
import React from 'react'
import {useDispatch} from "react-redux"
import { fetchCart } from '../app/Actions/cart_action';

function AddButton(props) {
    const serviceId=props.service;
    const subserviceId=props.subService?.subServiceId;
    const quantity=props.subService?.quantity
    const service_id=props.service_id;
    const subservice_id=props.subService_id;
    const onClickSubtract=props.onClickSubtract;
    const onClickAdd=props.onClickAdd;



    
     

  return (
    <div>{serviceId==service_id&&subserviceId==subservice_id&&
       <>     
                        <div className={`flex items-center w-20 border bg-orange-100 border-orange-500 rounded mt-2 justify-between`}>
                          <button  onClick={() => onClickAdd(service_id, subservice_id)} className="text-sm font-semibold text-orange-500 hover:bg-orange-300 hover:text-white px-2">+</button>

                          <span className="text-sm font-semibold text-orange-500">{quantity}</span>

                          <button  onClick={() => onClickSubtract(service_id, subservice_id)} className="text-sm font-semibold text-orange-500 px-2 hover:bg-orange-300 hover:text-white">-</button>
                        </div>
                      
    </>
}</div>
)
}

export default AddButton
