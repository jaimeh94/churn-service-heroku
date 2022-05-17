import requests

url = 'http://localhost:9696/predict'
# url = 'https://172.27.66.202:9696/predict'

customer = {"contract": "two_year", "tenure": 12, "monthlycharges": 10}
requests.post(url, json=customer).json()