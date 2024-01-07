import React, { useCallback, useEffect, useState } from "react";
import '../cadastro/cadastro.css';


export default function Cadastro({ cadastroItens,setCarrinhoItens, handleEnviarPedido }) {
    const [nome, setNome] = useState("");
    //const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState("");
    const [rua, setRua] = useState("");

    const buscarEndereco = useCallback(async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setRua(data.logradouro);
            } else {
                setRua("");
            }
        } catch (error) {
            console.error("Erro ao buscar endereço:", error);
            alert("Erro ao buscar endereço.");
        }
    }, [cep]);

    useEffect(() => {
        const fetchData = async () => {
            if (cep.length === 8) {
                await buscarEndereco();
            }
        };
        fetchData();
    }, [cep, buscarEndereco]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Array.isArray(cadastroItens) && cadastroItens.length > 0) {
            const mensagemPedido = cadastroItens
              .map(
                (item) =>
                  `${item.nome} = ${item.quantidade}x, Preço: R$${item.preco.toFixed(2)}`
              )
              .join('\n');

              const valorTotaldoPedido = cadastroItens.reduce((total, item) => {
                return total + (item.quantidade * item.preco);
              }, 0).toFixed(2);
              const mensagemCompleta = `${mensagemPedido}\n\nValor total do pedido: R$${valorTotaldoPedido}`;
            if ((cep.length === 8) && (numero > 0) && (nome !== "") ){
            const mensagemCadastro = `Dados do cliente;\nNome: ${nome}\nEndereço: ${rua}, n°${numero}\nCep: ${cep}\n\nDetalhes do Pedido:\n${mensagemCompleta}`;
      
            const linkWhatsapp = `https://wa.me/+5511957733587?text=${encodeURIComponent(mensagemCadastro)}`;
            window.open(linkWhatsapp, '_blank');
      
            // Limpe os dados do cadastro após o envio
            setNome('');
            //setTelefone('');
            setCep('');
            setNumero('');
            setRua('');
            // Limpe o carrinho após o pedido ser confirmado
            setCarrinhoItens([]);
      
            // Adicione a chamada da função para enviar o pedido
            handleEnviarPedido();
        } else {
            alert('Preencha os dados corretamente!');
        }
          } else {
            alert('Adicione algum produto ao carrinho!');
          }
        };
    
    

    return (
        <div className="cadastro">
            
            <h3>Preencha com seus dados</h3><br/>
            <form className="formInput" onSubmit={handleSubmit}>
                <label className="texto">Nome:</label>
                <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} /><br />
                {/*<label className="texto">Tel:</label>
                <input type="tel" name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} /><br />*/}
                <label className="texto">Cep:</label>
                <input type="number" id='cep' name="cep" maxLength="8" value={cep} onChange={(e) => setCep(e.target.value)} /><br />
                <label className="texto">Rua:</label>
                <input type="text" id='rua' value={rua} readOnly /><br />
                <label className="texto">Número:</label>
                <input type="number" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} /><br />
                {/*<button type="button" onClick={buscarEndereco}>Buscar Endereco</button>*/}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}


