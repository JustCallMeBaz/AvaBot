function getRndNum(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
}

function getRndValue<T>(arr: Array<T>, startingIndex?: number): T {

    if(startingIndex === undefined) startingIndex = 0;

    return arr[getRndNum(startingIndex, arr.length)];
}

export { getRndNum, getRndValue }