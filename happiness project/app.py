import numpy as np
import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask ,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *
from flask import Flask, jsonify, render_template


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:postgres@http://127.0.0.1:50864/happiness_2017'



POSTGRES = {
    'user': 'postgres',
    'pw': 'postgres',
    'db': 'happiness_2017',
    'host': 'localhost',
    'port': '5432',
}
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES

db = SQLAlchemy(app)

meta = db.metadata
#print(meta)
engine = db.engine

connection = engine.connect()

#result = connection.execute("SELECT * FROM happiness_2017")
#for row in result:
#    print(row)


@app.route('/')
def home():
    return render_template("index.html")



@app.route('/api')
def happiness_2017():
    data = []
    
    result = connection.execute("SELECT * FROM happiness_2017")
    
    for row in result:
        data.append({"country": row[0], "happiness_rank": row[1],
            'happiness_score': row[2],
            'GDP_per_capita':row[5],
            'family':row[6],
            'life_expectency':row[7],
            'freedom':row[8],
            'generosity':row[9],
            'corruption':row[10],
            'dystopia_residual':row[11]})
    print(data)
    return jsonify(data)
    



if __name__=="__main__":
    app.run(debug=True)