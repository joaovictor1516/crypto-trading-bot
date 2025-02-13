# Crypto Trading Bot

## Descrição
Este projeto  de estudos é um bot automatizado de trading de criptomoedas utilizando a API da Binance. Ele monitora o mercado e executa ordens de compra e venda com base no índice RSI (Relative Strength Index).

## Tecnologias Utilizadas
- **Linguagem**: JavaScript
- **Bibliotecas**:
  - `axios`: Para requisições HTTP
  - `crypto`: Para geração de assinaturas seguras
  - `dotenv`: Para gerenciamento de variáveis de ambiente

## Funcionalidades
- **Monitoramento de Preço**: Obtém dados de mercado da Binance.
- **Cálculo do RSI**: Analisa a tendência do mercado com base no RSI.
- **Execução de Ordens**: Compra quando o RSI está abaixo de 30 e vende quando está acima de 70.

## Configuração e Instalação
1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/crypto-trading-bot.git
   cd crypto-trading-bot
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente criando um arquivo `.env`:
   ```ini
   API_KEY=sua_api_key
   SECRET_KEY=sua_secret_key
   ```
4. Execute o bot:
   ```sh
   node index.js
   ```

## Como Funciona
1. O bot obtém os dados de mercado da Binance.
2. Calcula o índice RSI baseado nos últimos 14 períodos.
3. Se o RSI estiver abaixo de 30, ele executa uma ordem de compra.
4. Se o RSI estiver acima de 70, ele executa uma ordem de venda.
5. O bot verifica o mercado a cada 3 segundos.