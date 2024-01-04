import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Produtos from './components/produtos/produto';
import Carrinho from './components/carrinho/cart';
import '../src/App.css';

function App() {
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  const addToCart = (produto) => {
    // Verifica se o produto já está no carrinho
    if (!carrinhoItens.find((item) => item.id === produto.id)) {
      // Se não estiver, adiciona ao carrinho
      setCarrinhoItens([...carrinhoItens, { ...produto, quantidade: 1 }]);
    }
  };

  const toggleCarrinho = () => {
    setCarrinhoAberto(!carrinhoAberto);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home toggleCarrinho={toggleCarrinho} totalItens={carrinhoItens.length} />} />
            <Route path="/carrinho" element={<Carrinho carrinhoItens={carrinhoItens} setCarrinhoItens={setCarrinhoItens} />} />
          </Routes>
         
          <Produtos addToCart={addToCart} />
        </header>
      </div>
    </Router>
  );
}

export default App;
