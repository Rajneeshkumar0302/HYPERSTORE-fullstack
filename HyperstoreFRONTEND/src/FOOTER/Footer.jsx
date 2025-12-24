import React from "react";
import { twitter,instagram,linkedin,facebook,googlepay, paytm, phonepe, mastercard, visa} from '../assets/Index';
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <section
      style={{
        backgroundColor: "rgb(200,90,25)",  padding: "clamp(1.5rem, 3vw, 3rem)",
        color: "#e9d7ae",  fontFamily: "Arial, sans-serif",    width: "100%", }} >
      <div style={{ maxWidth: "90%", margin: "0 auto", display: "flex",
          flexWrap: "wrap", // Enables stacking on small screens
          justifyContent: "space-between", alignItems: "center",  gap: "4%",}}>


        {/* LEFT TEXT + ICONS */}
        <div  style={{ flex: "1 1 350px",  minWidth: "180px",
            maxWidth: "400px",display: "flex", flexDirection:"column",
            alignItems: "stretch",   // important for the vertical line height
             justifyContent: "space-between",}}>
             


          <h2 style={{  fontWeight: "bold",  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          marginBottom: "clamp(0.8rem, 2vw, 1rem)",}}>
            About Us
          </h2>

          <p style={{  color:"black", marginBottom: "clamp(1rem, 2.5vw, 1.5rem)",
              lineHeight: 1.5,  fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",}} >
            We bring you everything at near-marketplace prices with unbeatable quality and trust.
             Our goal is to make online shopping feel as real as your local market.
             Soon, with virtual Try-on technology, you’ll experience products before you buy them
          </p>

          {/* Social Icons */}
         
        </div>


 {/* ✅ VERTICAL LINE */}
<div
  style={{ width: "2px",  backgroundColor: "rgb(2,4,8)",
    margin: "0 2rem", alignSelf: "stretch",}}></div>






{/* ✅ RIGHT: CONTACT + FOLLOW US */}
        <div
          style={{
            flex: "1 1 350px",
            minWidth: "280px",
           
            display: "flex",
            flexDirection: "column",alignContent:"center",
            gap: "1.9rem",
             }}  >

          {/* Contact Us */}
          <div>
            <h2 style={{ fontWeight: "bold",fontSize: "clamp(1.3rem, 2.5vw, 2rem)",marginBottom: "0.8rem", }}>
              Contact Us
            </h2>

             <p style={{ display: "flex",  alignItems: "center",  gap: "0.6rem",
                fontSize: "clamp(0.9rem, 1.1vw, 1rem)",marginBottom: "0.5rem",color:"black"}} >
              <MapPin size={18} /> Vijay Nagar , Nilmatha, Lucknow(U.P), India
            </p>



            <p style={{ display: "flex", alignItems: "center", gap: "0.6rem",
                fontSize: "clamp(0.9rem, 1.1vw, 1rem)",  marginBottom: "0.5rem",
              color:"black"}}>
              <Phone size={18} /> +91 6388995482  </p>



            <p
              style={{ display: "flex", alignItems: "center",
                gap: "0.6rem", fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
              color:"black"}}>
              <Mail size={18} /> kranjish0@gmail.com
            </p>
          </div>




          {/* Follow Us */}
          <div>
            <h3 style={{ fontWeight: "bold", fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                marginBottom: "0.8rem", }}> Follow Us
            </h3>

            <div
              style={{
                display: "flex",  gap: "1rem",  flexWrap: "wrap", }} >
              {[
                { name: "Instagram", src: instagram },
                { name: "LinkedIn", src: linkedin },
                { name: "Facebook", src: facebook },
                { name: "Twitter", src: twitter },
              ].map((icon, index) => (
                <button  key={index}
                style={{
                    
                    cursor: "pointer",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  } >
                  <img
                    src={icon.src}
                    alt={icon.name}
                    style={{
                      height: "clamp(22px, 4vw, 34px)",
                      width: "clamp(22px, 4vw, 34px)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          </div>
      

       {/* ✅ VERTICAL LINE */}
<div
  style={{ width: "2px",  backgroundColor: "rgb(2,4,8)",
    margin: "0 2rem", alignSelf: "stretch",}}></div>


        {/* ✅ RIGHT SIDE CARDS */}
  {/* ✅ PAYMENT + TERMS SECTION */}
<div
  style={{
    flex: "1 1 300px",
    minWidth: "250px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "1.5rem",
  }}
>
  {/* 💳 PAYMENT SECTION */}
  <div>
    <h2
      style={{
        fontWeight: "bold",
        fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
        marginBottom: "0.8rem", }} >  Payment Options
    </h2>



    <p style={{ color: "rgb(240,250,250)",
        fontSize: "clamp(0.9rem, 1vw, 1rem)", marginBottom: "1rem", }}  >
      We support all major cards, UPI, and wallets.  
      100% secure payments with end-to-end encryption.
    </p>

    {/* 💰 PAYMENT ICONS */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"white",
        padding:"5%",
        borderRadius:"49%"
      }}
    >
      {[
        { name: "Google Pay", src: googlepay },
        { name: "Paytm", src: paytm },
        { name: "PhonePe", src: phonepe },
        { name: "Mastercard", src: mastercard },
        { name: "Visa", src: visa },
      ].map((method, index) => (
        <img
          key={index}
          src={method.src}
          alt={method.name}
          style={{
            height: "clamp(26px, 3vw, 39px)",
            width: "auto",
            filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))",
            transition: "transform 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      ))}
    </div>
  </div>

  {/* ⚖️ TERMS OF SERVICE SECTION */}
  <div>
    <h2 style={{ fontWeight: "bold", fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
        marginBottom: "0.8rem", }} >  Terms & Policies </h2>


    <p  style={{ color:"black", fontSize: "clamp(0.9rem, 1vw, 1rem)",
        lineHeight: 1.5, }} >
      By using <strong>HyperStore</strong>, you agree to our  
      <span style={{ color: "#e9d7ae" }}> Terms of Service </span> and  
      <span style={{ color: "#e9d7ae" }}> Privacy Policy</span>.  
      We ensure complete data privacy and transparency.
    </p>
  </div>
</div>
      </div>
    </section>
  );
};

export default Footer;






