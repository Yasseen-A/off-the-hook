# imports
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import warnings
import pickle


# load the data from the file
df = pd.read_csv("PhishingDataSet.csv")

df.drop(df.columns[[0, 3, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]], axis = 1, inplace = True)

# X = feature values, all the columns except the last column
X = df.iloc[:, :-1]

# y = target values, last column of the data frame
y = df.iloc[:, -1]

df[:5]

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.8)

from sklearn.linear_model import LogisticRegression

model = LogisticRegression()

model.fit(X_train, y_train)

pickle.dump(model,open('model.pkl','wb'))

#model.predict(X_test)

#model.score(X_test,y_test)
