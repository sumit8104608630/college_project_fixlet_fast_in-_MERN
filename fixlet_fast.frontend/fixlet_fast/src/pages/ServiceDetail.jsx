import React from 'react'

function ServiceDetail(props) {

  const service_id=props.service_id;
  const subServiceId=props.subServiceId;
  const subservice=props.subservice;
  console.log(service_id,subServiceId,subservice);


  return (
    <div className='fixed z-20 bg-black bg-opacity-5 left-0 top-0 justify-center items-center  flex w-full h-screen '>
      <div className='border-1 rounded bg-white px-5 py-2'>
        <h1 >serviceDetail</h1>
        <div>
          <div>
            <h1></h1>
          </div>
        </div>
        <hr/>
        <div>

        </div>
        <hr/>
        <div>

        </div>
      </div>
    </div>
  )
}

export default ServiceDetail