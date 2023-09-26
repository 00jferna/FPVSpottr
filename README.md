# FPVSpottr
### Live Link: [FPVSpottr](https://fpv-spottr.onrender.com/)

FPVSpottr is a Fullstack App built for FPV pilots to share flying spots and flights at these spots, and organize groups in their areas.

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
Use the links on the righthand Navbar to navigate to the different pages in this App. If logged in, the current User's profile picture and callsign will be displayed at the top of the Navbar

![Screenshot from 2023-09-25 23-41-36](https://github.com/00jferna/FPVSpottr/assets/96546829/447dd5af-dc85-4ca8-a697-54757a5b68c0)

### Spots
A list of all the Spots can be reached by clicking on the 'Spots' link in the NavBar or by clicking on the 'FPVSpottr' logo at the top of every page.

![image](https://github.com/00jferna/FPVSpottr/assets/96546829/1936040b-d162-4819-9c1c-6f3374cb03ba)

#### View a Spot's Details
A Spot's details can be viewed by clicking on it's card.

![Screenshot from 2023-09-25 23-23-50](https://github.com/00jferna/FPVSpottr/assets/96546829/805bc12b-88e1-4954-8683-91e85dc3bb7f)


#### Creating a Spot
Clicking the 'Add a Spot' link in the NavBar will open the 'Create Spot' Modal.

![Screenshot from 2023-09-25 23-18-09](https://github.com/00jferna/FPVSpottr/assets/96546829/5c5d7e1a-9866-4b06-b612-16187cabe55f)

#### Updating a Spot
From the Spot's details page, a Spot Owner can click on the 'Update Spot,' opening the 'Update' Modal. The current Spot's details will be prepopulated for the owner to edit.

![Screenshot from 2023-09-25 23-54-47](https://github.com/00jferna/FPVSpottr/assets/96546829/1dce6886-b9d9-45ff-96b6-30782d08bb80)

#### Deleting a Spot
From the Spot's details page, a Spot Owner can click on the 'Delete Spot,' opening the 'Delete' Modal.

![Screenshot from 2023-09-25 23-56-08](https://github.com/00jferna/FPVSpottr/assets/96546829/55c8950b-9b6b-462c-809d-9439019c8751)

### Spot Reviews

#### Creating a Review
A logged-in User and click the 'Create Review' link to open the 'Create a Review' modal. The user can write a short review about the currently displayed Spot.

![Screenshot from 2023-09-25 23-57-00](https://github.com/00jferna/FPVSpottr/assets/96546829/ea5032f6-2a79-48c9-a103-8b17e263dba1)

#### View a Review
Any visitor can view a Spot Review by clicking on the Review Card.

![Screenshot from 2023-09-26 00-16-01](https://github.com/00jferna/FPVSpottr/assets/96546829/d3da650c-27d6-440f-a42b-72fa14a36b54)

#### Editing a Review
A logged-in User can edit a review that they wrote by clicking on the Review Card and clicking on the 'Update Review' link, opening the 'Update Review' Modal.

![Screenshot from 2023-09-26 00-16-11](https://github.com/00jferna/FPVSpottr/assets/96546829/9a6c22f2-3554-4f55-9aa1-e21ed436c323)

#### Deleting a Review
A logged-in User can delete a review that they wrote by clicking on the Review Card and clicking on the 'Delete Review' link, opening the 'Delete Review' Modal.

![Screenshot from 2023-09-26 00-16-20](https://github.com/00jferna/FPVSpottr/assets/96546829/bd00b442-f72a-4257-8c60-c9097b8bc582)

### Groups
A list of all the Groups can be reached by clicking on the 'Groups' link in the NavBar.

![Screenshot from 2023-09-25 23-24-57](https://github.com/00jferna/FPVSpottr/assets/96546829/203805be-2dee-402e-8266-49470ea2b457)

#### View a Group's Details
A Spot's details can be viewed by clicking on it's card.

![Screenshot from 2023-09-25 23-25-02](https://github.com/00jferna/FPVSpottr/assets/96546829/a4bd9945-e29a-42f0-91fe-81e20e6deebf)

#### Create a Group
Clicking the 'Add a Group' link in the NavBar will open the 'Create Group' Modal.

![Screenshot from 2023-09-26 01-07-53](https://github.com/00jferna/FPVSpottr/assets/96546829/c1ad85e7-333f-4b5f-abdb-38e6aca04c39)

#### Updating a Group
From the Group's details page, a Group Owner can click on the 'Update Group,' opening the 'Update' Modal. The current Group's details will be prepopulated for the owner to edit.

![Screenshot from 2023-09-26 01-13-29](https://github.com/00jferna/FPVSpottr/assets/96546829/3f3b8fc6-2786-44d5-a685-3c383594292c)

#### Deleting a Group
From the Group's details page, a Group Owner can click on the 'Delete Group,' opening the 'Delete' Modal.

![Screenshot from 2023-09-26 01-13-41](https://github.com/00jferna/FPVSpottr/assets/96546829/fde6223d-0631-4933-a133-ea0b2b4ee631)

### Group Members
When a Group's visibility is set to 'Public,' the details page for each Group lists the members of that Group. If set to 'Private,' the members will not be shown.

#### Joining a Group
A logged-in User can join a Public Group by clicking the 'Join Group' link on the Group Details page.

#### Edit Group Members
A Group Owner can edit the Members within the Group by clicking on the 'Edit Members' link in the Group Details page. This will open the 'Edit Members' modal. 

![Screenshot from 2023-09-26 01-31-48](https://github.com/00jferna/FPVSpottr/assets/96546829/405ac7db-4cd8-4ca4-a82e-c676ec3447c7)

Within this modal, a Group Owner can edit the Member's Privileges by clicking the 'Add/Remove Admin' button under the Member's Profile Image and Callsign. The Member can also be removed from the Group by clicking on the 'Remove Member' button.

### Pilot Profile
A Pilot's Profile can be viewed by clicking on the Pilot Card or the current User's profile picture and callsign, located in the NavBar. This page displays the Pilot's Callsign, Username, and Groups and Spots owned by the Pilot.

![Screenshot from 2023-09-26 01-48-12](https://github.com/00jferna/FPVSpottr/assets/96546829/0e4bcbc2-5ac1-4f3b-b76c-42f64e495ae3)

#### Updating a Profile
A logged-in User can edit their Pilot's Profile by clicking on the 'Update Profile' link on their Profile page.

![image](https://github.com/00jferna/FPVSpottr/assets/96546829/c4957bae-df30-4ec6-be3d-e209711a5a26)
