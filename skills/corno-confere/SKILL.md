---
name: corno-confere
description: Antes de dizer que terminou, corrigiu ou passou, roda a verificação e mostra a saída. Evidência antes de afirmação. Use sempre antes de commit, PR, deploy ou de dizer "pronto", "corrigi", "funciona", "os testes passam", "done", "fixed" ou "all green".
---

# Corno confere

Regra única: não diga que está pronto sem ter visto funcionar agora.

## Antes de afirmar qualquer coisa

1. **Qual comando prova isso?** Testes, build, lint, o app rodando, um `curl`, um print da tela.
2. **Rode agora**, completo, depois da última mudança. Resultado de antes da mudança não vale.
3. **Leia a saída inteira.** Zero falhas, zero erros, nenhum aviso novo. "Parece que passou" não é passou.
4. **Só então afirme**, citando a evidência: "32 testes passam (saída acima)", "a tela mostra X (print)".

## O que conta como prova

| Mudou o quê | Prova mínima |
|---|---|
| Lógica, função, biblioteca | A suíte de testes do pacote, não só o teste novo |
| API ou rota | Uma chamada de verdade (`curl`, cliente HTTP) com a resposta |
| Tela | Print do estado mudado, no tamanho em que a pessoa usa |
| Build, CI, dependência | O build ou o job completo, do zero |
| Desempenho | O número antes e depois, medido do mesmo jeito |
| Bug corrigido | O passo que reproduzia o bug, agora sem o bug |

## Sinais de que você está pulando etapa

- Usar "deve funcionar", "provavelmente", "acho que resolve".
- Comemorar antes de rodar.
- Confiar no relatório de outro agente sem conferir.
- Rodar só o teste que você mexeu e não a suíte.
- Achar que build verde prova que a tela está certa.

## Quando algo não foi verificado

Diga exatamente o quê e por quê: "Não testei no Linux, só no macOS." Isso vale mais que um "pronto" otimista.

## Pronto quando

Toda afirmação de "pronto" na resposta aponta para uma saída que você rodou depois da última mudança, e o que não foi verificado está dito com todas as letras.
