from flask import Flask, render_template, request, redirect, url_for
import pickle
import numpy as np

app = Flask(__name__)

model=pickle.load(open('model.pkl','rb'))

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/prediction")
def prediction():
    return render_template("index.html")

@app.route("/predict",methods=['POST','GET'])
def predict():
    int_features=[int (x) for x in request.form.values()]
    final=[np.array(int_features)]
    prediction=model.predict_proba(final)
    pred_format=prediction * 100
    output='{0:.{1}f}'.format(pred_format[-1][1], 2)

    if output>str(50):
        return render_template('index.html',pred='This website is safe.\n Security level of %{}'.format(output))
    else:
        return render_template('index.html',pred='This website is not safe.\n Security level of only %{}'.format(output))


if __name__ == "__main__":
    app.run(debug=True)
