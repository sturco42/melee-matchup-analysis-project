# Melee Mentor
This app lets you create notebooks and add clips of melee interactions for future reference.

# installation

- Fork and clone this repo from Github into your local environment
- Navigate to your local directory and open the clone repo in your code editor
- Run `pipenv install` to install dependencies
- Run `pipenv shell` to create a virtual environment to work in
- Create a `.env` file in your main director which will hold a `const CLIENT_ID =` and `const APP_SECRET =` to setup paypal integration later
- Create a paypal buisines account at https://www.paypal.com/bizsignup/#/singlePageSignup
- Navigate to Apps and Credentials
- Copy paste Client ID and Secret after their respective lines in your main directories `.env` file
- Run `npm install dotenv` here in your main directory as well. Normally you wouldn't but you need it for paypal functionality due to paypal.js being in your backend
- From the main project directory, run `cd server` to enter the server directory to set up your backend
- Create a `.env` file in the server (different from the .env set up for paypal)
- Add a line for `SECRET_KEY=`
- In your terminal, run python -c import secrets; print(secrets.token_hex()) to generate your own key
- Copy this key and paste it in your `.env` file for the secret key
- Double check that you have `.env` added to your `.gitignore`
- Make sure you are still in your server directory and run the following to get your database configured: `export FLASK_APP=app.py`, `flask db init`, `flask db upgrade head`, `python seed.py`
- Make sure you run the rest of the server required installs listed below
- Run `python3 app.py` in the server directory to start your backend
- Make sure you read the README in the client directory and install what is needed there.
- Navigate into the client directory then run `npm start`

# server installs
# Run these installs while in your server directory
`pipenv install faker`
`pip install faker`
`pip install flask`
`pip install flask-bcrypt`
`pip install validators`
`npm install express node-fetch`
`pipenv install python-dotenv`
`npm install dotenv`

# client installs
# Run these installs while in your client directory
`npm install`
`npm install react-scripts`
`npm install semantic-ui-css`
`npm install semantic-ui-react`
`npm install react-router-dom`
`npm install formik yup`