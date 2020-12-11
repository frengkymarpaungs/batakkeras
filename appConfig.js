var developmentDatabase = {
    postgres: {
    host: 'ec2-79-125-64-18.eu-west-1.compute.amazonaws.comt',
    port: 5432,
    database: 'd31hmqfc3c7b6c',
    user: 'vzerscikfmdxdg',
    password: '6990f0e308c26ff83feec3c89386b74c88cd71bd09615810886dd12b23ad38ec'
    }
    }
    
    var connectionString ="vzerscikfmdxdg:6990f0e308c26ff83feec3c89386b74c88cd71bd09615810886dd12b23ad38ec@ec2-79-125-64-18.eu-west-1.compute.amazonaws.com:5432/d31hmqfc3c7b6c?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }