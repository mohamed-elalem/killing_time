class UnionFind {
    private p: number[] = [];
    private rank: number[] = [];
    private numberOfSets: number;
    private setSize: number[] = [];

    constructor(n: number) {
        this.numberOfSets = n;
        this.p = new Array(n);
        this.rank = new Array(n);
        this.setSize = new Array(n);

        for(let i: number = 0; i < n; i++) {
            this.p[i] = i;
            this.rank[i] = 0;
            this.numberOfSets[i] = 1;
        }
    }

    public findSet(i: number): number {
        return this.p[i] == i ? i : this.p[i] = this.findSet(this.p[i]);
    }

    private isSameSet(i: number, j: number): boolean {
        return this.findSet(i) == this.findSet(j);
    }

    public union(i: number, j: number): boolean {
        if(! this.isSameSet(i, j)) {
            let x: number = this.findSet(i);
            let y: number = this.findSet(j);

            if(this.rank[x] < this.rank[y]) {
                this.p[x] = y;
                this.setSize[y] += this.setSize[x];
            }
            else {
                this.p[y] = x;
                if(this.rank[x] == this.rank[y]) {
                    this.rank[x]++;
                }
            }
            this.numberOfSets--;
            return true;
        }

        return false;
    }

    public getSetSize(i: number): number {
        let parent: number = this.findSet(i);

        return this.setSize[parent];
    }

    public getNumSets(): number  {
        return this.numberOfSets;
    }

}

let edge: number[][] = [];
let vertex: number[][] = [];
let totalVertices: number = 0;
let AdjList: number[][] = [[]];
let visited: boolean[] = [];
let k: number = 1;

declare function refreshLines(): void;
declare function connect(x: number[], y: number[], v: number, color): void;


function refresh(): void {
    edge = [];
    AdjList = new Array(totalVertices);
    visited = new Array(totalVertices);
    for(let i = 0; i < totalVertices; i++) {
        AdjList[i] = [];
        visited[i] = false;
    }

    for(let i = 0; i < totalVertices; i++) {
        for(let j = 0; j < totalVertices; j++) {
            if(i != j) {
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
    let edges = mst(k);
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

function cmp(a: number[], b: number[]): number {
    return a[0] - b[0];
}

function mst(k: number): number {
    let uf: UnionFind = new UnionFind(totalVertices);
    edge.sort(function(a: number[], b: number[]): number {
        return a[0] - b[0];
    });
    console.log(edge);
    let edges: number = 0;
    let exec: any = [];
    for(let i: number = 0; uf.getNumSets() > k; i++) {
        let connected: boolean = uf.union(edge[i][1], edge[i][2]);
        if(connected) {
            let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
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

function newVertex(v): void {
    vertex.push(v);
    totalVertices++;
    console.log("Adding ", v, "Total of ", totalVertices);
    refresh();
}

