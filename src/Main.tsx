import React, { useState, useEffect } from "react";
import apple from './assets/main/apple.png';
import googleplay from './assets/main/googleplay.png';
import bobplace from './assets/main/bobplace.png';
import bobtext from './assets/main/bobtext.png';
import bobpool from './assets/main/bobpool.png';

const Main = () => {
  
  return (
    <>
        <div style={{width: '100vw', height: '100vh', background:'#6C69FF', textAlign: 'center'}}>

            <div style={{margin: '0 auto'}}>
              <img style={{width: '402px', display: 'inline-block'}} src={bobplace} alt="bobplace" />
              <img style={{width: '402px'}} src={bobtext} alt="bobtext" />
            </div>
            <div style={{margin: '0 auto'}}>
                <img style={{width: '200px', height:'60px', marginRight: 14}} src={apple} alt="AppStore" />
                <img style={{width: '200px', height:'60px'}} src={googleplay} alt="GooglePlay" />
            </div>
            <div style={{margin: '0 auto'}}>
              <img style={{width: '100vw'}} src={bobpool} alt="bobpool" />
            </div>
        </div>
    </>
  )
};

export default Main;
