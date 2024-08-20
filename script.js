const produtos = document.querySelectorAll('.produto');
const listaPedidos = document.getElementById('lista-pedidos');
const totalSpan = document.getElementById('total');
let total = 0;
let sanduicheSelecionado = null;

produtos.forEach(produto => {
    produto.addEventListener('click', () => {
        const tipo = produto.getAttribute('data-tipo');
        const nome = produto.getAttribute('data-nome');
        const preco = parseFloat(produto.getAttribute('data-preco'));

        if (tipo === 'sanduiche') {
            sanduicheSelecionado = nome;
            alert(`Você selecionou ${nome}. Agora escolha uma combinação.`);
        } else if (tipo === 'combinacao' && sanduicheSelecionado) {
            total += preco;
            totalSpan.textContent = total.toFixed(2) + '€';

            const li = document.createElement('li');
            li.textContent = `${sanduicheSelecionado} com ${produto.textContent}`;
            listaPedidos.appendChild(li);

            sanduicheSelecionado = null;
        } else if (tipo !== 'sanduiche' && tipo !== 'combinacao') {
            total += preco;
            totalSpan.textContent = total.toFixed(2) + '€';

            const li = document.createElement('li');
            li.textContent = produto.textContent;
            listaPedidos.appendChild(li);
        } else {
            alert('Por favor, selecione um sanduíche primeiro.');
        }
    });
});
