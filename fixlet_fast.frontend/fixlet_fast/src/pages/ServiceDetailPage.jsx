import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll'; // Importing Link from react-scroll
import { FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { useSearchParams } from 'react-router';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchService } from '../app/Actions/service_action';
import { useLocation } from "react-router-dom";
import Loader from "../component/Loader";
import Promise from '../component/Promise';
import { fetchCart } from "../app/Actions/cart_action.js";
import AddButton from '../component/AddButton.jsx';
import Cart from '../component/Cart.jsx';
import emptyCart from "../assets/staticPhotp/emptyCart.svg";
import ServiceDetail from './ServiceDetail.jsx';
import { currentContext } from '../component/Context.jsx';
import { useContext } from 'react';

function ServiceDetailPage(props) {
  const cart = useSelector((state) => state.cart.cartItems, shallowEqual);
  const [cartItems,setCartItems]=useState([{}])
  const MemoizedButton = React.memo(AddButton);
  const CartMemo = React.memo(Cart);
  const { loading, services_data, error } = useSelector(state => state.service);
  const dispatch = useDispatch();
  const { isLogin, userInfo, isLoading } = useSelector(state => state.user);
  const [active, setActive] = useState(null);
  const [searchParams] = useSearchParams();
  const [filter_cartItems, setFilter_cartItems] = useState([]);
  const city = searchParams.get('city') || "mumbai";
  const categories = searchParams.get('categories');
  const state = userInfo?.state;
  const location = useLocation();
  const { headLine } = location.state || {};
  const [showService,setShowService]=useState(false);
  const Context=useContext(currentContext);


  // let's create the view detail functionality 
  const handleViewDetail=()=>{
    setShowService(true)
  }

  useEffect(()=>{
    Context.setCartShow(false)
    return ()=>{
      Context.setCartShow(true)
    }
  })

  useEffect(() => {
    setCartItems(cart)
    const cart_item = cart?.filter(item => item._id === categories);
    setFilter_cartItems(cart_item[0]?.productDetails || []);
  }, [cart, categories,Context]);


  useEffect(() => {
    if (state && city && categories) {
      dispatch(fetchService({ state, city, categories }));
    }
  }, [city, state, categories, dispatch]);


  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);



  // lets create update filter_cartItems by add button and subtract button
  const update_cart=(serviceId,subServiceId,subService,quantity,price)=>{
  const filterCart=filter_cartItems.filter(item=>item.serviceId==serviceId&&item.subService.subServiceId==subServiceId);
  const obj_inside=filterCart.length>0?{...filterCart[0]}:{} 
  if(obj_inside.subService.quantity)
setFilter_cartItems((prev)=>
  prev?.map((item)=>{
    if(item.serviceId===serviceId&&subServiceId===item.subService.subServiceId){
      return{...item,subService:{...item.subService,quantity:item.subService.quantity+quantity,totalPrice:(item.subService.totalPrice/item.subService.quantity)*(item.subService.quantity+quantity)}}
}
return item;
  }));
if(quantity===-1){
  setCartItems((prev)=>prev.map((item)=>{
    if( item._id === categories){
      return{...item,totalPrice:item.totalPrice-price}
    }
    return {...item,totalPrice:item.totalPrice-price}
  }));
}
else{
  setCartItems((prev)=>prev.map((item)=>{
    if( item._id === categories){
      return{...item,totalPrice:item.totalPrice+price}
    }
    return {...item,totalPrice:item.totalPrice+price}
  }));
}
}




const update_addObj=(serviceId,subServiceId,subService,quantity,price)=>{
  const new_cart=services_data?.filter(((item)=>{
    if(item._id===serviceId){
      return item;
    }
}))



const filter_subService=new_cart[0]?.serviceSubType?.filter(item=>item._id===subServiceId);
const new_obj={
  serviceName:"",
  serviceId:serviceId,
  subService:{
    _id:"",
    subServiceName:filter_subService[0]?.subServiceName,
    subServiceImage:filter_subService[0]?.subServiceImage,
    subServiceId:subServiceId,
    quantity:quantity,
    note:filter_subService[0]?.note,
    included:filter_subService[0]?.included,
    totalPrice:filter_subService[0]?.price
  }
}
setFilter_cartItems((prev) => {
  const existingItem = prev.find((item) => item.serviceId === serviceId && item.subService.subServiceId === subServiceId);
  if (existingItem) {
    // Item exists, so we update the quantity and price
    return prev.map((item) => {
      if (item.serviceId === serviceId && item.subService.subServiceId === subServiceId) {
        return {
          ...item,
          subService: {
            ...item.subService,
            quantity: item.subService.quantity,
            totalPrice: item.subService.totalPrice * (item.subService.quantity + quantity) / item.subService.quantity
          }
        };
      }
      return item;
    });
  } else {
    // Item doesn't exist, so we add it
    return [...prev, new_obj];
  }
});

if(cartItems.length>0){
  setCartItems((prev)=>prev.map((item)=>{
    if( item._id === categories){
      return{...item,totalPrice:item.totalPrice+price}
    }
    return {...item,totalPrice:item.totalPrice+price}
  }));
  }
  else{
    setCartItems((prev)=>
      
        [...prev,{totalPrice:price}]
      
    
  )
  }
}




