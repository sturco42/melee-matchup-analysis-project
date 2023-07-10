from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class UserCharacter(db.Model, SerializerMixin):
    __tablename__ = 'user_characters'
    
    id = db.Column(db.Integer, primary_key=True)
    
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    character = db.relationship('Character', back_populates='user_characters')
    user = db.relationship('User', back_populates='user_characters')
    
    serialize_only = ('id', 'character_id', 'user_id')
    serialize_rules = ()
    
    def __repr__(self):
        return f'UserCharacter {self.id}, {self.character_id}, {self.user_id}'

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user_characters = db.relationship('UserCharacter', back_populates='user', cascade='all')
    character = association_proxy('user_characters', 'character')
    
    serialize_only = ('id', 'username', 'user_characters')
    serialize_rules = ('user_characters.id', 'user_characters.user_id')
    
    @validates('username')
    def validate_username(self, key, username):
        if type(username) not in [str] or not range(4, 20):
            raise ValueError('Username must be a string between 4 and 20 characters')
        return username

    @validates('password')
    def validate_password(self, key, password):
        if type(password) not in [str] or not range(5, 20):
            raise ValueError('Password must be a string between 5 and 20 characters')
        return password
    
    def __repr__(self):
        return f'User {self.username}'

class Character(db.Model, SerializerMixin):
    __tablename__ = 'characters'
    
    id = db.Column(db.Integer, primary_key=True)
    
    name = db.Column(db.String, unique=True)
    icon = db.Column(db.String)
    
    user_characters = db.relationship('UserCharacter', back_populates='character', cascade='all')
    users = association_proxy('user_characters', 'user')
    
    serialize_only = ('id', 'name')
    serialize_rules = ()
    
    def __repr__(self):
        return f'Character {self.id}, {self.name}'