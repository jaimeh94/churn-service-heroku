import pickle

from flask import Flask, render_template
from flask import request
from flask import jsonify
from flask_cors import CORS

# model_file = 'model1.bin'
# dv_file = 'dv.bin'

# with open(model_file, 'rb') as f_in:
#     model = pickle.load(f_in)

# with open(dv_file, 'rb') as f_in:
#     dv = pickle.load(f_in)

with open('model_small.bin', 'rb') as f_in: 
    dv, model = pickle.load(f_in)

app = Flask(__name__)

CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    customer = request.get_json()

    X = dv.transform([customer])
    y_pred = model.predict_proba(X)[0,1]
    churn = y_pred >= 0.5

    result = {
        'churn_probability': float(y_pred),
        'churn': bool(churn)
    }
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5500)


