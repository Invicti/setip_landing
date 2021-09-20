const simpleGit = require('simple-git');
const crypto = require('crypto')


// var cli = require('npm');
const RELOAD_PATH = process.env.RELOAD_PATH  ? process.env.RELOAD_PATH : '/tmp/app';
const GITHUB_WEBHOOK_PATH = process.env.GITHUB_WEBHOOK_PATH ? process.env.GITHUB_WEBHOOK_PATH : '/githook'
const GITHUB_HOOK_SECRET = process.env.GITHUB_HOOK_SECRET ? process.env.GITHUB_HOOK_SECRET : '';
const GITHUB_EXTERNAL_LISTEN_IP = process.env.GITHUB_EXTERNAL_LISTEN_IP ? process.env.GITHUB_EXTERNAL_LISTEN_IP : '3000';
const GITHUB_EXTERNAL_LISTEN_PORT = process.env.GITHUB_EXTERNAL_LISTEN_PORT ? process.env.GITHUB_EXTERNAL_LISTEN_PORT : '4500';

// For these headers, a sigHashAlg of sha1 must be used instead of sha256
// GitHub: X-Hub-Signature
// Gogs:   X-Gogs-Signature
const sigHeaderName = 'x-hub-signature-256'
const sigHashAlg = 'sha256'

const fullAppPath = `/tmp/app/${RELOAD_PATH}`;
var http = require('http');

var requestHeader = "";
var server = http.createServer(function (request, response) {
    console.log(`method ${request.method} and url ${request.url}`)


    console.log('reload request handled...');

    if ( !request.headers[sigHeaderName]) {
        console.log('No signature, disconnecting...');
        response.end();
    } else {
        requestHeader = request.headers[sigHeaderName];
    }
    if (request.method === 'GET' && request.url === GITHUB_WEBHOOK_PATH) {
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
            console.log(`Received Github hook: ${new Date().toISOString()}...`);
            if ( !requestHeader) {
                console.log('No signature, disconnecting...');
                response.end();
            } else {
                const sig = Buffer.from(requestHeader || '', 'utf8')
                const hmac = crypto.createHmac(sigHashAlg, GITHUB_HOOK_SECRET)
                const digest = Buffer.from(sigHashAlg + '=' + hmac.update(body).digest('hex'), 'utf8')         
                if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {          
                  console.info(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
                }
                console.info("Github hook signature has been verified." );
            }

            var githubEvent = JSON.parse(decodeURIComponent(body.substring(8)))
            console.debug(`Github hook data: ${JSON.stringify(githubEvent)}`)
            try {
                var commits = {}
                if (githubEvent.commits)
                    commits = githubEvent.commits.reduce(
                        function (agg, commit) {
                            agg.messages = agg.messages + commit.message + ";"
                            agg.filesTouched = agg.filesTouched.concat(commit.added).concat(commit.modified).concat(commit.removed)
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
                console.log("Github hook data:: " + JSON.stringify(push))
                if (push.commits.filesTouched.length > 0) {
                    console.log("Github pull process starting...")
                    refreshAppFromGit();
                }
            } catch (e) {
                console.error("Github pull process failed: " + e.message)
            }

            response.write('handled');
            response.end();
            console.log(`Github pull process completed. ${new Date().toISOString()}`);
        });
    }
    else {
        // respond
        response.write('Reload is live at path ' + GITHUB_WEBHOOK_PATH);
        response.end();
    }
}); //http.createServer
server.listen(
    GITHUB_EXTERNAL_LISTEN_PORT,
    GITHUB_EXTERNAL_LISTEN_IP
    );
console.log('Reload Server running and listening on Port 4500');





async function refreshAppFromGit() {
    try {

        const git  = simpleGit({
            baseDir: fullAppPath,
            binary: 'git',
            maxConcurrentProcesses: 6,
         });
         //const git: SimpleGit = simpleGit('/some/path', { config: ['http.proxy=someproxy'] });
         try {
                await git.pull();
                console.info(`Succesfully pulled repository into: ${fullAppPath}`)
                
                const { exec } = require("child_process");
                exec("cd " + fullAppPath+ "&& npm run-script build", (error, stdout, stderr) => {
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
             console.error(`Error pulling repository into: ${fullAppPath} error is ${e.message}`);
            }

    } catch (e) {
        console.error("Error while trying to execute ./gitRefresh " + e.message)
    }
}
