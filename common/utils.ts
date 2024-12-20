const fs = require("fs");


function getContractAddresses(network, filename) {
    let json = ""
    try {
        if (filename == "") {
            json = fs.readFileSync(`${process.cwd()}/deployments/${network}.json`).toString();

        }else {
            json = fs.readFileSync(filename).toString()
        }
    }catch (e) {
        console.warn("json not found",network,filename)
    }

    if (json == "" || json == undefined) {
        return {}
    }

    return JSON.parse(json);
}

function writeContractAddresses(network, contractAddresses) {
    let file = `${process.cwd()}/deployments/${network}.json`;
    let json = getContractAddresses(network, '')
    let newJson = {
        ...json,
        ...contractAddresses
    }
    fs.writeFileSync(
        file,
        JSON.stringify(newJson, null, 2) // Indent 2 spaces
    );
}

module.exports = {
    getContractAddresses,
    writeContractAddresses,
};