var inputText = `
1, 2, 8.54
2, 3, 3.11
3, 1, 2.19
3, 4, 4
4, 1, 1.4
`;

inputText = inputText.trim();
var inputLines = inputText.split("\n");

var adjacencyList = {};

for (var i = 0; i < inputLines.length; i++) {
  var line = inputLines[i].trim();

  var parts = line.split(",");
  for (var j = 0; j < parts.length; j++) {
    parts[j] = parts[j].trim();
  }

  var stationA = parseInt(parts[0]);
  var stationB = parseInt(parts[1]);
  var dist = parseFloat(parts[2]);

  if (!adjacencyList[stationA]) {
    adjacencyList[stationA] = [];
  }
  if (!adjacencyList[stationB]) {
    adjacencyList[stationB] = [];
  }

  adjacencyList[stationA].push({
    to: stationB,
    dist: dist,
  });
  adjacencyList[stationB].push({
    to: stationA,
    dist: dist,
  });
}

console.log(adjacencyList);

function findLongestPath(graph) {
  // 「最大距離」と「最長経路」を入れる変数
  var maxDistance = 0;
  var longestPath = [];

  // current    : 今いる駅
  // visited    : 訪問した駅を記録する
  // path       : 今までたどってきた駅のリスト
  // distance   : 今までの経路の合計距離

  function dfs(current, visited, path, distance) {
    if (distance > maxDistance) {
      maxDistance = distance;
      longestPath = [...path];
    }

    var edges = graph[current];
    if (!edges) {
      return;
    }

    for (var k = 0; k < edges.length; k++) {
      var edge = edges[k];
      var nextStation = edge.to;
      var nextDist = edge.dist;

      // まだ訪問していない駅なら進める
      if (!visited.has(nextStation)) {
        visited.add(nextStation);
        path.push(nextStation);

        // 次へ進む
        dfs(nextStation, visited, path, distance + nextDist);

        // DFS から戻ってきたら後始末
        path.pop();
        visited.delete(nextStation);
      }
    }
  }

  for (var stationId in graph) {
    var startStation = parseInt(stationId);

    var visited = new Set();
    visited.add(startStation);

    var path = [startStation];

    dfs(startStation, visited, path, 0);
  }

  return {
    path: longestPath,
    distance: maxDistance,
  };
}

var result = findLongestPath(adjacencyList);

var longestPathArray = result.path;
for (var m = 0; m < longestPathArray.length; m++) {
  console.log(longestPathArray[m]);
}
