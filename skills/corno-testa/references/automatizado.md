# Teste automatizado que não engana

Para os casos que viram teste no repositório.

## O ciclo

1. **Vermelho.** Escreva um teste que descreve o comportamento e rode. Ele tem que falhar, e pelo motivo certo (não por erro de import ou digitação).
2. **Verde.** O mínimo de código que faz esse teste passar.
3. **Arruma.** Com tudo verde, limpe nomes, duplicação e estrutura. Rode de novo.

Um teste de cada vez. Escrever todos antes de fazer o primeiro passar testa a forma imaginada, não o comportamento.

## Teste bom

- Testa o que o usuário ou quem chama vê (entrada e saída), não detalhes internos.
- Um motivo para falhar. Nome que diz o comportamento: `recusa_senha_vazia`, não `teste_3`.
- Rápido e determinístico: sem relógio de verdade, rede ou ordem aleatória. Se precisar, injete.
- Na costura mais alta que ainda é barata: a função pública do módulo, a rota HTTP, o comando da CLI. Mock só na borda que você não controla (rede, pagamento, e-mail).

## Teste que engana

- **Preso à implementação**: mock de peça interna, método privado, conferir pelo banco em vez da interface. Quebra quando você refatora sem mudar o comportamento.
- **Tautológico**: calcula o esperado do mesmo jeito que o código (`expect(soma(a, b)).toBe(a + b)`). O esperado vem de fonte independente: um valor conhecido, um exemplo feito à mão, a especificação.
- **Ajustado ao erro**: mudar o esperado para bater com o código errado. Se o teste discorda do código, descubra quem está certo antes.
