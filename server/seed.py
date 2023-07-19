from random import choice as rc
import random

from faker import Faker
from flask import Flask

from app import app
from models import db, UserCharacter, User, Character, Notebook, Clip

import bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

db.init_app(app)

with app.app_context():
    db.create_all()

fake = Faker()

print("Starting seed...")

def create_users():
    users = []
    for _ in range(10):
        salt = bcrypt.gensalt()
        password = 'password'
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        user = User(
            username = fake.user_name(),
            password_hash = hashed_password,
            created_at = fake.date_time(),
            updated_at = fake.date_time()
        )
        users.append(user)
    return users

def create_characters():
    datas = [
        {
            'id': 1,
            'name': 'Dr. Mario',
            'icon': ''
        },
        {
            'id': 2,
            'name': 'Mario',
            'icon': ''
        },
        {
            'id': 3,
            'name': 'Luigi',
            'icon': ''
        },
        {
            'id': 4,
            'name': 'Bowser',
            'icon': ''
        },
        {
            'id': 5,
            'name': 'Peach',
            'icon': ''
        },
        {
            'id': 6,
            'name': 'Yoshi',
            'icon': ''
        },
        {
            'id': 7,
            'name': 'Donkey Kong',
            'icon': ''
        },
        {
            'id': 8,
            'name': 'Captain Falcon',
            'icon': ''
        },
        {
            'id': 9,
            'name': 'Ganondorf',
            'icon': ''
        },
        {
            'id': 10,
            'name': 'Falco',
            'icon': ''
        },
        {
            'id': 11,
            'name': 'Fox',
            'icon': ''
        },
        {
            'id': 12,
            'name': 'Ness',
            'icon': ''
        },
        {
            'id': 13,
            'name': 'Ice Climbers',
            'icon': ''
        },
        {
            'id': 14,
            'name': 'Kirby',
            'icon': ''
        },
        {
            'id': 15,
            'name': 'Samus',
            'icon': ''
        },
        {
            'id': 16,
            'name': 'Zelda',
            'icon': ''
        },
        {
            'id': 17,
            'name': 'Sheik',
            'icon': ''
        },
        {
            'id': 18,
            'name': 'Link',
            'icon': ''
        },
        {
            'id': 19,
            'name': 'Young Link',
            'icon': ''
        },
        {
            'id': 20,
            'name': 'Pichu',
            'icon': ''
        },
        {
            'id': 21,
            'name': 'Pikachu',
            'icon': ''
        },
        {
            'id': 22,
            'name': 'Jigglypuff',
            'icon': ''
        },
        {
            'id': 23,
            'name': 'Mewtwo',
            'icon': ''
        },
        {
            'id': 24,
            'name': 'Mr. Game & Watch',
            'icon': ''
        },
        {
            'id': 25,
            'name': 'Marth',
            'icon': ''
        },
        {
            'id': 26,
            'name': 'Roy',
            'icon': ''
        }
    ]
    characters = []
    for data in datas:
        character = Character(
            id = data['id'],
            name = data['name'],
            icon = data['icon']
        )
        characters.append(character)
    return characters

def create_user_characters(users, characters):
    user_characters = []
    for _ in range(10):
        user_character = UserCharacter(
            user_id = rc([user.id for user in users]),
            character_id = rc([character.id for character in characters])
        )
        user_characters.append(user_character)
    return user_characters

def create_notebooks(users, characters):
    notebooks = []
    for _ in range(10):
        notebook = Notebook(
            user_id = rc([user.id for user in users]),
            character_id = rc([character.id for character in characters]),
        )
        notebooks.append(notebook)
    return notebooks

#! unfinished
# def create_notes():
#     pass

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print('Dumping Database...')
        UserCharacter.query.delete()
        User.query.delete()
        Character.query.delete()
        Notebook.query.delete()
        Clip.query.delete()
        
        print('Creating users...')
        users = create_users()
        db.session.add_all(users)
        db.session.commit()
        
        print('Creating characters...')
        characters = create_characters()
        db.session.add_all(characters)
        db.session.commit()
        
        print('Adding mains...')
        user_characters = create_user_characters(users, characters)
        db.session.add_all(user_characters)
        db.session.commit()
        
        print('Creating notebooks...')
        notebooks = create_notebooks(users, characters)
        db.session.add_all(notebooks)
        db.session.commit()
        
        # print('Creating notes...')
        # notes = create_notes()
        # db.session.add_all(notes)
        # db.session.commit()