from flask import Flask, render_template, request, redirect, url_for, flash, session, logging, request
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from wtforms.validators import InputRequired
from passlib.hash import sha256_crypt
from functools import wraps
import pickle
import numpy as np
import os


app = Flask(__name__)

#Config flask_mysqldb
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Bourak12'
app.config['MYSQL_DB'] = 'myflaskapp'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
#init MYSQL
mysql = MySQL(app)

model=pickle.load(open('model.pkl','rb'))

picFolder = os.path.join('static', 'img')
app.config['UPLOAD_FOLDER'] = picFolder

@app.route("/")
def home():
    #Create Cursor
    cur = mysql.connection.cursor()

    #Get Articles
    result = cur.execute("SELECT * FROM url WHERE percentage>49 Order by create_date desc LIMIT 2")

    url = cur.fetchall()

    if result > 0:
        return render_template('home.html', url=url)
    else:
        msg = 'No URLs found'
        return render_template('home.html', msg=msg)

    #CLose connection
    cur.close()
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

#Register form class
class RegisterForm(Form):
    name = StringField('Name', [validators.Length(min=1, max=50)])
    username = StringField('Username', [validators.Length(min=4, max=25)])
    email = StringField('Email', [validators.Length(min=6, max=50)])
    password = PasswordField('Password',[
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match')
     ])
    confirm = PasswordField('Confirm Password')

#User register
@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        email = form.email.data
        username = form.username.data
        password = sha256_crypt.encrypt(str(form.password.data))

        #Create cursor
        cur = mysql.connection.cursor()

        #Execute query
        cur.execute("INSERT INTO users(name, email, username, password) VALUES(%s, %s, %s, %s)", (name, email, username, password))

        #commit to db
        mysql.connection.commit()

        #close connection
        cur.close()

        flash('You are now registered and can log in', 'success')

        return redirect(url_for('login'))

    return render_template('register.html', form=form)

#User login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        #Get FORM Fields
        username = request.form['username']
        password_candidate = request.form['password']

        #Create cursor
        cur = mysql.connection.cursor()

        #Get user by Username
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])

        if result > 0:
            # Get storted hash
            data = cur.fetchone()
            password = data['password']

            #Compare Passwords
            if sha256_crypt.verify(password_candidate, password):
                #Passwords match
                session['logged_in'] = True
                session['username'] = username

                flash('You are now logged in', 'success')
                return redirect(url_for('profile'))

            else:
                error = 'Invalid login'
                return render_template('login.html', error=error)

            cur.close()
        else:
            error = 'Username not found'
            return render_template('login.html', error=error)

    return render_template('login.html')

#Check if user is logged in
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('Unauthorised, Please log in', 'danger')
            return redirect(url_for('login'))
    return wrap

#Logout
@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('login'))

@app.route('/profile')
@is_logged_in
def profile():
    #Create Cursor
    cur = mysql.connection.cursor()

    #Get Articles
    result = cur.execute("SELECT * FROM url")

    url = cur.fetchall()

    if result > 0:
        return render_template('profile.html', url=url)
    else:
        msg = 'No URLs found'
        return render_template('profile.html', msg=msg)

    #CLose connection
    cur.close()

class ADD_URL(Form):
    link = StringField('Please enter your URL again', [validators.Length(min=1, max=200), InputRequired()])
    percentage = StringField('Percentage')

@app.route('/add_link', methods=['GET', 'POST'])
@is_logged_in
def add_link():
    form = ADD_URL(request.form)
    if request.method == 'POST' and form.validate():
        link = form.link.data
        percentage = form.percentage.data

        #create cursor
        cur = mysql.connection.cursor()

        #Execute
        cur.execute("INSERT INTO url(link, percentage, user) VALUES (%s, %s, %s)", (link, percentage, session['username']))

        #commit to DB
        mysql.connection.commit()

        #close connection
        cur.close()

        flash('Link has been saved', 'success')

        return(redirect(url_for('profile')))

    return render_template('predict.html', form=form)


# Delete Article
@app.route('/delete_url/<string:id>', methods=['POST'])
@is_logged_in
def delete_url(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Execute
    cur.execute("DELETE FROM url WHERE id = %s", [id])

    # Commit to DB
    mysql.connection.commit()

    #Close connection
    cur.close()

    flash('URL Deleted', 'success')

    return redirect(url_for('profile'))



@app.route("/prediction")
def prediction():
    return render_template("prediction.html")

@app.route("/predict",methods=['POST','GET'])
def predict():
    form = ADD_URL()
    int_features=[int (x) for x in request.form.values()]
    final=[np.array(int_features)]
    prediction=model.predict_proba(final)
    pred_format=prediction * 100
    output='{0:.{1}f}'.format(pred_format[-1][1], 0)
    # text = request.form['url_input']

    if output>=str(50):
        pic1 = os.path.join(app.config['UPLOAD_FOLDER'], 'tick.png')
        return render_template('add_link.html',pred='This website is safe.\n Security level of:',form=form, pred1=output, result_image=pic1)
    else:
        pic2 = os.path.join(app.config['UPLOAD_FOLDER'], 'cross.png')
        return render_template('add_link.html',pred='This website is not safe.\n Security level of only:'.format(output),form=form, pred1=output, result_image=pic2)

if __name__ == "__main__":
    app.secret_key='secret123'
    app.run(debug=True)
