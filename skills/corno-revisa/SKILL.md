---
name: corno-revisa
description: Revisão de código pesada e ambiciosa sobre estrutura e manutenção - arquivos gigantes, if espalhado, abstração que não paga o custo, código mágico. Use quando pedirem "corno revisa", revisão pesada, auditoria de qualidade ou revisão sem dó das mudanças da branch.
disable-model-invocation: true
---

# Corno revisa

Revisão sem dó das mudanças da branch atual (ou do que pedirem). O foco é a estrutura: a mudança deixou o código mais simples de entender e de mexer, ou só funciona?

## Ponto de partida

Leia o diff inteiro e o código em volta dele. Pergunte: existe um jeito de reorganizar isso que mantém o comportamento e faz partes inteiras sumirem? Procure esse movimento antes de qualquer ajuste pequeno. A melhor solução é a que parece óbvia depois de pronta.

## Regras da revisão

1. **Ambição na simplificação.** Não pare em "dava para ficar um pouco melhor". Se dá para apagar complexidade em vez de mudar ela de lugar, insista nisso.
2. **Arquivo passando de mil linhas** por causa da mudança é problema por padrão. Pergunte se não é hora de separar antes.
3. **If espalhado é defeito de desenho.** Caso especial enfiado num fluxo que não tem nada a ver deixa o código pior mesmo funcionando. Leve a lógica para um lugar próprio.
4. **Código direto e sem graça vence código esperto.** Desconfie de mecanismo genérico que esconde uma suposição simples, de embrulho que só repassa, de fallback silencioso que cobre um caso que ninguém entendeu.
5. **Fronteiras claras.** Tipo opcional sem motivo, conversões em cascata e objeto montado na mão onde caberia um tipo de verdade são custo de manutenção.
6. **Não carimbe "funciona".** Se o comportamento pode ficar igual com estrutura bem melhor, peça a versão melhor.
7. **Meça duas vezes.** Cada apontamento precisa de um caminho concreto: o que mudar, onde, e por que fica mais simples. Sem apontamento vago.

## Formato da resposta

- Comece pelo veredito em uma frase: pode entrar, entra com ajustes, ou precisa repensar.
- Depois, os apontamentos do mais grave para o menos grave, cada um com `arquivo:linha`, o problema e a correção.
- Se houver um movimento grande de simplificação, descreva ele primeiro e mostre como o código ficaria.
- Não liste estilo nem formatação a menos que mude o sentido.
