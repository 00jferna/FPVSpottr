# FPVSpottr
### Live Link: [FPVSpottr](https://fpv-spottr.onrender.com/)

FPVSpottr is a Fullstack App built for FPV pilots to share flying spots and flights at these spots, and organize groups in their areas.

![image](https://github.com/00jferna/FPVSpottr/assets/96546829/1936040b-d162-4819-9c1c-6f3374cb03ba)

### [Wiki](../../wiki/)


## Technologies Utilized:
### Backend
- Python
- Flask
- PostgreSQL
- SQLAlchmey
- AWS

### Frontend
- React.js
- Redux
- HTML
- CSS
  

## Deploy This App:
   In order to run this app locally, there are a couple of steps to take:
   
   1. Clone the app repository on your local machine:
   ```bash
   git clone git@github.com:00jferna/FPVSpottr.git
   ```
   2. Navigate to the root directory of the app and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   3. Upgrade, seed, and start the backend server
   ```bash
   pipenv run flask db upgrade && pipenv run flask seed all && pipenv run flask run
   ```
   5. Open another terminal and navigate to the react app to start the frontend app
   ```bash
   cd react-app
   npm start
   ```

## Using This App

### NavBar
Use the links on the righthand Navbar to navigate to the different pages in this App.

#### User Profile
If logged in, the current User profile picture and callsign will be displayed at the top of the Navbar

### Spots
#### Views Spots
A list of all the Spots can be reached by clicking on the 'Spots' link in the NavBar or by clicking on the 'FPVSpottr' logo at the top of every page.

#### Views Spot Details
A Spot's details can be viewed by clicking on it's card.

#### Creating a Spot
Clicking the 'Add a Spot' link in the NavBar will open the 'Create Spot' Modal.

#### Updating a Spot
From the Spot's details page, a Spot Owner can click on the 'Update Spot,' opening the 'Update' Modal.

#### Deleting a Spot
From the Spot's details page, a Spot Owner can click on the 'Delete Spot,' opening the 'Delete' Modal.

### Spot Reviews
A logged in User and click 'Create Review' link to open the 'Create a Review' modal. The user can write a short review about the currently displayed Spot.

### Groups

### Joining a Group
