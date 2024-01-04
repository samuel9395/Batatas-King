import React from "react";
import '../carrinho/cart.css';
import Home from "../home/home";

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
    alert('Pedido confirmado! Obrigado por comprar conosco!');
    setCarrinhoItens([]);
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

      <h2>Carrinho</h2>
      <ul>
        {carrinhoItens.map((item, index) => (
          <li key={index}>
            <p className="item">{item.nome}</p>
            <p className="igual">=</p>
            <p className="preco">R${typeof item.preco === 'number' ? item.preco.toFixed(2) : 0}</p>
            <div className="iconQtd">
              <button className="iconDiminuirItem" onClick={() => handleDiminuirQuantidade(index)}>-</button>
              <span>{item.quantidade}</span>
              <button className="iconAumentarItem" onClick={() => handleAumentarQuantidade(index)}>+</button>
            </div>
          </li>
          
        ))}
      </ul>
      <p className="total">Total: R${isNaN(totalCarrinho) ? 0 : totalCarrinho.toFixed(2)}</p>
      <button className="finalizar" onClick={handleFinalizarCompra}>Confirmar o pedido</button>
    </div>
  );
}

export default Carrinho;
