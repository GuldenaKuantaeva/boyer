let fs = require('fs');
let arg = process.argv;
let S = fs.readFileSync(arg[2], 'utf8');
S = S.toString();
let T = fs.readFileSync(arg[3], 'utf8');
T = T.toString();
let n = S.length;
let m = T.length;


let Shift1 = new Array();
for (let i = 0; i < T.length; i++)
    Shift1[T[i]] = i;

let Shift2 = new Array();
for (let i = 0; i < m + 1; i++)
    Shift2[i] = 0;

let z = new Array();
let r = m + 1;
z[m] = r;
for (let i = m; i > 0; i--) {
    while (r <= m && T[i - 1] != T[r - 1]) {
        if (Shift2[r] == 0)
            Shift2[r] = r - i;
        r = z[r];
    }
    r--;
    z[i - 1] = r;
}
let prefixCount = z[0];
for (let i = 0; i <= m; i++) {
    if (Shift2[i] == 0)
        Shift2[i] = prefixCount;
    if (i == prefixCount)
        prefixCount = z[prefixCount];
}

let ans = new Array();
let i = 0;
while (i <= n - m) {
    for (j = m - 1; j >= 0 && T[j] == S[i + j]; j--);
        if (j < 0) {
            ans.push(i);
            i += Shift2[j + 1];
        }
		else 
            i += Math.max(Shift2[j + 1],((Shift1[S[i + j]]) ? Math.max(j - Shift1[S[i + j]], 1) : j));
}

if (ans.length == 0)
    console.log("substring not found");
else 
{	
    console.log("The numbers of the elements into which the substring entered: " +ans.join(', '));
}