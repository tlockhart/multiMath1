/// <reference path="person.ts" />
class Player implements  Person {
    name!: string;
    age?: number;
    // Classes can contain properties that are not defined at all on the interface.
    highScore!: number;

    formatName() {
        return this.name.toUpperCase();
    }
}