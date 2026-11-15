---
name: corno-confere
description: Antes de dizer que terminou, corrigiu ou passou, roda a verificação e mostra a saída. Evidência antes de afirmação. Use sempre antes de commit, PR ou de dizer "pronto", "funciona" ou "os testes passam".
---

# Corno confere

Regra única: não diga que está pronto sem ter visto funcionar agora.

## Antes de afirmar qualquer coisa

1. **Qual comando prova isso?** Testes, build, lint, o app rodando, um `curl`, um print da tela.
2. **Rode agora**, completo, depois da última mudança. Resultado de antes da mudança não vale.
3. **Leia a saída inteira.** Zero falhas, zero erros, nenhum aviso novo. "Parece que passou" não é passou.
4. **Só então afirme**, citando a evidência: "32 testes passam (saída acima)", "a tela mostra X (print)".

## Sinais de que você está pulando etapa

- Usar "deve funcionar", "provavelmente", "acho que resolve".
- Comemorar antes de rodar.
- Confiar no relatório de outro agente sem conferir.
- Rodar só o teste que você mexeu e não a suíte.
- Achar que build verde prova que a tela está certa.

## Quando algo não foi verificado

Diga exatamente o quê e por quê: "Não testei no Linux, só no macOS." Isso vale mais que um "pronto" otimista.
