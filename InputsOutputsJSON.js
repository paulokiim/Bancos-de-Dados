// Cartão
// POST /cartoes
const createCartao = {
    idComprador,
    bandeira,
    portador,
    digitos
};
//Output: idCartao

// /cartoes/:id
var getCartao = {
    idCartao
};
// /cartoes?comprador=idcomprador
var getCartoesByComprador = {
    idComprador
}[
    //Output:
    {
        idCartao,
        idComprador,
        bandeira,
        portador,
        digitos
    }
];

// BOLETO
// GET /boletos/:id
const getBoleto = {
    idBoleto,
    idTransacao,
    idCompra,
    codigo_barras,
    valor,
    vencimento,
    pagador,
    recebedor
};

// COMPRADOR
// POST /compradores
const createComprador = {
    nome,
    cpf,
    data_nascimento
}; // Retorna { idComprador }

// GET /compradores/:id
// Retorna: tudo

// LOJA
// POST /lojas
const createLoja = {
    nome,
    cnpj
}; // Retorna { idLoja }

// GET /lojas/:id
// Retorna: tudo

// COMPRA
// POST /compras
const createCompra = {
    idComprador,
    idLoja,
    data,
    valor,
    metodo,
    idCartao
}; // Retorna: { idCompra, [ transacoes (inteiras) ] }

// Front cria uma compra (idComprador, idLoja, valor) (back preenche a data)
// Front cria N transações vinculadas à essa compra
// Se for boleto, faz um POST de transação de boleto vinculado à compra
// Se for cartão, faz N POSTS de transação de cartão vinculados à compra
// Notas pro back:
// Sempre, ao criar uma transação, verificar se o valor da compra é igual ou não à somatória dos valores das transações relacionadas à ela

// 1. Criar compra
// 2. Criar transações vinculadas à compra
// 3. Back verifica toda vez a soma e se já deu o suficiente
// 4. Se já deu igual ou mais, muda o status da compra para paid
// 5. Transações de boleto não entram nessa somatória enquanto estiverem com o status waiting_payment (ficam sempre waiting_payment)
// 6. Se quiser adicionar uma firula, criar uma transação de cartão pode ter 20% de chance de ser reprovada
