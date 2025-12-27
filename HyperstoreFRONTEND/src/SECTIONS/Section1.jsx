import React, { useState, useEffect } from 'react';
import {
  kitkat,  Kid25banner,  boyandgirl,  menbannerai,  womenpose,
  twokidsshopping,  pizzaimage,  grocerybag,  capsules,  fishsalmon,
  bgpattern,fastdelivery,Securepayments,bestdeals,
  nikeairforce,nikebrown,pharmaindustry,
  olivetshirt} from '../assets/Index';

const Section1 = () => {
  const bigboximages = [womenpose, menbannerai, boyandgirl, twokidsshopping, Kid25banner];
  const firstboximage = [kitkat, nikeairforce,pharmaindustry,olivetshirt,nikebrown];
  const secondboximage = [grocerybag, fishsalmon,pizzaimage];

  // duplicate bigboximages for smooth infinite loop
  const bigLoop = bigboximages.concat(bigboximages);

  // state for the two small boxes
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);

  useEffect(() => {
    const firstInterval = setInterval(() => {
      setFirstIndex((p) => (p + 1) % firstboximage.length);
    }, 3500); // change every 3.5s (adjustable)

    const secondInterval = setInterval(() => {
      setSecondIndex((p) => (p + 1) % secondboximage.length);
    }, 4200); // change every 4.2s (adjustable)

    return () => {
      clearInterval(firstInterval);
      clearInterval(secondInterval);
    };
  }, [firstboximage.length, secondboximage.length]);

  return (
    <div style={{ margin: '5% 0 0 0' }}>
      <main style={{ background: 'linear-gradient(to bottom, white, white)' }}>
        
        <section
          id="hero"
          style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr",
                gridTemplateRows: "auto auto",
                gap: "1rem",
                padding: "2rem",
                borderRadius: "1rem",
                margin: "6%",
                background: `radial-gradient(circle at 10% 10%, 
                rgba(225, 120, 25, 1), 
                rgba(255, 255, 220, 0.0), 
                rgba(255, 255, 255, 0.0))`,
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.0)", }} >


          {/* TEXT AREA */}
          <div style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Welcome to Our Store
            </h1>
            <p style={{ color: 'gray', fontSize: '1rem', lineHeight: '1.5' }}>
              Discover the future of shopping. Handpicked collections, unbeatable prices,
              and lightning-fast delivery — all in one place.
            </p>
          </div>

          {/* LARGE RIGHT — Infinite Sliding Carousel (uses bigboximages) */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: '1 / 3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: '1rem',
              position: 'relative',
              minHeight: '320px',
              margin:"1%"
            }}>


            <div
              style={{
                display: 'flex',
                width: 'max-content',
                animation: 'big-slide 25s linear infinite',
                gap:"7%"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {bigLoop.map((imgSrc, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: '0 0 100%',
                    width: '100%',
                    maxWidth: '760px',
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={`big-slide-${idx}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '1rem',
                      display: 'block',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    }}
                  />
                </div>
              ))}
            </div>

            <style>
              {`
                @keyframes big-slide {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-535%); }
                }
                .big-carousel-track:hover { animation-play-state: paused; }
              `}
            </style>
          </div>

          {/* BOTTOM LEFT: TWO SEPARATE SMALL BOXES (each has its own fade slideshow) */}
          <div
            style={{
              gridColumn: '1 / 2',
              gridRow: '3 / 2',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: "clamp(0.5rem, 2vw, 1rem)",
              marginTop: "auto",
            }} >


            {/* FIRST SMALL BOX */}
            <div
              style={{
                 position: 'relative',
                 width: '100%',
                 height: 'clamp(120px, 25vw, 490px)',
                 overflow: 'hidden',
                 borderRadius: 'clamp(0.5rem, 2vw, 1rem)',
                 boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }} >

              {firstboximage.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`firstbox-${idx}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: idx === firstIndex ? 1 : 0,
                    transition: 'opacity 0.9s ease-in-out',
                    borderRadius: '1rem',
                    display: 'block',
                  }}
                />
              ))}
            </div>

            {/* SECOND SMALL BOX */}
            <div
              style={{
                 position: 'relative',
                 width: '100%',
                 height: 'clamp(120px, 20vw, 260px)',
                 overflow: 'hidden',
                 borderRadius: 'clamp(0.5rem, 2vw, 1rem)',
                 boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}>

              {secondboximage.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`secondbox-${idx}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: idx === secondIndex ? 1 : 0,
                    transition: 'opacity 0.9s ease-in-out',
                    borderRadius: '1rem',
                    display: 'block',
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
    id="features"
    style={{
    position: "relative",
    margin: '8%',
    backgroundColor: 'rgb(244, 240, 225)',
    padding: '0rem',
    borderRadius: '1rem', 
    height:"clamp(390px,99vh,677px)",
    overflow: "visible", }}>


     <img src={bgpattern}  style={{
                      position: "absolute", // 🔹 make it a background layer                  
                      width: 'max-width',
                      
                      objectFit: 'cover',
                      borderRadius: '1rem',                                         
                      opacity: 1, // 🔹 keep it subtle
                      zIndex: 0,
                      overflow: "hidden",  }} alt="images"/>


  <div style ={{ zIndex: 12,opacity: 0.99,
   padding:'0% 2% 0% 2%' }}>

    <h2 className="text-[clamp(1.2rem,3vw,4rem)] 
         font-semibold text-center  top-5">
    Features  </h2>

 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-18
   text-center  h-[clamp(250px,40vh,310px)] " 
                     style={{
                      padding:"0% 0% 10% 0%",                                         
                      opacity: 1, // 🔹 keep it subtle
                       }}>



    {/* Fast Delivery */}
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm 
    hover:shadow-lg transition-shadow duration-300 h-[clamp(150px,50vh,530px)] ">
      <i className="fa-solid fa-truck-fast text-3xl text-green-700 mb-3"></i>
      <h3 className="text-lg font-semibold">Fast Delivery</h3>
      <p className="text-gray-600 text-l mt-2">
        Get your orders delivered within 24 to 48 hours across major cities.
      </p>
      <img src={fastdelivery}  alt="delivery" 
      style={{ borderRadius: '1rem',
       height:"clamp(150px,50vh,530px)" ,
       overflow:"hidden" ,
       width:"100%" }} />
    </div>



    {/* Secure Payments */}
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm
     hover:shadow-lg transition-shadow duration-300 h-[clamp(150px,50vh,530px)] ">
      <i className="fa-solid fa-lock text-3xl text-green-700 mb-3"></i>
      <h3 className="text-lg font-semibold">Secure Payments</h3>
      <p className="text-gray-600 text-sm mt-2">
        Your transactions are protected with end-to-end encryption.
      </p>
      <img src={Securepayments}  alt="delivery" 
         style={{
                  borderRadius: '1rem',
                  height:"clamp(150px,50vh,530px)"                                         
                  }} />
    </div>


    {/* Best Deals */}
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm 
    hover:shadow-lg transition-shadow duration-300 h-[clamp(150px,50vh,530px)] ">
      <i className="fa-solid fa-tags text-3xl text-green-700 mb-3"></i>
      <h3 className="text-lg font-semibold">Best Deals</h3>
      <p className="text-gray-600 text-sm mt-2">
        Enjoy exclusive discounts and seasonal offers every week.
      </p>
      <img src={bestdeals}  alt="delivery" style={{
                  borderRadius: '1rem',
                  height:"clamp(150px,50vh,530px)",overflow:"hidden" ,
                  width: '100%',
                                                         
                  }} />
    </div>
  </div>
    
  </div>                  

  
  
</section>


        {/* Products Section */}
        
      </main>
    </div>
  );
};

export default Section1;
