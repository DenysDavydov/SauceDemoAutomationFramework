export { }

declare global {
    interface Array<T> {
        getFirstColumn(this: string[][]): string[];
    }
}

if (!Array.prototype.getFirstColumn) {
    Array.prototype.getFirstColumn = function (this: string[][]): string[] {
        return this.map(values => values[0] ?? "")
    };
}