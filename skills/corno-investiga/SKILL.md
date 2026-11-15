---
name: corno-investiga
description: Investiga bug difícil ou lentidão com método - monta um jeito rápido de reproduzir, levanta hipóteses, testa uma por vez e só corrige quando acha a causa. Use quando disserem "investiga", "debuga", "por que isso quebrou", "tá lento", "teste intermitente", "funcionava ontem", ou colarem um erro, stack trace ou relato de algo quebrado, falhando ou lento.
---

# Corno investiga

Não chute correção. Ache a causa.

## 1. Reproduza de um jeito rápido

Antes de mexer em código, monte um laço que mostra o problema em segundos, na ordem que der:

1. Um teste que falha.
2. Um `curl` ou script contra o servidor local.
3. A CLI com uma entrada fixa, comparando a saída com uma que você sabe que está certa.
4. Um script de navegador (Playwright) que clica e confere a tela, o console e a rede.
5. Repetir uma requisição ou log real salvo em arquivo.
6. Um programinha que chama só o pedaço suspeito.
7. Bug intermitente: rodar mil entradas aleatórias até aparecer.
8. Funcionava antes: `git bisect run` com o laço.

Deixe o laço curto e confiável. Se ele demora ou falha à toa, conserte o laço primeiro.

## 2. Hipóteses

Liste de 2 a 4 causas possíveis, cada uma com o que você esperaria ver se fosse ela. Teste a mais barata de descartar primeiro. Mude uma coisa por vez.

## 3. Prove a causa

Só vale quando você consegue ligar e desligar o bug mexendo na causa. "Parou de acontecer" sem saber por quê não é causa.

## 4. Corrija e prenda

Corrija no lugar certo (a raiz, não o sintoma). Transforme o laço em teste para o bug não voltar. Mostre o antes e o depois.

## Lentidão

Meça antes de otimizar: tempo total, onde o tempo vai (perfil, logs com horário), e o número depois da mudança. Sem número, não houve melhora.

## Quando parar e perguntar

Três hipóteses descartadas sem pista nova: pare de mexer. Mostre o laço, o que já foi descartado e por quê, e peça a informação que falta (ambiente, dados, passo exato).

## Relatório

1. **Causa** em uma frase.
2. **Prova**: o que ligava e desligava o bug.
3. **Correção**: o que mudou e onde (`arquivo:linha`).
4. **Trava**: o teste que agora pega a volta do bug, com a saída passando.

## Cuidado

Tire senhas, tokens e dados pessoais de logs e exemplos antes de colar em qualquer lugar.
