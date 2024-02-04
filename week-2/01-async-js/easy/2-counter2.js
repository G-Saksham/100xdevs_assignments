// ## Counter without setInterval

const { set } = require("zod");

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

class Counter {
    constructor() {
        this.count = 0;

        this.start = function () {
            const self = this;

            function incrementAndDisplay() {
                console.log(self.count++);
                setTimeout(incrementAndDisplay, 1000);
            }

            setTimeout(incrementAndDisplay, 1000);
        };
    }
}
const counter = new Counter();

counter.start();

// (Hint: setTimeout)
