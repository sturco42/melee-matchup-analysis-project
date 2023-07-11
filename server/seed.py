#!/usr/bin/env python3

# Standard library imports
from random import choice as rc

# Remote library imports
from faker import Faker
from flask import Flask

# Local imports
from app import app
from models import db, UserCharacter, User, Character, Notebook, Interaction, Note, Clip

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

db.init_app(app)

with app.app_context():
    db.create_all()

fake = Faker()

print("Starting seed...")

def create_user_characters(users, characters):
    user_characters = []
    for _ in range(100):
        user_character = UserCharacter(
            user_id = [user.id for user in users],
            character_id = rc([character.id for character in characters])
        )
        user_characters.append(user_character)
    return user_characters

def create_users():
    users = []
    for _ in range(100):
        user = User(
            username = fake.user_name(),
            password = 'password',
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

def create_notebooks(users, characters):
    notebooks = []
    for _ in range(100):
        notebook = Notebook(
            user_id = rc([user.id for user in users]),
            character_id = rc([character.id for character in characters])
        )
        user_characters.append(notebook)
    return notebooks

#! unfinished
# def create_interactions(self):
#     types = ['neutral', 'punish', 'tech skill', 'defense']
#     interactions = []
#     for type in types:
#         Interaction(
#             character_id = 
#             notebook_id =
#             type = [type_of for type_of in types]
#         )
#         interactions.append(type)
#     return interactions

# def create_notes():
#     pass

# def create_clips():
#     pass

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print('Dumping Database...')
        UserCharacter.query.delete()
        User.query.delete()
        Character.query.delete()
        Notebook.query.delete()
        Interaction.query.delete()
        Note.query.delete()
        Clip.query.delete()
        
        print('Creating users...')
        user_characters = create_user_characters()
        db.session.add_all(user_characters)
        db.session.commit()
        
        print('Creating characters...')
        characters = create_characters()
        db.session.add_all(characters)
        db.session.commit()
        
        print('Adding mains...')
        user_characters = create_user_characters()
        db.session.add_all(user_characters)
        db.session.commit()
        
        print('Creating notebooks...')
        notebooks = create_notebooks()
        db.session.add_all(notebooks)
        db.session.commit()
        
        # print('Creating interactions...')
        # interactions = create_interactions()
        # db.session.add_all(interactions)
        # db.session.commit()
        
        # print('Creating notes...')
        # notes = create_notes()
        # db.session.add_all(notes)
        # db.session.commit()
        
        # print('Creating clips...')
        # clips = create_clips()
        # db.session.add_all(clips)
        # db.session.commit()