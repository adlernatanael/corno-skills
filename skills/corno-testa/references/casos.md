# Casos que costumam ficar de fora

Passe por esta lista depois de escrever os casos óbvios. Só entra o que se aplica à mudança.

## Entrada

- Campo vazio, só espaços, muito longo, com acento, emoji, aspas, HTML e `'; --`.
- Número zero, negativo, decimal com vírgula e com ponto, muito grande.
- Data no passado, no futuro, 29 de fevereiro, virada de mês, fuso diferente do servidor.
- E-mail, CPF, CNPJ, telefone e CEP em formato válido, inválido e com máscara.
- Arquivo vazio, grande demais, com extensão trocada, com nome com espaço e acento.

## Estado e fluxo

- Primeira vez (sem dados), com um item, com muitos (paginação, rolagem).
- Ação feita duas vezes seguidas: duplo clique, reenvio do formulário, requisição repetida.
- Voltar do navegador, recarregar no meio do fluxo, abrir em duas abas.
- Sessão expirada no meio do fluxo.
- Cancelar no meio: nada fica gravado pela metade.

## Permissão

- Sem login, com usuário comum, com admin, com usuário de outra conta ou empresa.
- Acessar pela URL ou pela API direto o que a tela esconde.

## Falha de fora

- API, banco ou serviço externo lento, fora do ar ou devolvendo erro.
- Rede caindo no meio do envio.
- Mensagem de erro que diz o que fazer, sem stack trace nem dado interno.

## Front-end

- Celular (375 px) e desktop; texto longo que não estoura o layout.
- Só teclado: dá para chegar em tudo e o foco aparece.
- Carregando, vazio e erro aparecem e saem na hora certa.
- Console sem erro novo; nenhuma requisição falhando na rede.

## API

- Status certo para cada caso (200, 201, 400, 401, 403, 404, 409, 422).
- Corpo de erro no formato que o resto da API usa.
- Campo a mais, campo faltando, tipo errado.
- O que foi gravado no banco bate com o que a resposta diz.
- Operação que não deveria repetir (pagamento, envio) com a mesma requisição duas vezes.

## Regressão

- Cada tela, rota ou job que usa o código mudado.
- O fluxo principal do sistema, mesmo que pareça longe da mudança.
