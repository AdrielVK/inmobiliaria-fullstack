import Layout from "@/Components/Layouts/Layout";
import Navbar from "@/Components/Navbar/Navbar";
import { MessageInterface } from "@/Interfaces";
import React from 'react';
import { useState, useEffect } from "react";
import { RootState } from "@/redux/reducers";
import { connect } from "react-redux";
import { remove_message } from "@/redux/actions/auth";
import Message from "@/Components/Messages/Message";
import "./Home.css"
import Loading from "@/Components/Loadings/Loading";
import SearchHome from "@/Components/Search/HomeSearch";
import { get_types_list } from "@/redux/actions/posts";
import homeImage from "@/assets/homeimage.webp";
import logo from '../../assets/logo.svg';


interface HomeProps {
   
   message: MessageInterface | null;
   remove_message: () => void;
   isAuthenticated: boolean | null;
   get_types_list: () =>void;
   types_list:{ type: string }[]  | null;
}


const HomePage: React.FC<HomeProps> = ({
   
   message,
   remove_message,
   isAuthenticated,
   get_types_list,
   types_list
}) => {
   
   const [timeHome, setTimeHome] = useState<boolean>(false);
   
   useEffect(() => {
      get_types_list()
   }, [])

    useEffect(() => {
      if (message) {
         setTimeHome(true)
         setTimeout(() => 
         {
            setTimeHome(false)
            remove_message()
         }, 4500)
      }
    }, [message]);

    

   return  (
      <Layout>
         <Navbar/>
         { timeHome && message&& <Message text={message.text} type={message.type}/>}
         <section className="hero">
            <h2 className="title-home">TuCasa.com</h2>
            <h1 className="sub-title-home">Alquilar, comprar y vender. Facil</h1>
            <SearchHome types_list={types_list? types_list:null}/>
         </section>
         <section className="home-section">
            <div className="cont-home-image">
               <img src={homeImage} alt="city image" className="home-image-city"/>
               <div className="cont-home-par">
                  <h3 className="title-home-par">Lorem ipsum dolor sit amet</h3>
                  <p className="par-home-par">
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco
                     laboris nisi ut aliquip ex ea commodo consequat. 
                     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                  </p>
                  <img src={logo} alt="logo" className="img-home-par"/>
               </div>
            </div>
         </section>
         
      
      </Layout>
   )
};

const mapStateToProps= (state:RootState) => ({
   isAuthenticated: state.auth.isAuthenticated,
   message: state.auth.message,
   types_list: state.posts.types_list,
   filtered_posts_list: state.posts.filtered_posts_list
})

export default connect(mapStateToProps, {
   get_types_list,
   remove_message
})(HomePage);