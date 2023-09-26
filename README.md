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
