import { colors } from "./colors.js"
let c = new colors();


export default class Input {

    constructor() {
        this.input = "";
        this.freezeChar = [];
        this.altFreezeChar = [];
    
    }
    /**
     * Returns the value of the object. 
     */
    get value() {
        return this.input;
    }

    /**
     * 
     * @param {string} arg 
     * Prevent character from displaying.
     */
    alt(arg) {
        this.freezeChar.push(arg);
    }
    /**
     * 
     * @param {string} arg 
     * realse alt character enabling it to diplay.
     */
    release(arg) {
        this.freezeChar.filter(v => v != arg);
    }
    /**
     * 
     * @param {string} arg 
     * An inverse display. Only the given charactes will be display.
     */
    write (arg) {
        this.altFreezeChar.push(arg);
    }
    /**
     * reset the objects properties to it's default
     */
    reset() {
        this.input = "";
        this.altFreezeChar = [];
        this.freezeChar = [];  
    }
    /**
     * 
     * @param {string} prompt -- What need to display as prompt to the user.
     * @param {list} ch_res -- A list argument that is used to restrict character.
     *
     * The readl can accept the keyPress function to define a certain behavour when a key is pressed.
     *@example
     * await readl('Enter name' [], keypress(() => {
     *     if (key === "@"){
     *          process.exit();
     *      } 
     * }));
     * 
     *Note: The readl must be used in the main function for proper behavour.
     * @example
     * main(async () => {
     *      let name = await readl('Enter name: ');
     * });
     * @returns
     * 
     */
    readl(prompt) {

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        return new Promise((res) => {

            process.stdout.write(prompt);

            const onData = (key) => {

        
                if (key === '\u0003') {
                    process.stdin.removeListener('data', onData)
                    process.exit();
                }
                else if (key === "\r" || key == "\n") {
                    process.stdout.write('\n');
                    process.stdin.removeListener('data', onData)
                    res(this.input);

                }
                else if (key === '\u007f') {
                    if (this.input.length > 0) {
                        this.input = this.input.slice(0, -1);
                        process.stdout.clearLine();
                        process.stdout.cursorTo(0);
                        process.stdout.write(prompt + this.input);
                        return;
                    }
                }
                else {
                    if (this.altFreezeChar.length !== 0){
                        this.input += this.altFreezeChar.includes(key) ? key : "";
                        process.stdout.write(this.altFreezeChar.includes(key) ? key : "")
                    }
                    else {
                        this.input += this.freezeChar.length !== 0 & this.freezeChar.includes(key) ? "" : key;
                        process.stdout.write(this.freezeChar.length !== 0 & this.freezeChar.includes(key) ? "" : key);
                    }
                }
            }
            process.stdin.on('data', onData);
        });
    }

}

/**
 * 
 * @param {event} callback -- A keyboard function
 */
export async function keyPress(callback) {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (key) => {
        if (key === "\r" || key === "\n") {
            return callback("ENTER");
        }
        if (key === "\u0003") {
            writeLine("\noperation cancel by user.");
            process.exit();
        }
        return callback(key);
    });
}

/**
 * 
 * @param {string} value - expected a string
 * A function to display output on the screen.
 */
export async function writeLine(...arg) {
    let val = [];
    let final = "";
    for (let n of arg) {
        val.push(n);
    }
    for (let i = 0; i < val.length; i++) {
        final += val[i];
    }
    console.log(final);
}


export const highlight = (arg, prmpt) => {

    process.stdout.write('\r\x1b[2K');

    if (
        arg.includes(this.input.split(" ")[this.input.split(" ").length - 1]) &
        this.input.split(" ")[this.input.split(" ").length - 1] != ""
    ) {
        const word = this.input.split(" ")[this.input.split(" ").length - 1];
        const wd = new RegExp(word, "g");
        this.input = this.input.replaceAll(wd, c.yellow + word + c.RESET)
    }
    else { this.input = this.input }
    process.stdout.write(this.input)
}

/**
 * 
 * @param {any} callable 
 * The main function that wrap every asyncjs
 */
export async function main(callable) {
    await callable(callable);
    process.exit();
}

/**
 * 
 * @param {string} arg
 * @param {float} arg -- convert string or float to integer values 
 */
export function int(arg) {
    if (isNaN(arg)) {
        throw "ValueError: expected integer value but string was given. " + arg;
    }
    else {
        return parseInt(arg);
    }
}

export function float(arg) {
    if (isNaN(arg)) {
        throw "ValueError: expected float value but string char was given. " + arg;
    }
    else {
        return parseFloat(arg);
    }
}

export function str(arg) {
    return arg.toString();
}






