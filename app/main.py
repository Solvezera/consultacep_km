from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import requests

# Inicializar Flask
app = Flask(__name__)

# Carregar as variáveis de ambiente do arquivo .env
load_dotenv()

# Obter a chave da API do Google Maps do ambiente
api_key = os.getenv("GOOGLE_MAPS_API_KEY")

# Função para fazer a consulta à API e retornar os dados como JSON
def consultar_api(url, params=None):
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Verificar se ocorreu algum erro na solicitação
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500  # Retornar erro HTTP 500 em caso de falha na solicitação

# Rota principal
@app.route('/')
def index():
    return render_template('index.html')

# Rota para consultar CEP com a API do ViaCEP
@app.route('/cep', methods=['POST'])
def consulta_cep():
    cep = request.form.get('cep')
    if not cep:
        return jsonify({"error": "CEP não fornecido"}), 400  # Retornar erro HTTP 400 se o CEP não foi fornecido
    url = f'https://viacep.com.br/ws/{cep}/json/'
    return consultar_api(url)

# Rota para consultar quilometragem com a API do Google Maps
@app.route('/quilometragem', methods=['POST'])
def consulta_quilometragem():
    origem = request.form.get('origem')
    destino = request.form.get('destino')
    if not origem or not destino:
        return jsonify({"error": "Origem ou destino não fornecido"}), 400  # Retornar erro HTTP 400 se origem ou destino não forem fornecidos
    url = 'https://maps.googleapis.com/maps/api/distancematrix/json'
    params = {
        'units': 'metric',
        'origins': origem,
        'destinations': destino,
        'key': api_key
    }
    return consultar_api(url, params)

if __name__ == "__main__":
    app.run(debug=True)  # Executar o aplicativo Flask em modo de depuração
