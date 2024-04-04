# Flask API de Consulta de CEP e Quilometragem

Este é um aplicativo Flask simples que fornece duas rotas para consulta de informações:

1. Consulta de CEP utilizando a API do ViaCEP.
2. Consulta de quilometragem entre dois pontos utilizando a API do Google Maps.

## Como usar

1. Clone o repositório:
   `git clone https://github.com//Solvezera/consultacep_km.git`

2. Instale as dependências:
   `pip install -r requirements.txt`

3. Crie um arquivo .env na raiz do projeto e adicione sua chave da API do Google Maps:
`GOOGLE_MAPS_API_KEY=SuaChaveDaAPIAqui`

4. Execute o aplicativo:
`python app.py`

## Rotas
### Consulta de CEP
- URL: /cep
- Método HTTP: POST
- Parâmetros:
    - cep: CEP que deseja consultar

- Resposta:
    - Retorna os dados do endereço correspondente ao CEP em formato JSON.

### Consulta de Quilometragem
- URL: /quilometragem
- Método HTTP: POST
- Parâmetros:
    - origem: Localização de origem (pode ser um endereço ou coordenadas)
    - destino: Localização de destino (pode ser um endereço ou coordenadas)
- Resposta:
    - Retorna a quilometragem entre a origem e o destino em formato JSON.

## Observações
- Certifique-se de fornecer sua própria chave da API do Google Maps no arquivo .env.
- O aplicativo está configurado para rodar em modo de depuração (debug=True). Não utilize isso em ambientes de produção.
- Este aplicativo é apenas para fins educacionais e pode ser expandido conforme necessário para atender a outros requisitos.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma [issue](https://github.com/Solvezera/consultacep_km/issues) ou enviar um [pull request](https://github.com/Solvezera/consultacep_km/pulls).

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).