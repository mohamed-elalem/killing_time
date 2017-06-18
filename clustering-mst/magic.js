var UnionFind = (function () {
    function UnionFind(n) {
        this.p = [];
        this.rank = [];
        this.setSize = [];
        this.numberOfSets = n;
        this.p = new Array(n);
        this.rank = new Array(n);
        this.setSize = new Array(n);
        for (var i = 0; i < n; i++) {
            this.p[i] = i;
            this.rank[i] = 0;
            this.numberOfSets[i] = 1;
        }
    }
    UnionFind.prototype.findSet = function (i) {
        return this.p[i] == i ? i : this.p[i] = this.findSet(this.p[i]);
    };
    UnionFind.prototype.isSameSet = function (i, j) {
        return this.findSet(i) == this.findSet(j);
    };
    UnionFind.prototype.union = function (i, j) {
        if (!this.isSameSet(i, j)) {
            var x = this.findSet(i);
            var y = this.findSet(j);
            if (this.rank[x] < this.rank[y]) {
                this.p[x] = y;
                this.setSize[y] += this.setSize[x];
            }
            else {
                this.p[y] = x;
                if (this.rank[x] == this.rank[y]) {
                    this.rank[x]++;
                }
            }
            this.numberOfSets--;
            return true;
        }
        return false;
    };
    UnionFind.prototype.getSetSize = function (i) {
        var parent = this.findSet(i);
        return this.setSize[parent];
    };
    UnionFind.prototype.getNumSets = function () {
        return this.numberOfSets;
    };
    return UnionFind;
}());
var edge = [];
var vertex = [];
var totalVertices = 0;
var AdjList = [[]];
var visited = [];
var k = 1;
function refresh() {
    edge = [];
    AdjList = new Array(totalVertices);
    visited = new Array(totalVertices);
    for (var i = 0; i < totalVertices; i++) {
        AdjList[i] = [];
        visited[i] = false;
    }
    for (var i = 0; i < totalVertices; i++) {
        for (var j = 0; j < totalVertices; j++) {
            if (i != j) {
                edge.push([
                    Math.sqrt(Math.pow(vertex[i][0] - vertex[j][0], 2) + Math.pow(vertex[i][1] - vertex[j][1], 2)),
                    i,
                    j
                ]);
                console.log("Adding edge", edge[edge.length - 1]);
            }
        }
    }
    refreshLines();
    var edges = mst(k);
}
// function startDFS(i) {
//     if(i < totalVertices) {
//         if(! visited[i]) {
//             dfs(i, '#' + Math.floor(Math.random() * 16777215).toString(16));
//         }
//         setTimeout(function() {
//             startDFS(totalVertices / k * 100);
//         }, 1000 * k)
//     }
// }
function cmp(a, b) {
    return a[0] - b[0];
}
function mst(k) {
    var uf = new UnionFind(totalVertices);
    edge.sort(function (a, b) {
        return a[0] - b[0];
    });
    console.log(edge);
    var edges = 0;
    var exec = [];
    for (var i = 0; uf.getNumSets() > k; i++) {
        var connected = uf.union(edge[i][1], edge[i][2]);
        if (connected) {
            var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            AdjList[edge[i][1]].push(edge[i][2]);
            AdjList[edge[i][2]].push(edge[i][1]);
            connect(vertex[edge[i][1]], vertex[edge[i][2]], edge[i][1], color);
            console.log("Merging ", edge[i]);
        }
        edges++;
    }
    return edges;
}
// function dfs(u: number, color: string) {
//     visited[u] = true;
//     for(let i: number = 0; i < AdjList[u].length; i++) {
//         let v = AdjList[u][i];
//         if(! visited[v]) {
//             connect(vertex[u], vertex[v], v, color, dfs);
//         }
//     }
// }
function newVertex(v) {
    vertex.push(v);
    totalVertices++;
    console.log("Adding ", v, "Total of ", totalVertices);
    refresh();
}
