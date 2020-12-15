const VOWELS = ["A", "E", "I", "O", "U"];

const WHEEL_WEDGES = [5000, 'BANKRUPT', 300, 500, 450, 500, 800, 'LOSE', 700, 'FREE', 
    650, 'BANKRUPT', 900, 500, 350, 600, 500, 400, 550, 800, 300, 700, 900, 500]
    
const WHEEL_VALS = new Map();
let degree = 7.5;

WHEEL_WEDGES.forEach(wedge => {
    WHEEL_VALS.set(degree, wedge);
    degree+=15;
})

export { VOWELS, WHEEL_WEDGES, WHEEL_VALS};