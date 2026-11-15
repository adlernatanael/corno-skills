---
name: corno-confere
description: Antes de dizer que terminou, corrigiu ou passou, roda a verificação agora e mostra a saída. Evidência antes de afirmação, sem exceção. Use sempre antes de commit, PR, deploy, de passar a vez para outra pessoa ou de dizer "pronto", "corrigi", "funciona", "os testes passam", "done", "fixed" ou "all green", e sempre que for repassar o resultado de outro agente.
---

# Corno confere

**Lei única: nada de "pronto" sem prova rodada agora.** Se o comando que prova não rodou nesta resposta, depois da última mudança, você não sabe se passa. Mudar as palavras para escapar da regra ("deve estar ok", "acho que foi") é quebrar a regra do mesmo jeito.

## O portão

Antes de afirmar qualquer estado, ou de soar satisfeito:

1. **Qual comando prova isso?** Escolha o que prova a afirmação inteira, não uma parte.
2. **Rode completo, agora.** Resultado de antes da última mudança não conta.
3. **Leia a saída inteira**: código de saída, número de falhas, avisos novos. Não pare na primeira linha verde.
4. **A saída confirma?** Se não, diga o estado real com a saída. Se sim, afirme citando a saída.

Pulou um passo, não conferiu: chutou.

## O que prova o quê

| Afirmação | Prova | Não basta |
|---|---|---|
| Testes passam | Saída da suíte com 0 falhas | Rodada anterior, "deve passar", só o teste novo |
| Lint ou tipos limpos | Saída do lint/typecheck com 0 erros | Lint passou, então tipo também |
| Build funciona | Build completo terminando com código 0 | Lint verde, log "parece bom" |
| API funciona | Uma chamada real com a resposta | O código parece certo |
| Tela certa | Print do estado mudado no tamanho em que a pessoa usa | Build verde |
| Bug corrigido | O passo que reproduzia o bug, agora sem o bug | Código mudado, suposição |
| Teste de regressão vale | Ele falhou sem a correção e passa com ela | Passou uma vez |
| Desempenho melhorou | Número antes e depois, medido do mesmo jeito | "Ficou mais rápido" |
| Outro agente terminou | O diff de verdade e a verificação rodada por você | O relatório dele dizendo "sucesso" |
| Pedido atendido | Cada item do pedido conferido, um por um | Testes verdes |

## Sinais de que você está pulando o portão

- "Deve funcionar", "provavelmente", "parece que", "acho que resolve".
- Comemorar ("Perfeito!", "Pronto!") antes de rodar.
- Commit, push ou PR sem verificação fresca.
- Confiar no relatório de outro agente.
- Verificação parcial tratada como total.
- "Só desta vez", "é mudança pequena", "estou sem tempo".

## Desculpas e o que responder a elas

| Desculpa | Resposta |
|---|---|
| "Agora deve funcionar" | Então rode. |
| "Tenho certeza" | Certeza não é saída de comando. |
| "É só um ajuste pequeno" | Ajuste pequeno quebra build igual. |
| "O lint passou" | Lint não compila nem testa. |
| "O agente disse que deu certo" | Confira o diff e rode você. |
| "Conferir tudo demora" | Demora menos que desfazer um "pronto" errado. |

## Quando algo não dá para verificar

Diga exatamente o quê e por quê: "Não testei no Linux, só no macOS", "Não consegui rodar a suíte de integração sem o banco". Um "não verifiquei X" honesto vale mais que um "pronto" otimista.

## Pronto quando

Toda afirmação de sucesso na resposta aponta para uma saída que você rodou depois da última mudança, e tudo que não foi verificado está dito com todas as letras.
