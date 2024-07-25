# Orbital Witness Take Home Test

Full stack application with Python/Django backend and React frontend. The app retrieves data from Orbital Witness endpoints and displays it in tabular format. Part of take-home test for SWE role at Orbital Witness.

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

## Notes

- The frontend is served by it's own server because it is the quickest way to get it up and running. Also I am not able to build the frontend code on my PC due to a Windows specific bug in React. 

### Backend
- The main places to look for my code are `take_home_test/views.py`, `take_home_test/utils.py` and `take_home_test/tests.py`.

### Frontend
- If I had more time I would write tests for my sorting algorithm.
- I didn't attempt the bar chart because I didn't have time. I think the hardest parts of that would be bucketing the histogram data and generating appropriate axis labels for the y axis. Because if the highest number is 176 in a day, the axis scale should be appropriately rounded, and a suitable number of intermediate axis labels should be added (for example 0, 30, 60, 90 etc.). An algorithm would need to be made to ensure that all the axis labels are nicely rounded too, you don't want an axis label of 33 or something.
- I didn't make the table sortable with buttons, but I don't think that would be hard. My approach would be to make buttons that change the sortingCriteria state in App to refresh the view, and make a function to set the new sorting criteria in the URL query params. `sortDateTime = asc/desc`, `sortReport = asc/desc/null`


