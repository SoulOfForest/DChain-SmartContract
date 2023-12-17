const fs = require("fs");
const csvParser = require("csv-parser");
const ethers = require('ethers');

// https://bsc-mainnet.core.chainstack.com/913ec24adc57b824616fd9ef07e1d53b


const main = async () => {
    const provider = new ethers.providers.StaticJsonRpcProvider("https://radial-old-snow.bsc.quiknode.pro/79a491e38135c42ff25a2ac34119a3859bc314db/", {
        chainId: 56,
    });

    const logs = await provider.getLogs({
        fromBlock: 0,
        toBlock: 3
    });

    console.log(logs);
}

main();
// const result = [];

// fs.createReadStream("./polygon-zkevm-export-TxGrowth.csv")
//     .pipe(csvParser())
//     .on("data", (data) => {
//         result.push(data);
//     })
//     .on("end", () => {
//         let total = 0;
//         for (let val of result) {
//             total += Number(val.Value);
//         }

//         console.log(total);
// });