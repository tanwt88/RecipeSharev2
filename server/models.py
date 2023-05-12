from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime

db=SQLAlchemy()

def get_uuid():
    return uuid4().hex
    

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32),primary_key=True,unique=True, default =get_uuid)
    country=db.Column(db.String(20))
    email = db.Column(db.String(345), unique=True)
    name = db.Column(db.String(345), unique=True)
    password =db.Column(db.Text, nullable =False)
    created_at=db.Column(db.DateTime,nullable=False, default=datetime.utcnow)

class Admin(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.String(32),primary_key=True,unique=True, default =get_uuid)
    email = db.Column(db.String(345), unique=True)
    password =db.Column(db.Text, nullable =False)
    
class Recipe(db.Model):
    __tablename__ = "recipes"
    id = db.Column(db.String(32), primary_key=True, unique=True, default =get_uuid)
    name=db.Column(db.String(30),nullable=False)
    photo_url = db.Column(db.String(250), unique=True)
    ingredients = db.Column(db.String(1000), nullable=False)
    directions = db.Column(db.String(1500), nullable=False)
    video_url = db.Column(db.String(200), unique=True)
    cooking_time = db.Column(db.Integer,nullable = False)
    prep_time = db.Column(db.Integer, nullable = False)
    total_time = db.Column(db.Integer, nullable = True)
    calories = db.Column(db.Integer, nullable= False)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=True)
    user = db.relationship('User', backref='recipes')
    ratings = db.Column(db.Float(2),nullable=True, default=0.0)
    favourite = db.Column(db.Boolean,nullable=True,default=False)
    created_at=db.Column(db.DateTime,nullable=False, default=datetime.utcnow)
    
class Feedback(db.Model):
    __tablename__ = "feedback"
    id = db.Column(db.String(32),primary_key=True,unique=True, default =get_uuid)
    user_id = db.Column(db.String(32), primary_key=False)
    subject = db.Column(db.String(32), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    created_at=db.Column(db.DateTime,nullable=False, default=datetime.utcnow)
    
class Report(db.Model):
    __tablename__ = "report"
    id = db.Column(db.String(32),primary_key=True,unique=True, default =get_uuid)
    reportedby_id = db.Column(db.String(32), nullable =False)
    reportedon_user = db.Column(db.String(32), nullable =False)
    feedback = db.Column(db.String(1000), nullable=False)
    created_at=db.Column(db.DateTime,nullable=False, default=datetime.utcnow)