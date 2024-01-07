import React from "react";
import image from "../../assets/imagens/logo.png";
import cart from "../../assets/imagens/cart.png";
import zap from "../../assets/imagens/zap.png";
import insta from "../../assets/imagens/insta.png";
import { Link } from "react-router-dom";
import "../home/home.css";

function Home({ toggleCarrinho, totalItens }) {

const numeroWhatsapp = "+5511957733587"; 
const mensagem = "Olá, gostaria de fazer um pedido direto.\nGostaria de ver o cardápio por favor...";
const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

const linkInstagram = "https://www.instagram.com/batata_king_01/";


  return (
    <div id="head">
      <h1>BATATA KING</h1>
      <h5>Venha ser um BATATA LOVERS...</h5>
      <div className="img">
        <img className="logo" src={image} alt="logo" />
      </div>
      <div className="icones">
        <Link to="/carrinho" className="cart" id="btnCart" onClick={toggleCarrinho}>
            <span className="itensCarrinho">{totalItens}</span>
            <img className="imgCart" src={cart} alt="cart" />
        </Link>
        <a href={linkWhatsapp} target="_blank" rel="noopener noreferrer"className="zap" id="btnZap" >
          <img src={zap} alt="whatsapp" />
        </a>
        <a href={linkInstagram} target="_blank" rel="noopener noreferrer"className="insta" id="btnInsta">
          <img src={insta} alt="instagram" />
        </a>
      </div>
      <p className="fim" />
    </div>
  );
}

export default Home;