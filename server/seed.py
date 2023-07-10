#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

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
    characters = [
        {
            'name': 'Dr. Mario',
            'icon': ''
        },
        {
            'name': 'Mario',
            'icon': ''
        },
        {
            'name': 'Luigi',
            'icon': ''
        },
        {
            'name': 'Bowser',
            'icon': ''
        },
        {
            'name': 'Peach',
            'icon': ''
        },
        {
            'name': 'Yoshi',
            'icon': ''
        },
        {
            'name': 'Donkey Kong',
            'icon': ''
        },
        {
            'name': 'Captain Falcon',
            'icon': ''
        },
        {
            'name': 'Ganondorf',
            'icon': ''
        },
        {
            'name': 'Falco',
            'icon': ''
        },
        {
            'name': 'Fox',
            'icon': ''
        },
        {
            'name': 'Ness',
            'icon': ''
        },
        {
            'name': 'Ice Climbers',
            'icon': ''
        },
        {
            'name': 'Kirby',
            'icon': ''
        },
        {
            'name': 'Samus',
            'icon': ''
        },
        {
            'name': 'Zelda',
            'icon': ''
        },
        {
            'name': 'Sheik',
            'icon': ''
        },
        {
            'name': 'Link',
            'icon': ''
        },
        {
            'name': 'Young Link',
            'icon': ''
        },
        {
            'name': 'Pichu',
            'icon': ''
        },
        {
            'name': 'Pikachu',
            'icon': ''
        },
        {
            'name': 'Jigglypuff',
            'icon': ''
        },
        {
            'name': 'Mewtwo',
            'icon': ''
        },
        {
            'name': 'Mr. Game & Watch',
            'icon': ''
        },
        {
            'name': 'Marth',
            'icon': ''
        },
        {
            'name': 'Roy',
            'icon': ''
        }
    ]
    return characters


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
