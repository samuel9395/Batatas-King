import React from "react";
import dadoProdutos from "./dadosProdutos";
import Add from "../../assets/imagens/add.png";
import '../produtos/produto.css';
import Check from "../../assets/check/check";

// ...

function Produtos(props) {
    const handleClick = (produto) => {
      props.addToCart(produto);
    };
  
    return (

      <div>
        <h3>Batatas recheadas</h3>
      <div className="grid-container">
        {dadoProdutos.map((dadoProdutos) => (
          <div className="grid-item" key={dadoProdutos.id}>
            <img className="ft" src={dadoProdutos.imagem} alt={dadoProdutos.nome} />
            <p className="batata">{dadoProdutos.nome}</p>
            <p className="descricao">{dadoProdutos.descricao}</p>
            <img
              className="addCart"
              src={Add}
              alt="" 
            />
            <p className="price">R${dadoProdutos.preco.toFixed(2)}<p onClick={() => handleClick(dadoProdutos)}><Check/></p></p>
          </div>
        ))}
      </div>
      </div>
    );
  }
  
  
  export default Produtos;
  
  
  