//Scheme 1: Find all paths when selecting a target
let findPath = (srcx, srcy, r, isValid_fn, pathLists) => {
    let srcPoint = {
		x: srcx,
		y: srcy
    };
    pathLists.set(srcPoint.x + ' ' + srcPoint.y, [srcPoint]);
    console.log(pathLists);
    let searchList = [];
    let nextStepList = [srcPoint];
    for(let step = 1; step <= r; step++){
        // offsets of 6 adjacent (dx, dy)
        // (0, -1), (-1, 0), (0, 1), (1, 1), (1, 0), (1, -1)
        searchList = nextStepList.slice(0, nextStepList.length);
        console.log("searchList:============================");
        console.log(searchList);
        nextStepList = [];
        for(let i = 0; i < searchList.length; i++){
            nextPoint(searchList[i], [0, -1], nextStepList, pathLists);
            nextPoint(searchList[i], [-1, 0], nextStepList, pathLists);
            nextPoint(searchList[i], [0, 1], nextStepList, pathLists);            
            nextPoint(searchList[i], [1, 0], nextStepList, pathLists);
            
            nextPoint(searchList[i], searchList[i].y % 2 ? [1, 1] : [-1, 1], nextStepList, pathLists);
            nextPoint(searchList[i], searchList[i].y % 2 ? [1, -1] : [-1, -1], nextStepList, pathLists);
        }
        console.log("pathLists:============================");
        console.log(pathLists);
        console.log("nextStepList:============================");
        console.log(nextStepList.length);
    }
}

let nextPoint = (srcPoint, direction, nextStepList, pathLists) => {
    let dstPoint = {
		x: srcPoint.x + direction[0],
		y: srcPoint.y + direction[1],
    };
    let dstKey = dstPoint.x + ' ' + dstPoint.y
    if(!pathLists.has(dstKey)){
        console.log(dstPoint)
        nextStepList.push(dstPoint);
        let srcPath = pathLists.get(srcPoint.x + ' ' + srcPoint.y);
        let dstPath = srcPath.slice(0, srcPath.length);
        dstPath.push(dstPoint);
        pathLists.set(dstKey, dstPath);
    }
}

let isValid = () =>{
    return true;
}

let pathmap = new Map();
findPath(10, 10, 2, isValid, pathmap);
console.log(pathmap.size);
//console.log(pathmap.keys());