from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
import validators

class UserCharacter(db.Model, SerializerMixin):
    __tablename__ = 'user_characters'
    
    id = db.Column(db.Integer, primary_key=True)
    
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    character = db.relationship('Character', back_populates='user_characters')
    user = db.relationship('User', back_populates='user_characters')
    
    serialize_only = ('id', 'character.name', 'user_id')
    serialize_rules = ()
    
    def __repr__(self):
        return f'UserCharacter {self.id}, {self.character_id}, {self.user_id}'

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user_characters = db.relationship('UserCharacter', back_populates='user', cascade='all')
    characters = association_proxy('-user_characters.id', '-user_characters.user_id')
    
    #! new
    notebooks = db.relationship('Notebook', back_populates='user', cascade='all')
    
    serialize_only = ('id', 'username', 'user_characters', 'notebooks')
    # serialize_rules = ('user_characters.id', 'user_characters.user_id')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # print(password)
        # print(type(password))
        password_hash = password
        self._password_hash = password_hash

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))
    
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

    # notebooks = association_proxy('interactions', 'notebook')
    #! new
    notebooks = db.relationship('Notebook', back_populates='character')
    interactions = db.relationship('Interaction', back_populates='character')
    
    serialize_only = ('id', 'name')
    serialize_rules = ()
    
    def __repr__(self):
        return f'Character {self.id}, {self.name}'

class Notebook(db.Model, SerializerMixin):
    __tablename__ = 'notebooks'
    
    id = db.Column(db.Integer, primary_key=True)
    
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    character = db.relationship('Character', back_populates='notebooks')
    user = db.relationship('User', back_populates='notebooks')
    
    # characters = association_proxy('interactions', 'character')
    #! new
    interactions = db.relationship('Interaction', back_populates='notebook')
    
    serialize_only = ('id', 'character.name', 'character_id', 'user.username',  'user_id')
    serialize_rules = ()
    
    def __repr__(self):
        return f'Notebook {self.id}, {self.character_id}, {self.user_id}, {self.visible_boolean}'


class Interaction(db.Model, SerializerMixin):
    __tablename__ = 'interactions'
    
    id = db.Column(db.Integer, primary_key=True)
    
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'))
    type_of = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    character = db.relationship('Character', back_populates='interactions')
    notebook = db.relationship('Notebook', back_populates='interactions')
    
    def __repr__(self):
        return f'Interaction {self.id}, {self.user_id}, {self.visible_boolean}, {self.type}'

class Note(db.Model, SerializerMixin):
    __tablename__ = 'notes'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    link = db.Column(db.String)
    text = db.Column(db.String)
    
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    @validates('link')
    def validate_link(self, key, link):
        if not validators.url(link):
            raise ValueError('Invalid embedded link')
        return link
    
    def __repr__(self):
        return f'Note {self.id}, {self.interaction_id}' #might want to add a title to each note