#  **Wheel of Reaction**

A React-themed spin on the classic Wheel of Fortune gameshow, built in React!

### &#x1F535; How to Play

- Players take turns spinning the wheel and then guessing a consonant in the current puzzle 
- Calling a correct letter earns the value of the landed spin multiplied by the number of times that the letter appears in the puzzle
- If player guesses correctly, they can take three possible actions:
   - Buy a vowel for a flat fee of $250. A contestant can continue to buy until out of money or no vowels remain
   - Attempt to solve the puzzle
   - Spin again and take another guess (unless their spin lands on a turn-losing space like bankrupt)

- Control passes to the next contestant clockwise if the contestant: 
   - Lands a spin on Lose a Turn or Memory Leak (Bankrupt)
   - Calls a letter that is not in the puzzle
   - Attempts unsuccessfully to solve the puzzle



### GitHub Project Repo
<a href="https://github.com/d-mayo/project4-frontend/" target="_blank">React Frontend</a><br>
<a href="https://github.com/ycjessie/project4-backend/" target="_blank">Express MongoDB Backend</a>

### &#x1F535; Project Duties


<ul>
<li>Lawrence DeMaio - Front End Design, Game Logic, UI Design, Graphic Design</li>
<li>Jessie Chen - Backend Design, Component Design, Testing, Documentation </li>
<li>Cory Trast - Backend Design, Component Design, UI, Testing</li>
</ul>

### &#x1F535; User Stories
* As a user, can take turns spinning the wheel and then guessing a consonant in the current puzzle within 5 seconds of that spin 
* As a user, can call a correct letter earns the value of the landed spin multiplied by the number of times that the letter appears in the puzzle
* As a user, when guessing correctly, they can either Buy a vowel for a flat fee of $250. 
* As a user, can continue to buy until out of money or no vowels remain OR Attempt to solve the puzzle OR Spin again and take another guess (unless their spin lands on a turn-losing space like bankrupt)




### &#x1F535; **Technologies Used**


Frontend
<ul>
<li>HTML - Hyper Text Mark Up Language </li>
<li>CSS, <a href="https://semantic-ui.com/i" target="_blank">Semantic UI</a></li>
<li><a href="https://reactjs.org/" target="_blank">React</a>  the JavaScript library for building user interfaces</li>
<li>JavaScript Animation <a href="https://bitworking.github.io/react-gsap/" target="_blank">GreenSock in React</a></li>


</ul>
Middleware
<ul>
<li>Axios </li>
<li>Environment file Credential(.env) </li>
<li>Express <a href="https://expressjs.com/en/resources/middleware/cors.html" target="_blank">CORS</a></li>

</ul>
Backend 

 - <a href="https://github.com/ycjessie/project4-backend/" target="_blank"> See Backend Repo</a>
   
DevOps
<ul>
<li>Heroku - Platform as a service (PaaS) used to build and deploy applications</li>
</ul>

### &#x1F535; **Components**
![Components](https://github.com/ycjessie/project4-backend/blob/master/public/image/Components.png)


### &#x1F535; Future Enhancement
- Local Data Persistence 
- Account creation
- High Score Leader Board
- Final and Bonus rounds

### &#x1F535; Credits
Wheel design and function modeled after elements of the following projects:
<ul>
   <li> <a href="https://codepen.io/twentysix/pen/abopqNp?editors=1111" target="_blank"> Wheel of fortune</a> by twentysix </li>
   <li> <a href="https://codepen.io/andere_s/pen/oqvroJ" target="_blank"> Wheel of fortune</a> by Andres </li>
</ul>

Images
<ul>
<li><a target="_blank" href="https://icons8.com/icons/set/speaker">Speaker icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></li>
<li>Money Bag Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></li>
<li>Background Image from <a href="https://wallpapercave.com/w/6AGfPRi" title="Wallpaperscave">www.wallpaperscave.com</a> </li>
</ul>

Sounds
<ul>
   <li>Wheel click sound provided by ZapSplat
   </li>
   <li>All other sounds provided courtesy of soundboard.com</li>

</ul>



