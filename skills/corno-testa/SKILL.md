---
name: corno-testa
description: Desenvolve com teste primeiro - escreve o teste que falha, faz passar com o mínimo e só então arruma. Use quando pedirem TDD, teste primeiro, "red green refactor", "cobre isso com teste", corrigir bug com teste, testes de integração, ou "test first".
---

# Corno testa

Um ciclo por vez: vermelho, verde, arruma.

## O ciclo

1. **Vermelho.** Escreva um teste que descreve o comportamento pedido e rode. Ele tem que falhar, e pelo motivo certo (não por erro de import ou digitação).
2. **Verde.** Escreva o mínimo de código que faz esse teste passar. Nada de adiantar o próximo caso.
3. **Arruma.** Com tudo verde, limpe nomes, duplicação e estrutura. Rode de novo.
4. Próximo comportamento. Repita.

## Teste bom

- Testa o que o usuário ou quem chama vê (entrada e saída), não detalhes internos. Se refatorar quebra o teste sem mudar o comportamento, o teste estava preso ao jeito, não ao resultado.
- Um motivo para falhar. Nome que diz o comportamento: `recusa_senha_vazia`, não `teste_3`.
- Rápido e determinístico: sem relógio de verdade, rede ou ordem aleatória. Se precisar, injete.

## Onde testar

Ache a costura mais alta que ainda é barata: a função pública do módulo, a rota HTTP, o comando da CLI. Mock só na borda que você não controla (rede, pagamento, e-mail). Mock do próprio código costuma esconder o bug.

## Bug

Primeiro um teste que reproduz o bug e falha. Depois a correção. O teste fica para o bug não voltar.

## Quando não usar

Protótipo que vai para o lixo, ajuste puramente visual (prove com print) e script de uma vez só. Diga que pulou o teste e por quê.

## Não faça

- Escrever vários testes antes de fazer o primeiro passar.
- Ajustar o teste para bater com o código errado.
- Dizer que está pronto sem mostrar a saída dos testes passando.

## Pronto quando

Cada comportamento pedido tem um teste que falhou antes e passa agora, a suíte inteira está verde, e a saída está na resposta.
