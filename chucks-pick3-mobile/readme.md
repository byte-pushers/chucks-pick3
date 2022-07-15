<h1><b>Chucks Pick 3 Documentation  &#10104</b></h1>
<hr>
<h2> 1. Linting & Commit</h2>
<p>When committing work to push up to github Husky will go through the process of testing all of the files which provide specs. If all files are above a certain percentage (80% currently) it will then proceed to use eslint to check for any errors within our code. If errors are found we must manually go through and correct them otherwise the commit will be complete and be ready to push up.  </p>
<ul>
<h4>About The Packages Being Utilized</h4>
<hr>
<li>Husky allows you to run commands prior to committing your work, thus making it extremely useful when needing to run checks or other commands such as testing before completing a commit.</li>
<li>eslint is used to help analyze your code in order to find any problems which might've been left in the current commit.</li>
</ul>
<h3>Links And References To Husky and eslint</h3>
<p>
<b>Implementing Husky and eslint:</b>
</p>
<ul>
<li><a>https://dev.to/ajmaurya/set-up-eslint-prettier-and-pre-commit-hooks-using-husky-for-wordpress-from-scratch-1djk</a></li>
<li><a>https://medium.com/angular-in-depth/husky-6-lint-prettier-eslint-and-commitlint-for-javascript-project-d7174d44735a</a></li>
<li><a>https://typicode.github.io/husky/#/</a></li>
<li><a>https://eslint.org/docs/user-guide/getting-started</a></li>
</ul>
<hr>
<h3>2. Commands</h3>
<p>Use these following commands to run or test the project:</p>
<ul>
<li>ionic serve: This will run the ionic project and display it on <a>http://localhost:8100/</a></li>
<li>ng test: Use this to test the project and continually test it.</li>
<li>ng serve: This will run the project just like ionic serve.</li>
<li>npm run use-mocks: Used to run mock data in project</li>

<p>**For use in mocks:</p>
<ul><li>When using mock data ensure you copy the most recent data into the current-winning-numbers.json file. Copy the whole <body> tag to implement.</body></li>
<li>Link for recent data:<br> <a>https://www.texaslottery.com/export/sites/lottery/Games/Pick_3/index.html#LastDraw</a></li>
<li>When using mock data ensure you copy the previous data into the past-winning-numbers.json file. Copy the whole <body> tag to implement.</body></li>
<li>Link for past data: <a>https://www.texaslottery.com/export/sites/lottery/Games/Pick_3/Winning_Numbers/index.html</a></li>
</ul>
</ul>
<hr>
<h2> 3. Pick3DrawTime & Pick3DrawDate</h2>
<h3>Pick3DrawTime</h3>
<p>This is the main component of the whole project, this is what sets up the values for the Pick3DrawDate component. Visually it will appear on the bottom half of the screen when we initialize the application. It is imperative to ensure this is working correctly as it will affect the other services and components.</p>
<h3>Pick3DrawDate</h3>
<p>This is the secondary component which recieves information off of the Pick3DrawTime component. This will be mostly front facing and be an interface level component. Each of the pages has their own variation of the Pick3DrawDate component but will for the most part be the same structure-wise. As for the Pick3DrawDate component on the home-page it is the most important version of the component. It is the one that pulls from the Pick3DrawTime component and helps establish the interface.</p>
<h3>Services</h3>
<p>The services for both the Pick3DrawTime & Pick3DrawDate components should only get and set data.</p>
<h3>Helpful Links</h3>
<ul>
<li><a>https://stackoverflow.com/questions/68128147/set-and-get-data-from-service-angular</a></li>
<li><a>https://angular.io/guide/component-interaction#parent-and-children-communicate-using-a-service</a></li></ul>
<hr>
<h2>4. Select-Picks & Generate Picks</h2>
<h3>Select-Picks</h3>
<p>Select-Picks is what will be selected when you wish to use a previous number in order to generate a new number. The top half of the screen requires nothing to be done to it as it is receiving from the Pick3DrawTime component. The bottom half is the most important part. It separates the options between today & yesterday which will let you select drawn numbers from the respective dates. Along with this you can select from the appropriate time of day.</p>
<h3>Generate-Picks</h3>
<p>Data received from select-picks will be processed in the Generate-Picks section. Here you will choose which time of day you wish to generate numbers for in order to see if your generated numbers will match up with the actual winning numbers. You can choose to generate for either today or tomorrow as well as specific times of day.</p>
<hr>
<h2>5. View Picks</h2>
<p>In this page you should be able to view your generated picks. These are taken from the Generate-Picks page. This page is vital to matching it's data with the lottery data to see if there are any matching numbers. Lastly it is used as a history of sorts to see which previous numbers have won and use those to let the user determine which numbers to select next.</p>
