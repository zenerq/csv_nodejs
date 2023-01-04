const {parse} = require('csv-parse');
const fs = require('fs');

let mostPopularNames = [];

function popularNames(popular){
    return popular['Rank'] == 1 ;
}

fs.createReadStream('Popular_Baby_Names.csv')
.pipe(parse({
    columns: true,
}))
.on('data', (data)=>{
    if (popularNames(data)){
        mostPopularNames.push(data);
    }
})
.on('error', (err)=>{
    console.log(error);
})
.on('end', () => {
    let uniqueChars = mostPopularNames.filter((c, index) => {
        return mostPopularNames.indexOf(c) === index;
    });
    let babyList = (uniqueChars.map((popular) => {
        return `${popular["Child's First Name"]} : ${popular["Gender"]} : ${popular["Year of Birth"]} : ${popular["Ethnicity"]}`;
    }));
    console.log(babyList);
    console.log(`${uniqueChars.length} most popular baby names found`);
    fs.writeFileSync("popular_babylist.txt", JSON.stringify(babyList), 'utf-8');
}) 

