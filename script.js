const produtos = document.querySelectorAll('.produto');
const listaPedidos = document.getElementById('lista-pedidos');
const totalSpan = document.getElementById('total');
const adicionarClienteBtn = document.getElementById('adicionar-cliente');
const clientesDiv = document.getElementById('clientes');
let total = 0;
let sanduicheSelecionado = null;

produtos.forEach(produto => {
    produto.addEventListener('click', () => {
        const tipo = produto.getAttribute('data-tipo');
        const nome = produto.getAttribute('data-nome');
        const preco = parseFloat(produto.getAttribute('data-preco'));

        if (tipo === 'sanduiche') {
            sanduicheSelecionado = nome;
            document.querySelectorAll('.produto[data-tipo="combinacao"]').forEach(combinacao => {
                combinacao.classList.add('ativo');
            });
        } else if (tipo === 'combinacao' && sanduicheSelecionado) {
            total += preco;
            totalSpan.textContent = total.toFixed(2) + '€';

            const li = document.createElement('li');
            li.textContent = `${sanduicheSelecionado} ${produto.textContent}`;
            listaPedidos.appendChild(li);

            sanduicheSelecionado = null;
            document.querySelectorAll('.produto[data-tipo="combinacao"]').forEach(combinacao => {
                combinacao.classList.remove('ativo');
            });
        } else if (!tipo) {
            total += preco;
            totalSpan.textContent = total.toFixed(2) + '€';

            const li = document.createElement('li');
            li.textContent = produto.textContent;
            listaPedidos.appendChild(li);
        }
    });
});

adicionarClienteBtn.addEventListener('click', () => {
    const clienteDiv = document.createElement('div');
    clienteDiv.classList.add('cliente');
    clienteDiv.textContent = 'Cliente';
    clientesDiv.appendChild(clienteDiv);
});
