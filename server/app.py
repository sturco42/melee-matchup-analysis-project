from flask import request, make_response, session
from flask_restful import Resource
import bcrypt

from models import db, UserCharacter, User, Character, Notebook, Interaction, Note, Clip

from config import app, db, api

@app.route('/')
def home():
    return '<h1>Welcome to Melee Mentor</h1>'

@app.route('/authenticate', methods=['GET'])
def get():
    if session.get('user_id') and db.session.get(User, session['user_id']):
        return make_response(db.session.get(User, session['user_id']).to_dict(), 200)
    return make_response({'error': 'Unauthorized' }, 401)

@app.route('/signup', methods=['POST'])
def signup():
    try:
        username = request.get_json().get('username')
        password = request.get_json().get('password')
        salt = bcrypt.gensalt()
        print(type(password))
        # import ipdb; ipdb.set_trace()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        print(hashed_password)
        user = User(
            username=username,
            password_hash=hashed_password
        )
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response({'message': 'User signup successful'}, 201)
    except Exception as e:
        return make_response({'error': str(e)}, 500)

@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.get_json().get('username')
        password = request.get_json().get('password')
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
    except Exception as e:
        return make_response({'error': str(e)}, 401)

@app.route('/logout', methods=['DELETE'])
def logout():
    if session.get('user_id'):
        session['user_id'] = None
        return make_response({'message': 'Successfully Logged Out'}, 204)
    return make_response({'error'})

class UserCharacters(Resource):
    
    def get(self):
        print('test')
        user_characters = [user_character.to_dict() for user_character in UserCharacter.query.all()]
        return make_response(user_characters, 200)
    
    def post(self):
        print('test2')
        if 'user_id' in session:
            try:
                new_user_character = UserCharacter(
                    user_id = session['user_id'],
                    character_id = request.get_json()['id']
                )
                db.session.add(new_user_character)
                db.session.commit()
                return make_response('', 200)
            except Exception as e:
                return make_response({'error': str(e)}, 400)
        return make_response({'error': 'Unauthorized' }, 401)

api.add_resource(UserCharacters, '/user-characters')

class UserCharacterById(Resource):
    
    def get(self, id):
        user_character = db.session.get(UserCharacter, id)
        if user_character:
            return make_response(user_character.to_dict(), 200)
        return make_response({'error': 'user_character must have a valid user and valid character'}, 404)
    
    def delete(self, id):
        if 'user_id' not in session:
            return make_response({'error': 'Unauthorized' }, 401)
        try:
            user_character = UserCharacter.query.filter_by(user_id=session['user_id'], character_id=id).first()
            if not user_character:
                return make_response({'error': 'Cannot find that character in your library'}, 404)
            db.session.delete(user_character)
            db.session.commit()
            return make_response('', 204)
        except Exception as e:
            return make_response({'error': str(e)}, 422)
        
api.add_resource(UserCharacterById, '/user-characters/<int:id>')

class Characters(Resource):
    
    def get(self):
        print('test3')
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
            # import ipdb; ipdb.set_trace()
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            return make_response({'errors': [str(e)]}, 400)

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

class Notebooks(Resource):
    
    def get(self):
        notebooks = [notebook.to_dict() for notebook in Notebook.query.all()]
        return make_response(notebooks, 200)
    
    def post(self):
        if 'user_id' in session:
            try:
                character_id = request.get_json()['id']
                
                # Check if a notebook already exists for the given character_id
                existing_notebook = Notebook.query.filter_by(
                    user_id=session['user_id'], character_id=character_id
                ).first()
                
                if existing_notebook:
                    return make_response({'error': 'Notebook for this character already exists'}, 409)
                
                new_notebook = Notebook(
                    user_id=session['user_id'],
                    character_id=character_id
                )
                
                db.session.add(new_notebook)
                db.session.commit()
                
                return make_response('', 200)
            except Exception as e:
                return make_response({'error': str(e)}, 400)
        return make_response({'error': 'Unauthorized' }, 401)

api.add_resource(Notebooks, '/notebooks')

class NotebookById(Resource):
    
    def get(self, id):
        # notebook = db.session.get(Notebook, id)

        notebooks = [notebook.to_dict() for notebook in Notebook.query.filter_by(user_id = id).all()]
        
        if notebooks:
            return make_response(notebooks, 200)
        return make_response({'error': 'notebook must have a valid user and valid character'}, 404)
    
    def delete(self, id):
        if 'user_id' not in session:
            return make_response({'error': 'Unauthorized' }, 401)
        try:
            notebook = Notebook.query.filter_by(user_id = session.get('user_id'), character_id = id).first()
            if not notebook:
                return make_response({'error': 'Cannot find that notebook'}, 404)
            db.session.delete(notebook)
            db.session.commit()
            return make_response('', 204)
        except Exception as e:
            return make_response({'error': str(e)}, 422)
        
api.add_resource(NotebookById, '/notebooks/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)