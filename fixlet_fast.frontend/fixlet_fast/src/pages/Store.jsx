import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { get_all_product } from "../app/Actions/product_action";
import { Link } from 'react-scroll';
import { FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useContext } from 'react';
import { currentContext } from '../component/Context.jsx';
import { IoCloseOutline } from "react-icons/io5";
import ProductDetail from '../component/ProductDetail.jsx';



function Store() {
  const { isLogin, userInfo, isLoading } = useSelector(state => state.user);
  const { productLoading, productData, productError } = useSelector(state => state.store);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const city = searchParams.get('city') || "mumbai";
  const state = userInfo?.state;
  const location = useLocation();
  const Context=useContext(currentContext);
  const [active, setActive] = useState(null);
  const [productShow,setProductDetail]=useState(null);

  useEffect(() => {
    Context.setCartShow(false)
    dispatch(get_all_product({ state, city }));

    return()=>{
      Context.setCartShow(true);
    }
  }, [dispatch, city, state,Context]);
  const { headLine } = location.state || {};

const handleAddCart=()=>{
  console.log("add")

}

console.log(productShow)


const handleViewDetail=(productId,subProductId)=>{
  const newCart = productData?.filter(item => item._id === productId);
const newSubService = newCart?.[0]?.serviceSubType?.find(item => item._id === subProductId);
return setProductDetail({serviceId:productId,subServiceId:subProductId,subservice:newSubService})
  
  }



  return (
    <>
      {productLoading ? "" :
        <main className='flex w-full justify-center'>
          <div className='gap-5 justify-around w-4/5 mt-20 flex'>
            <div className="h-min sticky top-20">
              <h1 className="text-3xl font-semibold mt-5 text-gray-700 mb-5">{headLine}</h1>
              <div className={`grid h-max w-max grid-cols-${Math.ceil(productData?.length <= 2 ? 2 : productData?.length / 2)} gap-5 border-2 p-5 rounded-lg`} style={{ gridTemplateColumns: `repeat(${Math.ceil(productData?.length <= 2 ? 2 : productData?.length > 2 ? 3 : productData?.length / 2)}, 1fr)` }}>

                {productData?.map((product) => (
                  <Link
                    to={product.productType}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={() => setActive(product.productName)}
                    key={product._id}
                  >
                    <div
                      className={`bg-white p-4 w-24 h-full flex flex-col items-center justify-between rounded border-2 border-gray-200 transition-transform transform hover:scale-95 hover:border-gray-500 cursor-pointer ${
                        product.productName === active && "border-2 border-gray-500"
                      }`}
                    >
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-full h-auto object-cover rounded"
                      />
                      <h2 className="text-center text-sm text-gray-600 font-semibold ">{product.productName}</h2>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className={`scrollbar-thin scrollbar-none scrollbar-track-gray-200`}>
              <div className="flex flex-col border-2 rounded px-5">
                {productData?.map((product) => (
                  <div id={product.productType} className="py-5" key={product._id}>
                    <h1 className="text-gray-700 text-start text-2xl font-bold">{product.productName}</h1>
                    {product.subProduct.map((subProduct) => (
                      <div key={subProduct._id}>
                        <div className="flex gap-5 items-center w-full justify-between py-4">
                          <div>
                            <h2 className="text-lg text-start font-semibold text-gray-600">{subProduct.subProductName}</h2>
                            <div className="flex items-center gap-2">
                              <FaStar size={12} className="text-yellow-400" />
                              <span>{subProduct.productRatingCount} review</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center">
                                <FaIndianRupeeSign size={12} />
                                <span>{subProduct.price}</span>
                              </div>
                            </div>
                            <div className="text-start">
                              <button onClick={()=>handleViewDetail(product._id,subProduct._id,subProduct)} className="text-orange-500">View details</button>
                              {productShow&&<div className='fixed z-20 bg-black bg-opacity-5 left-0 top-0 justify-center items-center  flex flex-col  w-full h-screen '>
                                <div  className=' w-1/3  flex-col flex  items-end '>

                                    <button  onClick={()=>setProductDetail(false)} className='bg-white rounded-full p-1 mb-2  translate-y-0'><IoCloseOutline size={20}/></button>

                                  <div className=' w-full rounded-xl  custom-scrollbar  bg-white py-5'>
                                    <div className="overflow-auto custom-scrollbar h-96">
                              <ProductDetail      dataDetail={productShow} /></div>
                              </div>
                              </div></div>}
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <img
                              className="rounded w-20 h-20 object-contain"
                              src={subProduct.subProductImage[0]}
                              alt={subProduct.subProductName}
                            />
                          
                          <button onClick={handleAddCart} className="text-orange-500 border px-5 w-15 rounded text-sm border-orange-400 mt-2 hover:bg-orange-100 font-semibold hover:border-orange-600 hover:text-orange-600">
                                  Add
                                </button>
                          </div>
                        </div>
                        <hr className='w-full bg-gray-400'></hr>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className='w-96 h-min flex flex-col gap-3 sticky top-24'></div>
          </div>
        </main>
      }
    </>
  );
}

export default Store;
