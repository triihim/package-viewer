const descriptionLineHandler = async (pkg, line) => {
    const property = "description";
    if(line.toLowerCase().startsWith("description")) {
        pkg[property] = line;
    } else if(pkg["description"] !== undefined) {
        pkg[property] += line;
    }
    return pkg;
}

module.exports = descriptionLineHandler;