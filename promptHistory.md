```
The work directory is ~/Work/Sandbox/infos/. Only change files within this directory, double check paths before taking action.
Check top level folder structure first, then each folder but ignore folders called node_modules.
```
```
In the infos-delivery folder, create an index.js file as the main file of a Node.js app.
Add handling of OS signals for graceful shutdown.
Add a main function that executes an async function and returns when the async function returns or the app is asked to shut down (signal received).
Add the async function called "processingStart" that for now does nothing.
```
```
Look at my changes and edit the processingStart function to exit when shutdown is in progress
```
```
Now we are going to work in the infos-frontend directory.
Change the landing page to include:
a header saying "Pick the infos you'd like to receive";
below the header create 5 boxes, with rounded corners, aligned horizontally allowing going to the second row if there are too many, each containing two random words;
below the boxes create a button with text "Next", position it to the right with some margin from the edge of the page;
use pleasant light colors
```
```
Make the default state of the boxes be black/white colors;
when any is clicked, highlight them using a light green color palette (text and background);
move the Next button slightly closer to the center
```
```
Now we will work in the infos-backend directory but also make changes to the frontend app.
Create a backend GET endpoint that return a JSON response based on this example:
{infoProviders: [{ displayName: "financial market", internalName: "financialmarket", inUse: false }, { displayName: "sale discounts", internalName: "salediscounts", inUse: false }], deliveryMethods: [{ displayName: "email", internalName: "email", inUse: false },{ displayName: "Slack Chat", internalName: "slack", inUse: false }]};
Add some more infoProviders (to have 5 total) and delivery methods (to have 3 total);
Edit the frontend app landing page to make a request to this backend endpoint and replace the text in boxes with infoProviders -> displayName;
Also store infoProviders -> internalName for each box for later usage 
```
```
Change the backend and frontend so that the newly added backend endpoint is at /infos and is called Infos; no need to have a fallback in the frontend to display hardcoded data - if backend is not responding show an error loading data.
```
```
See my changes in the backend app then run it with "npx nest start" and debug
```
```
Add a CORS policy to the backend app (running on port 3001) to allow connections from frontend (served from port 3000)
```
```
In the frontend app: move all content slightly higher; when Next is clicked, hide the header starting with "Pick" and all not selected boxes (show only selected); Add a new header below the boxes saying "How do you want to get them?"; display a new set of boxes using data from deliveryMethods similarly to infoProviders; use a light blue color palette for the new boxes; keep the Next button.
```
```
Add a "Back" button to the left of the "Next" button; when clicked it will bring the user one step back (for example: show all infoProvider boxes again and allow to change selection); The "Back" button only shows if user clicked "Next" at least once (i.e. he's not on the first step).
```