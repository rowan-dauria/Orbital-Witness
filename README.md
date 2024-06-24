# Orbital Witness Take Home Test

## Installation

Needs python 3.10 or later and Node.js 20.13 or later

1. In `Orbital-Witness-main`
```
# Create a virtual env
python -m venv env
# Activate the virtual env
source env/Scripts/activate # env\Scripts\activate on Windows

Install Django and aiohttp:
pip install -r reqs.txt

Install React:
npm i # run command in frontend folder

Start backend server
python manage.py runserver

Start Frontend dev server:
npm start # run command in frontend folder
go to localhost:3000 in browser to see UI
```

Instructions on how to install and set up the project.

## Usage

- run backend tests with `python manage.py test`
- You can change the sorting of the table by changing the URL query parameters, like `http://localhost:3000/?sortDatetime=desc&sortReport=desc`


