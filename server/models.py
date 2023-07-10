from sqlalchemy_serializer import SerializerMixin

from config import db


class UserCharacter(db.Model, SerializerMixin):
    __tablename__ = 'user_characters'
    
    id = db.Column(db.Integer, primary_key=True)
    
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    character = db.relationship('Character', back_populates='user_characters')
    user = db.relationship('User', back_populates='user_characters')
    
    serialize_only = ('id', 'character_id', 'user_id')
    serialize_rules = ()
    
    def __repr__(self):
        return f'UserCharacter {self.id}, {self.character_id}, {self.user_id}'

