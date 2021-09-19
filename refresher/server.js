/* this program listens for /reload request at port 4500. 
or a GitHub WebHook trigger (see: https://technology.amis.nl/2018/03/20/handle-a-github-push-event-from-a-web-hook-trigger-in-a-node-application/)
When it receives such a request, it will perform a Git pull in the app sub directory (from where this application runs) 

TODO
- add the option to schedule an automatic periodic git pull

- use https://www.npmjs.com/package/simple-git instead of shelljs plus local Git client (this could allow usage of a lighter base image - e.g. node-slim)
*/

const RELOAD_PATH = '/reload'
const GITHUB_WEBHOOK_PATH = '/github/push'

var http = require('http');
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/github/push', secret: 'hahah' })
http.createServer(function (req, res) {

 
    handler(req, res, function (err) {
    if (err) {
        res.statusCode = 404
        res.end('' + err.message)
    } else {
        res.statusCode = 404
        res.end('no such location')
    }

    })
  }).listen(4500,["0.0.0.0"])
  
  handler.on('error', function (err) {
    console.error('Error:', err.message)
  })
  
  handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
      event.payload.repository.name,
      event.payload.ref)
      //                 if (push.commits.filesTouched.length > 0) {
                    console.log("This commit involves changes to the Node application, so let's perform a git pull ")
                    refreshAppFromGit();
//                 }
  })
  
  handler.on('issues', function (event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
      event.payload.repository.name,
      event.payload.action,
      event.payload.issue.number,
      event.payload.issue.title)
  })
// var server = http.createServer(function (request, response) {
//     console.log(`method ${request.method} and url ${request.url}`)
//     if (request.method === 'GET' && request.url === RELOAD_PATH) {
//         console.log(`reload request starting at ${new Date().toISOString()}...`);
//         refreshAppFromGit();
//         response.write(`RELOADED!!${new Date().toISOString()}`);
//         response.end();

//         console.log('reload request handled...');
//     }
//     else if (request.method === 'POST' && request.url === GITHUB_WEBHOOK_PATH) {
//         let body = [];
//         request.on('data', 
//         (chunk) => {
//             body.push(chunk);
//         }).on('end', () => {
//             try {
                
            
//             //Start Github response.
//             body = Buffer.concat(body).toString();
//             body = decodeURI(body);
//             body = body.payload;
//             // at this point, `body` has the entire request body stored in it as a string
//             console.log(`GitHub WebHook event handling starting ${new Date().toISOString()}...`);
//             var githubEvent = JSON.parse(body)
//             console.debug(`github event: ${JSON.stringify(githubEvent)}`)
//             // - githubEvent.head_commit is the last (and frequently the only) commit
//             // - githubEvent.pusher is the user of the pusher pusher.name and pusher.email
//             // - timestamp of final commit: githubEvent.head_commit.timestamp
//             // - branch:  githubEvent.ref (refs/heads/master)
//             try {
//                 var commits = {}
//                 if (githubEvent.commits)
//                     commits = githubEvent.commits.reduce(
//                         function (agg, commit) {
//                             agg.messages = agg.messages + commit.message + ";"
//                             agg.filesTouched = agg.filesTouched.concat(commit.added).concat(commit.modified).concat(commit.removed)
//                             //                        .filter(file => file.indexOf("src/js/jet-composites/input-country") > -1)
//                             return agg
//                         }
//                         , { "messages": "", "filesTouched": [] })

//                 var push = {
//                     "finalCommitIdentifier": githubEvent.after,
//                     "pusher": githubEvent.pusher,
//                     "timestamp": githubEvent.head_commit.timestamp,
//                     "branch": githubEvent.ref,
//                     "finalComment": githubEvent.head_commit.message,
//                     "commits": commits
//                 }
//                 console.log("WebHook Push Event: " + JSON.stringify(push))
//                 if (push.commits.filesTouched.length > 0) {
//                     console.log("This commit involves changes to the Node application, so let's perform a git pull ")
//                     refreshAppFromGit();
//                 }
//             } catch (e) {
//                 console.error("GitHub WebHook handling failed with error " + e)
//             }
//             } catch (e) {
//                 console.error("GitHub WebHook incoming parsing issue:  " + e)  
//             }
//             response.write('handled');
//             response.end();
//             console.log(`GitHub WebHook event handling complete at ${new Date().toISOString()}`);
//         });
//     }
//     else {
//         // respond
//         response.write('Reload is live at path ' + RELOAD_PATH);
//         response.end();
//     }
// }); //http.createServer
// server.listen(4500);
console.log('Reload Server running and listening on Port 4500');

//https://stackoverflow.com/questions/44647778/how-to-run-shell-script-file-using-nodejs
// https://www.npmjs.com/package/shelljs

var shell = require('shelljs');
var pwd = shell.pwd()
console.info(`current dir ${pwd}`)

function refreshAppFromGit() {
    try {
        if (shell.exec('./gitRefresh.sh').code !== 0) {
            shell.echo('Error: Git Pull failed');
            //            shell.exit(1);
        } else {
            //        shell.exec('npm install')
            //  shell.exit(0);
        }
    } catch (e) {
        console.error("Error while trying to execute ./gitRefresh " + e)
    }
}
