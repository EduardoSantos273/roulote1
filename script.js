const produtos = document.querySelectorAll('.produto');
const listaPedidos = document.getElementById('lista-pedidos');
const totalSpan = document.getElementById('total');
let total = 0;

produtos.forEach(produto => {
    produto.addEventListener('click', () => {
        const preco = parseFloat(produto.getAttribute('data-preco'));
        total += preco;
        totalSpan.textContent = total.toFixed(2) + '€';

        const li = document.createElement('li');
        li.textContent = produto.textContent;
        listaPedidos.appendChild(li);
    });
});
