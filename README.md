# 💼 Desafio Front-End - Lista de Produtos

## 📋 Enunciado do desafio

Para front-end: Crie uma aplicação front-end com:

* Um formulário de criação de produto com os campos: **nome**, **preço**, **sku**
* Ao enviar, o produto é adicionado à lista visível na tela, **vinda de um endpoint** (mockado ou real)
* A lista deve ser **ordenada por nome**
* Deve ser possível **remover um item da lista**
* Na listagem de produtos, mostrar para cada item:

  > **A primeira letra do alfabeto ausente no nome do produto**, considerando apenas letras de a-z (ou '\_' se todas se repetirem)

### Requisitos:

* Pode usar **React**, ou outro framework da vaga
* Os dados podem ser **armazenados em memória** ou **consumidos de uma API mockada** (pode ser criada com `json-server` ou outra lib de mock HTTP)

---

## ⚠️ Observação

> Embora o enunciado permita o uso de dados em memória ou mockados, **optei por consumir a API real que desenvolvi no desafio do back-end**.
> Essa escolha foi feita para simular um fluxo mais realista de comunicação entre front-end e back-end.
> Caso necessário, o projeto pode ser facilmente adaptado para utilizar uma API mockada com `json-server`, `msw` ou similar.
