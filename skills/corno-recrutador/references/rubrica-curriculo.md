# Rubrica do currículo: 25 itens, 100 pontos

Mede a qualidade do documento em si, sem olhar vaga.

## Cálculo

Cada item recebe `passa` (vale o peso inteiro), `parcial` (metade) ou `não passa` (zero). Item que não deu para avaliar sai da conta.

```
nota = arredondar(100 × pontos ganhos / pontos possíveis entre os itens avaliados)
```

Diga a cobertura junto da nota ("23 de 25 itens avaliados").

## 1. Leitura pelo sistema de triagem: 20 pontos

Avalie sobre o texto extraído, não sobre o que a pessoa acha que escreveu.

| Item | Peso | Passa quando |
|---|---:|---|
| Camada de texto | 5 | O PDF tem texto extraível. Escaneado ou exportado como imagem não passa, e a resposta abre com esse aviso |
| Coluna única | 4 | Uma coluna. Duas colunas, tabela, caixa de texto e barra lateral embaralham a leitura |
| Contato legível | 3 | E-mail e telefone aparecem no texto extraído em formato reconhecível |
| Nada vital em cabeçalho ou rodapé | 3 | Vários leitores descartam cabeçalho e rodapé |
| Arquivo limpo | 3 | PDF ou DOCX, até 2 MB, nome profissional (`nome-sobrenome-cargo.pdf`, não `cv final v3 (2).pdf`) |
| Fontes legíveis | 2 | O texto extraído não sai com caracteres trocados |

## 2. Estrutura e seções: 16 pontos

| Item | Peso | Passa quando |
|---|---:|---|
| Seções essenciais | 6 | Contato, resumo, experiência, formação e competências. Cada uma que falta tira uma parte |
| Tamanho | 4 | 1 página até 5 anos de carreira, até 2 acima disso. 3 ou mais não passa, salvo currículo acadêmico |
| Títulos reconhecíveis | 3 | "Experiência profissional", não "Minha jornada" |
| Ordem esperada | 3 | Contato, resumo, experiência, formação, competências. Júnior pode pôr formação antes |

## 3. Conteúdo e impacto: 30 pontos

Onde quase todo currículo perde ponto.

| Item | Peso | Passa quando |
|---|---:|---|
| Conquistas com número | 10 | Metade ou mais dos bullets do cargo mais recente tem número, percentual, prazo, escala ou valor. É o item mais pesado |
| Verbo de ação | 5 | 70% ou mais dos bullets começam com verbo no passado ("Reduzi", "Liderei"), não com substantivo ("Testes exploratórios") |
| Ortografia | 5 | Sem erro de ortografia e gramática. Liste as correções exatas |
| Resumo | 4 | 2 a 4 linhas com uma proposta concreta, sem clichê sem prova ("proativo", "orientado a resultados") |
| Formato dos bullets | 3 | 1 a 2 linhas cada, 3 a 6 por cargo. Parágrafo corrido não passa |
| Repetição | 3 | Nenhum verbo ou expressão repetido demais |

## 4. Trajetória e senioridade: 18 pontos

| Item | Peso | Passa quando |
|---|---:|---|
| Progressão | 6 | A sequência de cargos conta uma história de crescimento e o documento deixa isso visível |
| Competência com prova | 6 | As competências listadas aparecem na experiência. Competência solta, sem menção no histórico, é ruído e o recrutador percebe |
| Sinais de escopo | 3 | Tamanho de time, orçamento, abrangência ou autonomia compatíveis com o nível que a pessoa quer |
| Peso no recente | 3 | Os 2 cargos mais recentes têm o detalhe; cargos de mais de 10 anos ocupam uma linha |

## 5. Riscos e sinais de RH: 16 pontos

O que faz descartar em segundos.

| Item | Peso | Passa quando |
|---|---:|---|
| Lacunas | 5 | Nenhuma lacuna acima de 6 meses sem explicação. O conselho é nomear (estudo, sabático, cuidado familiar, saúde), não esconder |
| Credibilidade | 4 | Sem datas sobrepostas sem explicação, título incompatível com o escopo descrito ou exagero verificável |
| Troca frequente | 3 | Menos de 3 passagens abaixo de 12 meses nos últimos 5 anos, ou com contexto (projeto, contrato) |
| Dados pessoais | 2 | No Brasil, sem CPF, RG, endereço completo, estado civil, idade e filhos. Foto é neutra no Brasil; para EUA/Europa vira parcial |
| Contato profissional | 2 | E-mail sóbrio, LinkedIn com URL personalizada, links funcionando |

## Faixas

| Nota | Faixa | Diagnóstico |
|---|---|---|
| 0 a 39 | Crítico | Provavelmente nem chega a um humano. Comece pela leitura do sistema |
| 40 a 59 | Fraco | O sistema lê, o humano não se convence. Falta impacto com número |
| 60 a 74 | Mediano | Passa no filtro, não se diferencia |
| 75 a 89 | Bom | Competitivo. Ajuste para cada vaga |
| 90 a 100 | Excelente | Mantenha atualizado e faça versões por vaga |

## Reescrita

Nunca invente número, empresa, cargo, data ou tecnologia. O número que falta vira `{XX}`:

```
antes:  Testes de API via Postman para garantir a qualidade em novas features.
depois: Validei {XX} endpoints via Postman e reduzi os defeitos em produção em {XX%}.
```

Se a reescrita tem um dígito que não estava no original e não está entre chaves, refaça.
