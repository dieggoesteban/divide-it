This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#The idea

This application aims to solve a very common problem when we are making a group purchase (one or various items) and we need to divide the expenses in equal parts between the participants involved. 

### A practical example

A group of friends organize a dinner and each one of them it has the responsability to bring something, one could bring the drinks, another friend the meat, another the vegetables, and so on. Each participants spend an X amount of money in the part that was assigned to him. After the dinner, it's time to "equalize" the expenses into equal parts. Very easy, we sum all the expenses from each participants and divide by the participants quantity. Nothing too complicated, the participants that has debit balance (have to pay to achieve the individual calculated amount (ICA), in other words, who owes money) makes a transaction to the participant who exceeds the ICA. 
The thing gets tedious when there is more than one participant that has credit balance (the money he spent, exceeds the ICA). You have to split the debt of each participant to satisfy the participants credits. Nothing too complicated, but it's a calculation that no one wants to do.

### What this app offers

##### The app gives you the possibility of:

- Enter the data of total expenses of each participant
- Compute the total amount
- Compute the ICA (individual calculated amount)
- See the balance of each participant (it is a debtor or a creditor?)
- Suggests the shortest way to equate expenses between participants indicating who have to transfer to whom and the amount of said transaction


##Motivation and expectations

This app it is made by myself along my front-end development learning. Technologies involved:

- Javascript ES6
- React
- React Router
- Redux
- Material UI

In the future, in the short and medium term, I want to apply concepts of testing UI before adding new features and an API REST in the back-end.
