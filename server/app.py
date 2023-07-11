#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, session
from flask_restful import Resource
from models import db, UserCharacter, User, Character, Notebook, Interaction, Note, Clip

# Local imports
from config import app, db, api
# from models import iuahergiuher

# Views go here!

class Characters(Resource):
    
    def get(self):
        characters = [character.to_dict() for character in Character.query.all()]
        return make_response(characters, 200)

api.add_resource(Characters, '/characters')

class CharacterById(Resource):
    
    def get(self, id):
        character = db.session.get(Character, id)
        if character:
            return make_response(character.to_dict(), 200)
        return make_response({'error': 'Character not found'}, 404)
    
api.add_resource(CharacterById, '/characters/<int:id>')

class Users(Resource):
    
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)

    def post(self):
        data = request.get_json()
        try:
            new_user = User(**data)
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except Exception:
            return make_response({'errors': ['validation errors']}, 400)

api.add_resource(Users, '/users')

class UserById(Resource):
    
    def delete(self, id):
        if 'user_id' not in session:
            return make_response({'error': 'Unauthorized' }, 401)
        try:
            user = User.query.filter_by(id = session.get('user_id')).first()
            if not user:
                return make_response({'error': 'Cannot find that user in your database'}, 404)
            db.session.delete(user)
            db.session.commit()
            session.clear()
            return make_response('', 204)
        except Exception as e:
            return make_response({'error': str(e)}, 422)
    
    def patch(self, id):
        if 'user_id' not in session:
            return make_response({'error': 'Unauthorized'}, 401)
        try:
            user = User.query.filter_by(id=session.get('user_id')).first()
            if not user:
                return make_response({'error': 'Cannot find that user in your database'}, 404)
            data = request.get_json()
            user.username = data.get('username')
            user.password = data.get('password')
            db.session.commit()
            return make_response(user.to_dict(), 200)
        except Exception as e:
            return make_response({'error': str(e)}, 422)

api.add_resource(UserById, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
