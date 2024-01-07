import React from "react";
import Home from "../home/home";
import Cadastro from "../cadastro/cadastro";
//import { Link } from "react-router-dom";
import '../carrinho/cart.css';



function Carrinho({ carrinhoItens = [], setCarrinhoItens }) {
  const handleDiminuirQuantidade = (index) => {
    const updatedCarrinho = [...carrinhoItens];
    const item = updatedCarrinho[index];

    if (item.quantidade === 1) {
      updatedCarrinho.splice(index, 1);
    } else {
      item.quantidade -= 1;
    }

    setCarrinhoItens(updatedCarrinho);
  };


  const handleAumentarQuantidade = (index) => {
    const updatedCarrinho = [...carrinhoItens];
    const item = updatedCarrinho[index];
    item.quantidade += 1;
    setCarrinhoItens(updatedCarrinho);
  };

  const handleFinalizarCompra = () => {

    if (carrinhoItens.length > 0) {
      const mensagemPedido = carrinhoItens.map((item) => `${item.nome} (Quantidade: ${item.quantidade}, Preço: R$${item.preco.toFixed(2)})`).join('\n');

      const linkWhatsapp = `https://wa.me/+5511967225300?text=${encodeURIComponent(
        `Pedido:\n${mensagemPedido}\nTotal: R$${isNaN(totalCarrinho) ? 0 : totalCarrinho.toFixed(2)}`
      )}`;
      window.open(linkWhatsapp, "_blank");
    }else {
      alert('Adicione algum produto ao carrinho!');
    }
    //setCarrinhoItens([]);
    //*window.location.href = "/cadastro";
  };

  const totalCarrinho = carrinhoItens
    ? carrinhoItens.reduce((total, item) => {
        const precoItem = typeof item.preco === 'number' ? item.preco : 0;
        return total + (precoItem * item.quantidade || 0);
      }, 0)
    : 0;

  return (
    <div className="carrinho-container">

    <div className="headHome">
      <Home/>
    </div>

      <h3>Carrinho</h3>
      <ul>
        {carrinhoItens.map((item, index) => (
          <li key={index}>
            <p className="item">{item.nome}</p>
            <p className="igual">=</p>
            <p className="preco">R${typeof item.preco === 'number' ? item.preco.toFixed(2) : 0}</p>
            <div className="iconQtd">
              <button className="iconDiminuirItem" onClick={() => handleDiminuirQuantidade(index)}>-</button>
              <span className="qtd">{item.quantidade}</span>
              <button className="iconAumentarItem" onClick={() => handleAumentarQuantidade(index)}>+</button>
            </div>
          </li>
          
        ))}
      </ul>
      <p className="total">Total: R${isNaN(totalCarrinho) ? 0 : totalCarrinho.toFixed(2)}</p>
          {/*<button className="finalizar" onClick={handleFinalizarCompra}>Confirmar o pedido</button>*/}
        <div className="register">
          <Cadastro cadastroItens={carrinhoItens} setCarrinhoItens={setCarrinhoItens} handleEnviarPedido={handleFinalizarCompra}/>
        </div>
    </div>
  );
}

export default Carrinho;