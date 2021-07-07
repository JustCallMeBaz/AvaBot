function getRndNum(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
}

function getRndInt(min: number, max: number): number {
	return Math.floor(getRndNum(min, max));
}

function getRndValue<T>(arr: Array<T>, startingIndex?: number): T {

    if(startingIndex === undefined) startingIndex = 0;

    return arr[Math.floor(getRndNum(startingIndex, arr.length))];
}

function contains(str: string, ...phrases: string[]): boolean {
	
	for(var x = 0; x < phrases.length; x++) {
		if(str.includes(phrases[x])) return true;
	}
	
	return false;
}

function getNumOfChar(str: string, char: string): number {
	var charNum = 0;
	for(var x = 0; x < str.length; x++) {
		if(str.charAt(x) === char) charNum++;
	}

	return charNum;
}

export { getRndNum, getRndInt, getRndValue, contains, getNumOfChar }