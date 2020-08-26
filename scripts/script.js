// if you roll 7 or 11 on the first throw, you win
// if you roll a 2, 3, or 12, you lose
// if you roll a 4, 5, 6, 8, 9, 10, it's your point and follow-up throw is required
// on follow-up throws, a throw of 7 loses and a throw of your previous points wins
// for any other number thrown at the first follow-up, the game continues until you win or lose

let diceX = 230;
let diceY = 150;
let diceWidth = 135;
let diceHeight = 135;
let dotRadius = 6;
let ctx = document.getElementById('canvas').getContext('2d');
let dX;
let dY;
let firstTurn = true;
let point;

throwDice = () => {
    let sum; // sum of values for both dice
    let ch = 1+Math.floor(Math.random()*6); // random value for first die
    sum = ch;
    dX = diceX;
    dY = diceY;
    drawface(ch); // draw first die face
    dX = diceX + 150; // horizontal position adjusted
    ch = 1+Math.floor(Math.random()*6); // random value for second die
    sum += ch; // add ch to what is already in sum
    drawface(ch); // draw the second die face

    let money = Number(document.form.money.value);
    let nofunds = document.getElementById('nofunds');
    let text = '';

    if(money < 25) {
        // alert("Insufficient funds. Add more by refreshing the page.")
        text = 'Insufficient funds. Please add more by refreshing the page.'
        nofunds.innerHTML = text;
        return;
    }
    money = money - 15; // decrease money by 25 per turn
    document.form.money.value = String(money);


    if(firstTurn) {
        switch(sum) {
            case 7:
            case 11:
                document.form.result.value='Congrats! You win!';
                break;
            case 2:
            case 3:
            case 12:
                document.form.result.value='Game over. You lose.';
                break;
            default:
                point = sum;
                document.form.point.value = point; // display point value
                firstTurn = false;
                document.form.stage.value='Throw again'; // follow-up throw
                document.form.result.value=' '; // clear result field
        }
    } else {
        switch(sum) {
            case point: // sum = point
                document.form.result.value = 'Congrats! You win!';
                document.form.stage.value = 'Back to the first throw.';
                document.form.point.value = ' '; // clear point field
                firstTurn = true; // reset firstTurn to true
                break;
            case 7:
                document.form.result.value = 'Game over. You lose.';
                document.form.stage.value = 'Back to the first throw.';
                document.form.point.value = ' '; // clear point field
                firstTurn = true; // reset firstTurn to true
        }
    }
}

function drawface(n) {
    ctx.lineWidth = 5;
    ctx.clearRect(dX,dY,diceWidth,diceHeight);
    ctx.strokeRect(dX,dY,diceWidth,diceHeight);
    ctx.fillStyle = '#00644D'; // color of dots
    
    switch(n) {
        case 1:
            draw1();
            break;
        case 2: 
            draw2();
            break;
        case 3:
            draw2();
            draw1();
            break;
        case 4:
            draw4();
            break;
        case 5:
            draw4();
            draw1();
            break;
        case 6:
            draw4();
            draw2mid();
            break;
    }
}

draw1 = () => {
    let dotX;
    let dotY;
    
    ctx.beginPath();
    dotX = dX + .5 * diceWidth;
    dotY = dY + .5 * diceHeight;
    ctx.arc(dotX,dotY,dotRadius,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

draw2 = () => {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dX + 3 * dotRadius;
    dotY = dY + 3 * dotRadius;
    ctx.arc(dotX,dotY,dotRadius,0,Math.PI*2,true);
    dotX = dX + diceWidth - 3 * dotRadius;
    dotY = dY + diceHeight - 3 * dotRadius;
    ctx.arc(dotX,dotY,dotRadius,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

draw4 = () => {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dX + 3 * dotRadius;
    dotY = dY + 3 * dotRadius;
    ctx.arc(dotX,dotY,dotRadius,0,Math.PI*2,true);
    dotX = dX + diceWidth - 3 * dotRadius;
    dotY = dY + diceHeight - 3 * dotRadius;
    ctx.arc(dotX,dotY,dotRadius,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    dotX = dX + 3 * dotRadius;
    dotY = dY + diceHeight - 3 * dotRadius;
    // no change
    ctx.arc(dotX,dotY,dotRadius,0,Math.PI*2,true);
    dotX = dX + diceWidth - 3 * dotRadius;
    dotY = dY + 3 * dotRadius;
    ctx.arc(dotX,dotY,dotRadius,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

draw2mid = () => {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dX + 3 * dotRadius;
    dotY = dY + 0.5 * diceHeight;
    ctx.arc(dotX,dotY,dotRadius,0,Math.PI*2,true);
    dotX = dX + diceWidth - 3 * dotRadius;
    dotY = dY + 0.5 * diceHeight;
    // change
    ctx.arc(dotX,dotY,dotRadius,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}