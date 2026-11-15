---
name: corno-confere
description: Antes de dizer que terminou, confere duas coisas - se tudo que foi pedido na conversa ou na tarefa foi feito, item por item, inclusive o que chegou no meio do trabalho, e se cada item tem prova rodada agora, não suposição. Diz o que falta em vez de "está tudo certo". Use sempre que o agente for dizer "pronto", "feito", "terminei", "corrigi", "funciona", "os testes passam", "done" ou "fixed"; quando a pessoa perguntar "veja se faltou coisa", "faltou algo?", "terminou?", "tá pronto?" ou "confere aí"; e antes de commit, PR, deploy ou de repassar o resultado de outro agente.
---

# Corno confere

**Lei única: nada de "pronto" sem duas provas: que tudo que foi pedido foi feito, e que cada coisa feita funciona agora.** O corno é o último a saber: o agente diz que terminou, esqueceu metade do pedido e nem rodou a outra metade. Mudar as palavras para escapar da regra ("deve estar ok", "acho que foi") é quebrar a regra do mesmo jeito.

## 1. Junte tudo que foi pedido

Releia a conversa desde o último "pronto" aceito, ou desde o começo da tarefa. Não só a última mensagem:

- O pedido original e cada mudança de rumo depois dele.
- As mensagens que chegaram enquanto você trabalhava. São as que mais se perdem.
- Os detalhes ditos de passagem ("e tira aquela barra", "deixa preto e branco").
- O que a tarefa exige mesmo sem ser dito: testes que a mudança quebrou, telas que usam o componente mexido, docs e textos que ficaram desatualizados.

Escreva a lista, um item por linha, com as palavras da pessoa.

## 2. Prove cada item, agora

Para cada item, o portão:

1. **Qual prova mostra que está feito e funcionando?** A que cobre o item inteiro, não uma parte.
2. **Rode agora**, depois da última mudança. Resultado de antes não conta.
3. **Leia a saída inteira**: código de saída, número de falhas, avisos novos.
4. **Ela confirma?** Marque **feito** (com a prova), **parcial** (o que falta) ou **não feito**.

| Tipo de item | Prova | Não basta |
|---|---|---|
| Mudança em código ou texto | O trecho no arquivo (`arquivo:linha`) ou o diff | "Mudei" |
| Lógica, função | A suíte do pacote com 0 falhas | Só o teste novo, rodada antiga |
| Build, tipos, lint | O comando completo terminando com código 0 | Lint verde provando o build |
| API, integração | Uma chamada real com a resposta | O código parece certo |
| Algo visual | Print do estado mudado no tamanho em que a pessoa usa | Build verde |
| Bug corrigido | O passo que reproduzia o bug, agora sem o bug | Código mudado |
| Algo removido | Busca mostrando que não sobrou nada | "Apaguei" |
| Algo publicado (push, deploy, envio) | Confirmação do outro lado: status remoto, CI, URL | O comando local não deu erro |
| Desempenho | Número antes e depois, medido do mesmo jeito | "Ficou mais rápido" |
| Trabalho de outro agente | O diff real e a sua conferência | O relatório dele dizendo "sucesso" |

## 3. Feche o que faltou

Item parcial ou não feito: faça agora, se está no escopo, e passe pelo portão de novo. Se não dá para fazer (falta acesso, decisão da pessoa, informação), diga exatamente qual e por quê.

## 4. Só então responda

- "Pronto" só se todos os itens estiverem feitos e provados.
- Pedido com mais de uma parte: mostre a lista curta com o estado e a prova de cada item.
- O que não deu para verificar vai escrito: "não testei no Safari", "o deploy não foi feito".

## Sinais de que você está sendo corno

- Responder só à última mensagem e esquecer as anteriores.
- "Deve funcionar", "provavelmente", "parece que", "acho que resolve".
- Comemorar ("Perfeito!", "Tudo certo!") antes de conferir.
- Commit, push ou PR sem prova fresca.
- Conferir uma parte e afirmar o todo.
- Confiar no relatório de outro agente.
- "Só desta vez", "é mudança pequena", "esse detalhe a pessoa nem vai notar".

## Desculpas e a resposta

| Desculpa | Resposta |
|---|---|
| "Agora deve funcionar" | Então rode. |
| "Tenho certeza" | Certeza não é saída de comando. |
| "Já fiz o principal" | A pessoa pediu tudo, não o principal. |
| "É só um ajuste pequeno" | Ajuste pequeno quebra build igual. |
| "O lint passou" | Lint não compila nem testa. |
| "O agente disse que deu certo" | Confira o diff e rode você. |
| "Conferir tudo demora" | Menos que desfazer um "pronto" errado. |

## Quando não usar

Conversa sem entrega (explicar um conceito, opinar): não há pedido para conferir nem nada para rodar.

## Pronto quando

Cada coisa pedida na conversa tem um estado e uma prova rodada depois da última mudança, o que faltava foi feito ou está dito, e a palavra "pronto" só aparece se nada ficou para trás.