const remove_obj=(serviceId,subServiceId,price)=>{
  const filterCart=filter_cartItems.filter(item=>item.serviceId==serviceId&&item.subService.subServiceId==subServiceId);
  const obj_inside=filterCart.length>0?{...filterCart[0]}:{} 
  setFilter_cartItems((prev)=>(
    prev.filter(item=>item.serviceId!==serviceId||item.subService.subServiceId!==subServiceId)
  ))
  setCartItems((prev) => 
    prev.map((item) => {
      if (item._id === categories) {
        
        return { ...item, totalPrice: item?.totalPrice - price };
      }
      else{
        return {...item,totalPrice:item?.totalPrice-price};
      }
    })
  );
  
}


  const handleAddServices = async (serviceId,subServiceId,subService,price) => {
    try {
      const obj = {
        serviceId: serviceId,
        subServiceId: subServiceId,
      };
      const response = await fetch(`http://localhost:8000/cart/cart_of_service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: "include",
      });
const filterCart=filter_cartItems.filter(item=>item.serviceId==serviceId&&item.subService.subServiceId==subServiceId);
const obj_inside=filterCart.length>0?{...filterCart[0]}:{} 
function isEmpty(obj_inside) {
  return Object.keys(obj_inside).length === 0;
}
      if(isEmpty(obj_inside)){
        return  update_addObj(serviceId,subServiceId,subService,1,price)
      }
      if(!isEmpty(obj_inside)&&obj_inside.subService.quantity>=1){
        return update_cart(serviceId,subServiceId,subService,1,price);
      }
      const new_cart=services_data?.filter(((item)=>{
        if(item._id===serviceId){
          return item;
        }
    }))
    } catch (error) {
      console.log(error);
    }
  };



  const handleSubServices = async (serviceId, subServiceId,subService,price) => {
    try {
      const obj = {
        serviceId: serviceId,
        subServiceId: subServiceId,
      };

      const response = await fetch(`http://localhost:8000/cart/reduce_service_cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: "include",
      });
const filterCart=filter_cartItems.filter(item=>item.serviceId==serviceId&&item.subService.subServiceId==subServiceId);
const obj_inside=filterCart.length>0?{...filterCart[0]}:{} 
function isEmpty(obj_inside) {
  return Object.keys(obj_inside).length === 0;
}
      if(!isEmpty(obj_inside)&&obj_inside.subService.quantity>1){
       return update_cart(serviceId,subServiceId,subService,-1,price);
      }
      else{
      return  remove_obj(serviceId,subServiceId,price)   
       }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      {isLoading && loading && cartItems ? (
        <Loader />
      ) : (
        <div className='flex w-full justify-center'>
          <div className="gap-5 justify-around w-4/5 mt-20 flex">
            <div className="h-min sticky top-24">
              <h1 className="text-3xl font-semibold mt-5 text-gray-700 mb-5">{headLine}</h1>
              {services_data.length <= 1 && !loading ? (
                <div><Promise /></div>
              ) : (
                <div
                  className={`grid h-max w-max grid-cols-${Math.ceil(services_data.length <= 2 ? 2 : services_data.length / 2)} gap-5 border-2 p-5 rounded-lg`}
                  style={{ gridTemplateColumns: `repeat(${Math.ceil(services_data.length <= 2 ? 2 : services_data.length / 2)}, 1fr)` }}
                >
                  {services_data.map((service) => (
                    <Link
                      to={service.servicePartName}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      onClick={() => setActive(service.serviceName)}
                      key={service._id}
                    >
                      <div
                        className={`bg-white p-4 w-24 h-full flex flex-col items-center justify-between rounded border-2 border-gray-200 transition-transform transform hover:scale-95 hover:border-gray-500 cursor-pointer ${
                          service.serviceName === active && "border-2 border-gray-500"
                        }`}
                      >
                        <img
                          src={service.serviceImage}
                          alt={service.serviceName}
                          className="w-full h-auto object-cover rounded"
                        />
                        <h2 className="text-center text-sm text-gray-600 font-semibold mt-4">{service.serviceName}</h2>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="scrollbar-thin scrollbar-none scrollbar-track-gray-200">
              <div className="flex flex-col border-2 rounded px-5">
                {services_data.map((service) => (
                  <div id={service.servicePartName} className="py-5" key={service._id}>
                    <h1 className="text-gray-700 text-start text-2xl font-bold">{service.serviceName}</h1>
                    {service.serviceSubType.map((subService) => (
                      <div key={subService._id}>
                        <div className="flex gap-5 items-center w-full justify-between py-4">
                          <div>
                            <h2 className="text-lg text-start font-semibold text-gray-600">{subService.subServiceName}</h2>
                            <div className="flex items-center gap-2">
                              <FaStar size={12} className="text-yellow-400" />
                              <span>{subService.serviceRatingCount} review</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center">
                                <FaIndianRupeeSign size={12} />
                                <span>{subService.price}</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <FaRegClock size={12} />
                                <span>{subService.serviceTime > 60 ? (
                                  (((subService.serviceTime) / 60).toFixed() > (subService.serviceTime) / 60 ? ((subService.serviceTime) / 60).toFixed() - 1 : ((subService.serviceTime) / 60).toFixed() + "." + (((subService.serviceTime) / 60 - 1) * 60).toFixed()) + " hr"
                                ) : `${subService.serviceTime} mins`} </span>
                              </div>
                            </div>
                            <div className="text-start">
                              <button onClick={()=>handleViewDetail()} className="text-orange-500">View details</button>
                              {showService&&<ServiceDetail/>}
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <img
                              className="rounded w-20 h-20 object-contain"
                              src={subService.subServiceImage}
                              alt={subService.subServiceName}
                            />
                            <div>
                              {filter_cartItems?.some((item) => item.serviceId === service._id && item.subService.subServiceId === subService._id) ? (
                                <div key={subService._id}>
                                  {filter_cartItems?.map((item, i) => (
                                    <MemoizedButton
                                      onClickAdd={handleAddServices}
                                      price={subService.price}
                                      subservice={subService}
                                      onClickSubtract={handleSubServices}
                                      key={i}
                                      service={item?.serviceId}
                                      subService_id={subService._id}
                                      service_id={service._id}
                                      subService={item?.subService}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleAddServices(service._id, subService._id,subService,subService.price)}
                                  className="text-orange-500 border px-5 w-15 rounded text-sm border-orange-400 mt-2 hover:bg-orange-100 font-semibold hover:border-orange-600 hover:text-orange-600"
                                >
                                  Add
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <hr className='w-full bg-gray-400'></hr>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className='w-96 h-min flex flex-col gap-3 sticky top-24'>
              <div>
                {filter_cartItems?.length > 0 ? (
                  <div className='border-2 flex flex-col gap-2 rounded-lg p-2'>
                    <h1 className='text-xl font-semibold px-2 mb-2 text-gray-700'>Cart</h1>
                    <div className="cart-container flex flex-col gap-2 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100 scrollbar-thumb-rounded" style={{ maxHeight: '155px', overflowY: 'auto' }}>
                      {[...filter_cartItems].reverse().map((service) =>
                        <div key={service.subService.subServiceId}>
                          <CartMemo
                            onClickSubtract={handleSubServices}
                            onClickAdd={handleAddServices}
                            subServiceName={service.subService.subServiceName}
                            serviceId={service.serviceId}
                            price={service.subService.totalPrice/service.subService.quantity}
                            totalPrice={service.subService.totalPrice}
                            quantity={service.subService.quantity}
                            subServiceId={service.subService.subServiceId}
                          />
                        </div>
                      )}
                    </div>
                    <hr className='bg-gray-500 h-0.5 my-2' />
                    <div>
                      <button className='flex justify-between w-full px-5 py-2 hover:bg-orange-600 bg-orange-500 rounded text-white font-semibold text-lg'>
                        <span className='flex items-center'>
                          <FaIndianRupeeSign />
                          {cartItems?.filter((services) => services._id === categories)[0]?.totalPrice||cartItems[0].totalPrice}
                        </span>
                        <span>View Cart</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-between border-2 items-center px-5 pt-3 border-b-1 border-b-black rounded'>
                    <h1 className='text-lg font-medium text-gray-600'>No item in your cart</h1>
                    <div>
                      <img className='w-36' src={emptyCart} />
                    </div>
                  </div>
                )}
              </div>
              <div>
                {services_data.length > 1 && !loading && <div><Promise /></div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServiceDetailPage;