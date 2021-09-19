const simpleGit = require('simple-git');
// var cli = require('npm');
const RELOAD_PATH = '/reload'
const GITHUB_WEBHOOK_PATH = '/github/push'

var http = require('http');
var server = http.createServer(function (request, response) {
    console.log(`method ${request.method} and url ${request.url}`)
    if (request.method === 'GET' && request.url === RELOAD_PATH) {
        console.log(`reload request starting at ${new Date().toISOString()}...`);
        refreshAppFromGit();
        response.write(`RELOADED!!${new Date().toISOString()}`);
        response.end();

        console.log('reload request handled...');
    }
    else if (request.method === 'POST' && request.url === GITHUB_WEBHOOK_PATH) {
        let body = [];
        request.on('data', 
        (chunk) => {
            body.push(chunk);
        }).on('end', () => {

            //Start Github response.
            body = Buffer.concat(body).toString();

            // at this point, `body` has the entire request body stored in it as a string
            console.log(`GitHub WebHook event handling starting ${new Date().toISOString()}...`);
            var githubEvent = JSON.parse(decodeURIComponent(body.substring(8)))
            console.debug(`github event: ${JSON.stringify(githubEvent)}`)
            // - githubEvent.head_commit is the last (and frequently the only) commit
            // - githubEvent.pusher is the user of the pusher pusher.name and pusher.email
            // - timestamp of final commit: githubEvent.head_commit.timestamp
            // - branch:  githubEvent.ref (refs/heads/master)
            try {
                var commits = {}
                if (githubEvent.commits)
                    commits = githubEvent.commits.reduce(
                        function (agg, commit) {
                            agg.messages = agg.messages + commit.message + ";"
                            agg.filesTouched = agg.filesTouched.concat(commit.added).concat(commit.modified).concat(commit.removed)
                            //                        .filter(file => file.indexOf("src/js/jet-composites/input-country") > -1)
                            return agg
                        }
                        , { "messages": "", "filesTouched": [] })

                var push = {
                    "finalCommitIdentifier": githubEvent.after,
                    "pusher": githubEvent.pusher,
                    "timestamp": githubEvent.head_commit.timestamp,
                    "branch": githubEvent.ref,
                    "finalComment": githubEvent.head_commit.message,
                    "commits": commits
                }
                console.log("WebHook Push Event: " + JSON.stringify(push))
                if (push.commits.filesTouched.length > 0) {
                    console.log("This commit involves changes to the pplication code, so let's perform a git pull ")
                    refreshAppFromGit();
                }
            } catch (e) {
                console.error("GitHub WebHook handling failed with error " + e)
            }

            response.write('handled');
            response.end();
            console.log(`GitHub WebHook event handling complete at ${new Date().toISOString()}`);
        });
    }
    else {
        // respond
        response.write('Reload is live at path ' + RELOAD_PATH);
        response.end();
    }
}); //http.createServer
server.listen(4500);
console.log('Reload Server running and listening on Port 4500');

//https://stackoverflow.com/questions/44647778/how-to-run-shell-script-file-using-nodejs
// https://www.npmjs.com/package/shelljs

var shell = require('shelljs');
var pwd = shell.pwd();
console.info(`current dir ${pwd}`)
const appdir = process.env.RELOAD_PATH ? process.env.RELOAD_PATH : "/tmp/app"



async function refreshAppFromGit() {
    try {

        const appPath = appdir;
        const git  = simpleGit({
            baseDir: appdir,
            binary: 'git',
            maxConcurrentProcesses: 6,
         });
         //const git: SimpleGit = simpleGit('/some/path', { config: ['http.proxy=someproxy'] });
         try {
                await git.pull();
                console.info(`Succesfully pulled repository into: ${appdir}`)
                
                const { exec } = require("child_process");
                exec("cd " + process.env.RELOAD_PATH + "&& npm run-script build", (error, stdout, stderr) => {
                    if (error) {
                        console.log(`npm build error running : ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`npm build stderr: ${stderr}`);
                        return;
                    }
                    console.log(`npm build stdout: ${stdout}`);
                });
                   

            }
        catch (e) {
             console.error(`Error pulling repository into: ${appdir} error is ${e.message}`);
            }

    } catch (e) {
        console.error("Error while trying to execute ./gitRefresh " + e.message)
    }
}
