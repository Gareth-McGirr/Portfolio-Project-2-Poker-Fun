# Poker Fun

Poker Fun is a JavaScript game built to allow users to play a game of poker online for fun. It was built to work like the original poker arcade games and is single player.

// Mock Up

## Features

### Site wide
* Navigation Menu
    * Contains links to the Home and Game pages and will be responsive on all devices.
    * This will allow users to easily navigate between the pages within the site on any size device. 

![Nav Menu image](docs/readme_images/navigation.PNG)
* Footer
    * This will contain a link to my GitHub page and a font awesome icon to make it more visually appealling. Link will open in a new tab when clicked.
    * This will allow the user to follow me on my Github page

![Footer image](docs/readme_images/footer.PNG)
* Favicon
    * A site wide favicon will be implemented with the Hair O' The Dog clubs emblem.
    * This will provide an image in the the tabs header to allow the user to easily identify the website if they have multiple tabs open.

![Favicon](docs/readme_images/favicon.JPG)
* 404 Page
    * A 404 page will be implemented and will display if a user navigates to a broken link.
    * The 404 page will allow the user to easily navigate back to the main website if they direct to a broken link / missing page, without the need  of the browsers back button.

![404](docs/readme_images/404_page.JPG)

*Home Page*

- Game Instructions
  - The home page content contains full game instructions so that the user is able to understand how to play the game.

![Home Page Image](docs/readme_images/home_page.PNG)  
- Game Start Button
  - A button will be on the home page that when clicked will direct the user to the main poker game.
  - This will allow the user to start the game after they have read and understood how the game works.

![Play Game button image](docs/readme_images/play_game_button.PNG)  

*Game Page*

- Chip Balance

  - Below the main game area, the users current chips are displayed which is defaulted to 1000 starting chips when the user intiates game play. The users chip balance is displayed at all times. The chip balance is updated when the user bets or wins a hand.
  - This will allow the user to keep track of how many chips they have in order to decide how much they would like to bet.

![Chip balance image](docs/readme_images/current_chips.PNG)
- Betting Functionality

  - Before the user initiates the round with the deal button, there is an input box that will allow them to bet some of their chips on the hand. The input is type number and is set to default at 10 and increments / decrements in multiples of 10. A user cannot bet more chips than their current chip balance.
  - This will allow the user to gamble their chosen amount on each hand before the round is started.

![Chip bet image](docs/readme_images/bet_input.PNG)
- Deal

  - In order to start the poker hand, there will be a deal button just under the main table. When this button is clicked, it will draw the initial five cards for the poker hand.
  - This will allow the user to start the hand once they have added their bet amount and are ready to proceed.

![deal button image](docs/readme_images/deal_button.PNG)
- Cards

  - The game board contains the cards for the poker game. A Maximum of five cards will be on the board at any one time. Initially cards will be face down before deal and will be shown faceup when deal button is clicked.
  - This will allow the user to keep track of what cards are in their hand.

![Cards face down image](docs/readme_images/cards_face_down.PNG)
![Cards face up image](docs/readme_images/cards_face_up.PNG)
- Hold

  - After the hand has been dealt and five cards are displayed on the game board, you can hold cards before drawing new ones. You keep the cards you hold and the remaining cards will be replaced with new ones. In order to hold the card, you click it and the card will appear to raise and visible text will be displayed with 'Hold'.
  - This will allow users to keep the best cards from their hand.

![Cards hold image](docs/readme_images/cards_hold.PNG)
- Draw

  - Once the user has decided which cards they want to hold, if any, they can click the draw button to get new cards.
  - This will allow users to get new cards in an attempt to get a better hand than the original dealt cards.

![Cards face up image](docs/readme_images/draw_button.PNG)
- Gamble Winnings   

  - If the user has a winning hand after they have drawn the cards, they will be given the option to gamble those winnings or bank the chips. The user will be presented with a single card and they have to guess whether the next card drawn will be higher or lower than the current card. This will be done by using the respective 'High and 'Low' buttons.
  - If the user guesses wrong, they will lose the winnings.
  - If the user guesses right, the winnings will be doubled on each successful guess up to a maximum of 5 cards on the table and winning chips will be added to the current chip balance.
  - If the user decides to bank the winnings, the winning chips will be added to the current chip balance. The user will then be able to start the next hand.
  - This will allow the user gamble and potentially increase their winning chips or take the safe option and bank the winnings.

*Winning Hands*
- Royal Flush
  - Ace, King, Queen, Jack and 10 of same suit
    - Wins: Bet x 500
           
            
- Straight Flush
  - Any 5 cards of the same suit in order
    - Wins: Bet x 60
          
           
- 4 of a Kind
  - 4 cards of the same value and any other card
  - Wins: Bet x 25          
- Full House
  - 3 cards of same value and 2 cards of another value
    - Wins: Bet x 10
- Flush
  - 5 cards of the same suit
    - Wins: Bet x 5
            
- Straight
  - Any 5 cards in order
    - Wins: Bet x 4
          
- 3 of a Kind
  - 3 cards of the same value
    - Wins: Bet x 3
            
- 2 Pairs
  - 2 pairs of the same value
    - Wins: Bet x 2
            
- Pair - Jacks or Better
  - pair of J, Q, K or A
    - Wins: Bet x 1
          

## Technolgies

- HTML
  - The structure of the Website was developed using HTML as the main language.
- CSS
  - The Website was styled using custom CSS in an external file.
- JavaScript
  - The game play logic was created using JavaScript in an external file.
- Visual Studio Code
  - The website was developed using Visual Studio Code IDE
- GitHub
  - Source code is hosted on GitHub and delpoyed using Git Pages.
- Git
  - Used to commit and push code during the development of the Website
- Font Awesome
  - Icon obtained from https://fontawesome.com/ was used for GitHub Icon in the footer.
- Favicon.io
  - favicon files were created at https://favicon.io/favicon-converter/
- balsamiq
  - wireframes were created using balsamiq from https://balsamiq.com/wireframes/desktop/#
- Canva
  - This was used to create the logo in header and make the images for cards 
## Deployment

### Version Control

The site was created using the Visual Studio Code editor and pushed to github to the remote repository ‘Portfolio-Project-2-Poker-Fun’.

The following git commands were used throughout development to push code to the remote repo:

git add <file> - This command was used to add the file(s) to the staging area before they are committed.

git commit -m “commit message” - This command was used to commit changes to the local repository queue ready for the final step.

git push - This command was used to push all committed code to the remote repository on github.

### Deployment to Github Pages

- The site was deployed to GitHub pages. The steps to deploy are as follows:
  - In the GitHub repository, navigate to the Settings tab
  - From the menu on left select 'Pages'
  - From the source section drop-down menu, select the Branch: main
  - Click 'Save'
  - A live link will be displayed in a green banner when published successfully.

The live link can be found here - https://gareth-mcgirr.github.io/Portfolio-Project-2-Poker-Fun

### Clone the Repository Code Locally

Navigate to the GitHub Repository you want to clone to use locally:

- Click on the code drop down button
- Click on HTTPS
- Copy the repository link to the clipboard
- Open your IDE of choice (git must be installed for the next steps)
- Type git clone copied-git-url into the IDE terminal

The project will now have been cloned on your local machine for use.


