// Array para armazenar os funcionários
let funcionarios = [];
let indiceEditando = null;

// Classe Funcionario
class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = Number(idade);
        this.cargo = cargo;
        this.salario = Number(salario);
    }

    // Métodos getters e setters
    getNome() {
        return this.nome;
    }
    setNome(novoNome) {
        this.nome = novoNome;
    }
    getIdade() {
        return this.idade;
    }
    setIdade(novaIdade) {
        this.idade = Number(novaIdade);
    }
    getCargo() {
        return this.cargo;
    }
    setCargo(novoCargo) {
        this.cargo = novoCargo;
    }
    getSalario() {
        return this.salario;
    }
    setSalario(novoSalario) {
        this.salario = Number(novoSalario);
    }

    // Método para retornar informações formatadas
    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: ${this.salario}`;
    }
}

// Função para renderizar a tabela de funcionários
const renderTabela = () => {
    const tabela = document.getElementById('tabelaFuncionarios');
    tabela.innerHTML = '';
    funcionarios.forEach((func, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${func.nome}</td>
            <td>${func.idade}</td>
            <td>${func.cargo}</td>
            <td>${func.salario.toFixed(2)}</td>
            <td>
                <button onclick="editarFuncionario(${index})">Editar</button>
                <button onclick="excluirFuncionario(${index})">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
};

// Função para cadastrar ou atualizar um funcionário
const salvarFuncionario = (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    if (indiceEditando !== null) {
        // Atualiza funcionário existente
        funcionarios[indiceEditando].setNome(nome);
        funcionarios[indiceEditando].setIdade(idade);
        funcionarios[indiceEditando].setCargo(cargo);
        funcionarios[indiceEditando].setSalario(salario);
        alert("Funcionário atualizado com sucesso!");
        indiceEditando = null;
    } else {
        // Cria e adiciona um novo funcionário
        const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
        funcionarios.push(novoFuncionario);
        alert("Funcionário cadastrado com sucesso!");
    }
    document.getElementById('funcionarioForm').reset();
    renderTabela();
};

// Função para editar funcionário
const editarFuncionario = (index) => {
    const func = funcionarios[index];
    document.getElementById('nome').value = func.nome;
    document.getElementById('idade').value = func.idade;
    document.getElementById('cargo').value = func.cargo;
    document.getElementById('salario').value = func.salario;
    indiceEditando = index;
};

// Função para excluir funcionário
const excluirFuncionario = (index) => {
    if (confirm("Deseja realmente excluir este funcionário?")) {
        funcionarios = funcionarios.filter((_, i) => i !== index);
        alert("Funcionário excluído com sucesso!");
        renderTabela();
    }
};

// Eventos do formulário utilizando função anônima
document.getElementById('funcionarioForm').addEventListener('submit', salvarFuncionario);

// Relatórios utilizando arrow functions e métodos de array

// 1. Funcionários com Salário > R$ 5000
document.getElementById('relSalarioMaior5000').addEventListener('click', () => {
    const filtrados = funcionarios.filter(func => func.salario > 5000);
    let relatorio = '<h3>Funcionários com Salário > R$ 5000:</h3>';
    filtrados.forEach(func => relatorio += `<p>${func.toString()}</p>`);
    document.getElementById('relatorioResultado').innerHTML = relatorio;
});

// 2. Média Salarial
document.getElementById('relMediaSalarial').addEventListener('click', () => {
    if (funcionarios.length === 0) {
        alert("Nenhum funcionário cadastrado.");
        return;
    }
    const somaSalarios = funcionarios.reduce((soma, func) => soma + func.salario, 0);
    const media = somaSalarios / funcionarios.length;
    document.getElementById('relatorioResultado').innerHTML = `<h3>Média Salarial: R$ ${media.toFixed(2)}</h3>`;
});

// 3. Cargos Únicos
document.getElementById('relCargosUnicos').addEventListener('click', () => {
    const cargos = funcionarios.map(func => func.cargo);
    const cargosUnicos = [...new Set(cargos)];
    let relatorio = '<h3>Cargos Únicos:</h3>';
    cargosUnicos.forEach(cargo => relatorio += `<p>${cargo}</p>`);
    document.getElementById('relatorioResultado').innerHTML = relatorio;
});

// 4. Nomes em Maiúsculo
document.getElementById('relNomesMaiusculo').addEventListener('click', () => {
    const nomesMaiusculo = funcionarios.map(func => func.nome.toUpperCase());
    let relatorio = '<h3>Nomes dos Funcionários (Maiúsculo):</h3>';
    nomesMaiusculo.forEach(nome => relatorio += `<p>${nome}</p>`);
    document.getElementById('relatorioResultado').innerHTML = relatorio;
});
