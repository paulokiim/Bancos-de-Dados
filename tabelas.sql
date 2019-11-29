CREATE TABLE Comprador
(
    id_comprador SERIAL,
    nome VARCHAR(255),
    cpf VARCHAR(255),
    data_nascimento DATE,
    PRIMARY KEY (id_comprador)
);

-- ALTER TABLE DE ultimos_digitos para digitos
CREATE TABLE Cartao
(
    id_cartao SERIAL,
    fk_id_comprador INTEGER REFERENCES Comprador(id_comprador),
    bandeira VARCHAR(255),
    portador VARCHAR(255),
    digitos INTEGER,
    PRIMARY KEY (id_cartao)
);

CREATE TABLE Loja
(
    id_loja SERIAL,
    nome VARCHAR(255),
    cnpj VARCHAR(255),
    PRIMARY KEY (id_loja)
);

CREATE TABLE Compra
(
    id_compra SERIAL,
    fk_id_comprador INTEGER REFERENCES Comprador(id_comprador),
    fk_id_loja INTEGER REFERENCES Loja(id_loja),
    data DATE,
    valor INTEGER,
    PRIMARY KEY (id_compra)
);

CREATE TABLE Transacao
(
    id_transacao SERIAL,
    fk_id_compra INTEGER REFERENCES Compra(id_compra),
    data DATE,
    valor INTEGER,
    metodo VARCHAR(255),
    status VARCHAR(255),
    PRIMARY KEY (id_transacao)
);

CREATE TABLE Boleto
(
    id_boleto SERIAL,
    fk_id_transacao INTEGER REFERENCES Transacao(id_transacao),
    fk_id_compra INTEGER REFERENCES Compra(id_compra),
    codigo_barra VARCHAR(255),
    valor INTEGER,
    vencimento DATE,
    pagador VARCHAR(255),
    recebedor VARCHAR(255),
    PRIMARY KEY (id_boleto)
);
