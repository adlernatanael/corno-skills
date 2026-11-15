---
name: corno-revisa
description: Revisão de código pesada e ambiciosa sobre estrutura e manutenção - arquivos gigantes, if espalhado, abstração que não paga o custo, código mágico. Use quando pedirem "corno revisa", revisão pesada, auditoria de qualidade ou revisão sem dó das mudanças da branch.
disable-model-invocation: true
---

# Corno revisa

Revisão sem dó das mudanças da branch atual (ou do que pedirem). O foco é a estrutura: a mudança deixou o código mais simples de entender e de mexer, ou só funciona?

## Ponto de partida

Sem alvo dito, revise `git diff $(git merge-base HEAD origin/HEAD)...HEAD` mais o que não foi commitado. Leia o diff inteiro e o código em volta dele. Pergunte: existe um jeito de reorganizar isso que mantém o comportamento e faz partes inteiras sumirem? Procure esse movimento antes de qualquer ajuste pequeno. A melhor solução é a que parece óbvia depois de pronta.

## Regras da revisão

1. **Ambição na simplificação.** Não pare em "dava para ficar um pouco melhor". Se dá para apagar complexidade em vez de mudar ela de lugar, insista nisso.
2. **Arquivo passando de mil linhas** por causa da mudança é problema por padrão. Pergunte se não é hora de separar antes.
3. **If espalhado é defeito de desenho.** Caso especial enfiado num fluxo que não tem nada a ver deixa o código pior mesmo funcionando. Leve a lógica para um lugar próprio.
4. **Código direto e sem graça vence código esperto.** Desconfie de mecanismo genérico que esconde uma suposição simples, de embrulho que só repassa, de fallback silencioso que cobre um caso que ninguém entendeu.
5. **Fronteiras claras.** Tipo opcional sem motivo, conversões em cascata e objeto montado na mão onde caberia um tipo de verdade são custo de manutenção.
6. **Não carimbe "funciona".** Se o comportamento pode ficar igual com estrutura bem melhor, peça a versão melhor.
7. **Meça duas vezes.** Cada apontamento precisa de um caminho concreto: o que mudar, onde, e por que fica mais simples. Sem apontamento vago.

## Aponte sem dó

- Implementação complicada onde um outro jeito de pensar apagaria uma categoria inteira de complexidade.
- Refatoração que só muda código de lugar sem diminuir o que o leitor precisa segurar na cabeça.
- Booleano de ocasião, modo opcional ou flag que complica um fluxo que já existia.
- Lógica de uma funcionalidade vazando para módulo genérico, ou na camada errada.
- Embrulho que só repassa, cast, `any` e parâmetro opcional que borram o contrato.
- Lógica copiada em vez de extraída, ou helper novo quando o projeto já tem o canônico.
- Desvio "temporário" que vai virar dívida permanente.
- Estado atualizado em partes, deixando o meio do caminho inconsistente.

## Remédios preferidos

Apagar uma camada inteira em vez de polir; remodelar o estado para os `if` sumirem em vez de centralizá-los; mudar quem é dono do conceito para a funcionalidade virar extensão natural; trocar caso especial por um fluxo padrão com menos exceções; separar orquestração de regra de negócio; usar o helper que já existe. Não se contente com "renomeia isso" quando o problema é de estrutura.

## Barra para aprovar

Só aprove sem: regressão estrutural clara, chance óbvia perdida de simplificar muito, arquivo inchando sem motivo, `if` espalhado por casos especiais, abstração mágica ou embrulho sem função, vazamento de camada ou helper duplicado. Qualquer um desses é bloqueio até o autor justificar.

## Formato da resposta

- Comece pelo veredito em uma frase: pode entrar, entra com ajustes, ou precisa repensar.
- Depois, os apontamentos do mais grave para o menos grave, cada um com `arquivo:linha`, o problema e a correção.
- Se houver um movimento grande de simplificação, descreva ele primeiro e mostre como o código ficaria.
- Não liste estilo nem formatação a menos que mude o sentido.

## O que fica de fora

Bug de lógica fino, segurança e desempenho só entram se aparecerem no caminho; o foco aqui é estrutura. Estilo e formatação ficam com o formatador do projeto.
