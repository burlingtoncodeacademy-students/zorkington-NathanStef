const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log(`
========================================
          Welcome to Zork!
========================================
`);

  await ask('Press Enter to start your journey...');

  let currentLocation = 'mainStreet';
  let isDescriptionShown = false;
  let isDoorUnlocked = false;
  let keys = {
    hearts: false,
    clubs: false,
    diamonds: false,
    spades: false,
  };

  while (true) {
    if (currentLocation === 'mainStreet') {
      if (!isDescriptionShown) {
        console.log(`
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`);
        isDescriptionShown = true;
      }

      console.log(`
What would you like to do? (e.g., "look around", "read sign", "use keypad", "open door")`);

      let command = await ask('> ');

      if (command === 'look around') {
        console.log(`
You see a bustling street with shops and people passing by.`);
      } else if (command === 'read sign') {
        console.log(`
========================================
          Handwritten Sign
========================================

Welcome to Zork!

To enter the building, please enter the code: 12345

Good luck!

========================================`);
      } else if (command === 'use keypad') {
        if (isDoorUnlocked) {
          console.log(`The door is already unlocked.`);
        } else {
          let code = await ask('Enter the code: ');
          if (code === '12345') {
            console.log(`The keypad beeps, and the door unlocks.`);
            isDoorUnlocked = true;
          } else {
            console.log(`The keypad emits a buzzing sound.`);
          }
        }
      } else if (command === 'open door') {
        if (isDoorUnlocked) {
          console.log(`You open the door and step inside.`);
          currentLocation = 'cardRoom';
          isDescriptionShown = false;
        } else {
          console.log(`The door is locked.`);
        }
      } else {
        console.log(`I'm sorry, I don't understand that command.`);
      }
    } else if (currentLocation === 'cardRoom') {
      if (!isDescriptionShown) {
        console.log(`
========================================
          ♣♠♦♥ Card Room ♥♦♠♣
========================================

You enter a room with five doors, each labeled with a suit from a deck of cards: Hearts, Clubs, Diamonds, Spades, and the fifth door is a golden door.`);
        isDescriptionShown = true;
      }

      if ((!keys.hearts || !keys.clubs || !keys.diamonds || !keys.spades) && !isDoorUnlocked) {
        console.log(`There are four keyholes on the golden door.`);
      }

      console.log(`Which door do you choose? (e.g., "hearts", "clubs", "diamonds", "spades", "golden")`);

      let command = await ask('> ');

      if (command === 'hearts') {
        if (keys.hearts) {
          console.log(`You have already obtained the key from the Hearts room.`);
        } else {
          console.log(`You open the door labeled Hearts and find yourself in a room filled with beautiful artwork.`);

          while (true) {
            let innerCommand = await ask(`What would you like to do? (e.g., "examine painting", "solve puzzle", "exit room")`);

            if (innerCommand === 'examine painting') {
              console.log(`You closely examine the painting. It appears to be a heart-shaped object with a missing piece.`);
            } else if (innerCommand === 'solve puzzle') {
              console.log(`You carefully examine the painting and notice various shapes scattered around the room: a circle, a triangle, a square, and a heart.
It seems that only the heart-shaped piece will fit into the missing part of the painting.`);

              let shapeChoice = await ask('Which shape would you like to try fitting into the painting? (circle/triangle/square/heart)');

              if (shapeChoice === 'heart') {
                console.log(`Congratulations! You place the heart-shaped piece into the painting, and a hidden compartment opens, revealing a key.`);
                keys.hearts = true;
              } else {
                console.log(`The ${shapeChoice} does not fit into the painting. You continue searching for the right shape.`);
              }
            } else if (innerCommand === 'exit room') {
              console.log(`You decide to exit the room.`);
              break;
            } else {
              console.log(`I'm sorry, I don't understand that command.`);
            }
          }
        }
      } else if (command === 'clubs') {
        if (keys.clubs) {
          console.log(`You have already obtained the key from the Clubs room.`);
        } else {
          console.log(`You open the door labeled Clubs and step into a grand ballroom. There's a button in the center of the room.`);

          while (true) {
            let innerCommand = await ask(`What would you like to do? (e.g., "press button", "exit room")`);

            if (innerCommand === 'press button') {
              console.log(`You press the button, and music starts playing in the ballroom.`);
              let danceChoice = await ask('Would you like to dance? (yes/no)');

              if (danceChoice === 'yes') {
                console.log(`You start dancing gracefully.`);
                console.log(`Congratulations! Your dance impresses the hidden observers, and a secret compartment opens, revealing a key.`);
                keys.clubs = true;
              } else {
                console.log(`You choose not to dance.`);
              }
            } else if (innerCommand === 'exit room') {
              console.log(`You decide to exit the room.`);
              break;
            } else {
              console.log(`I'm sorry, I don't understand that command.`);
            }
          }
        }
      } else if (command === 'diamonds') {
        if (keys.diamonds) {
          console.log(`You have already obtained the key from the Diamonds room.`);
        } else {
          console.log(`You open the door labeled Diamonds and discover a dimly lit cave with a large stone with a pickaxe lodged into it's top.`);

          while (true) {
            let innerCommand = await ask(`What would you like to do? (e.g., "look around", "remove pickaxe", "exit room")`);

            if (innerCommand === 'look around') {
              console.log(`You carefully look around the dimly lit cave, but you don't find anything of interest besides the large stone with the pickaxe lodged into it's top.`);
            } else if (innerCommand === 'remove pickaxe') {
              console.log(`You approach the large stone and remove the pickaxe lodged into it.`);
              console.log(`With the pickaxe in your possession, you feel prepared to mine the stone.`);

              let mineCommand = await ask('Would you like to mine the stone? (yes/no)');

              if (mineCommand === 'yes') {
                console.log(`You swing the pickaxe with all your might, breaking apart the stone.`);
                console.log(`Congratulations! Within the broken stone, you find the diamond key.`);
                keys.diamonds = true;
              } else {
                console.log(`You decide not to mine the stone.`);
              }
            } else if (innerCommand === 'exit room') {
              console.log(`You decide to exit the room.`);
              break;
            } else {
              console.log(`I'm sorry, I don't understand that command.`);
            }
          }
        }
      } else if (command === 'spades') {
        if (keys.spades) {
          console.log(`You have already obtained the key from the Spades room.`);
        } else {
          console.log(`You open the door labeled Spades and find yourself in a mysterious library. The room is filled with a ton of books and a desk with a powered on computer.`);

          while (true) {
            let innerCommand = await ask(`What would you like to do? (e.g., "examine books", "use computer", "exit room")`);

            if (innerCommand === 'examine books') {
              console.log(`You browse through the rows of books, but nothing catches your attention.`);
            } else if (innerCommand === 'use computer') {
              console.log(`You approach the computer and turn it on.`);
              console.log(`The screen displays a puzzle that needs to be solved to unlock the key.`);

              let puzzleAnswer = await ask('What is the best suit of all?: ');

              if (puzzleAnswer.toLowerCase() === 'spades') {
                console.log(`Congratulations! You solved the puzzle.`);
                console.log(`The screen on the computer opens up, revealing the key of Spades.`);
                keys.spades = true;
              } else {
                console.log(`Incorrect answer. The screen remains locked.`);
              }
            } else if (innerCommand === 'exit room') {
              console.log(`You decide to exit the room.`);
              break;
            } else {
              console.log(`I'm sorry, I don't understand that command.`);
            }
          }
        }
      } else if (command === 'golden') {
        if (keys.hearts && keys.clubs && keys.diamonds && keys.spades) {
          console.log(`You open the golden door and discover a chest full of gold. Congratulations!!!`);
          break;
        } else {
          console.log(`The golden door is locked. It requires four keys.`);
        }
      } else {
        console.log(`I'm sorry, I don't understand that command.`);
      }
    } else {
      break;
    }
  }
  process.exit();
}
