const produtos = document.querySelectorAll('.produto');
const listaPedidos = document.getElementById('lista-pedidos');
const totalSpan = document.getElementById('total');
const adicionarClienteBtn = document.getElementById('adicionar-cliente');
const clientesDiv = document.getElementById('clientes');
const itensAdicionadosDiv = document.getElementById('itens-adicionados');
const nomeClienteInput = document.getElementById('nome-cliente');
let total = 0;
let sanduicheSelecionado = null;
let itensAdicionados = {};

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

            const item = `${sanduicheSelecionado} ${produto.textContent}`;
            if (itensAdicionados[item]) {
                itensAdicionados[item]++;
            } else {
                itensAdicionados[item] = 1;
            }
            atualizarItensAdicionados();

            sanduicheSelecionado = null;
            document.querySelectorAll('.produto[data-tipo="combinacao"]').forEach(combinacao => {
                combinacao.classList.remove('ativo');
            });
        } else if (!tipo) {
            total += preco;
            totalSpan.textContent = total.toFixed(2) + '€';

            const item = produto.textContent;
            if (itensAdicionados[item]) {
                itensAdicionados[item]++;
            } else {
                itensAdicionados[item] = 1;
            }
            atualizarItensAdicionados();
        }
    });
});

adicionarClienteBtn.addEventListener('click', () => {
    const nomeCliente = nomeClienteInput.value || `Cliente ${clientesDiv.children.length + 1}`;
    const clienteDiv = document.createElement('div');
    clienteDiv.classList.add('cliente');
    clienteDiv.textContent = nomeCliente;

    const pedidoUl = document.createElement('ul');
    for (const [item, quantidade] of Object.entries(itensAdicionados)) {
        const li = document.createElement('li');
        li.textContent = `${item} (${quantidade})`;
        pedidoUl.appendChild(li);
    }

    clienteDiv.appendChild(pedidoUl);
    clientesDiv.appendChild(clienteDiv);

    // Resetar os itens adicionados e o total
    itensAdicionados = {};
    total = 0;
    totalSpan.textContent = '0.00€';
    itensAdicionadosDiv.innerHTML = '';
    nomeClienteInput.value = '';
});

function atualizarItensAdicionados() {
    itensAdicionadosDiv.innerHTML = '';
    for (const [item, quantidade] of Object.entries(itensAdicionados)) {
        const div = document.createElement('div');
        div.textContent = `${item} (${quantidade})`;
        itensAdicionadosDiv.appendChild(div);
    }
}
