const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    /*const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);*/
    /*const time = (new Date()).toTimeString();
    core.setOutput("time", time);*/
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    //add 0 if week is less than 10
    if (week < 10) {
        week = "0" + week
    }
    let beforeversion = now.getFullYear().toString().substr(-2) + "W" + week
    // Get the JSON webhook payload for the event that triggered the workflow
    //const payload = JSON.stringify(github.context.payload, undefined, 2)
    //console.log(`The event payload: ${payload}`);
    //console.log(github.context.payload["repository"]["tags_url"])
    //console.log(github.context.payload["repository"])
    let tagurl
    try {
        tagurl = github.context.payload["repository"]["tags_url"]
        console.log('yes')
    } catch (err) {
        tagurl = 'https://api.github.com/repos/' + process.env.GITHUB_REPOSITORY + '/tags'
        console.log('no')
    }
    let headers = { headers: { Authorization: 'token ' + process.env.GITHUB_TOKEN } }
    if (process.env.GITHUB_TOKEN == undefined) {
        headers = {}
    }
    console.log(tagurl)
    let betatag, gettoit
    fetch(tagurl, headers)
        .then(res => res.json())
        .then(body => {
            console.log(body)
            //body.forEach(element => {
            try {
                if (body.length == 0) {
                    betatag = beforeversion + "A"
                    console.log("ok")
                } else {
                    body.every(element => {
                        if (element["name"].search(beforeversion) > -1) {
                            //get index of year
                            let yearindex = element["name"].search(now.getFullYear().toString().substr(-2))
                            //remove before year
                            let afteryear = element["name"].slice(yearindex)
                            console.log(yearindex)
                            console.log(afteryear)
                            let aplhabetbefore = afteryear.slice(afteryear.search(beforeversion) + 5, afteryear.search(beforeversion) + 6);
                            console.log(afteryear.slice(afteryear.search(beforeversion) + 5, afteryear.search(beforeversion) + 6))
                            gettoit = alphabet[alphabet.indexOf(aplhabetbefore) + 1]
                            console.log(alphabet.indexOf(aplhabetbefore))
                            console.log(gettoit)
                            betatag = beforeversion + gettoit
                            return false
                            //break;
                        } else {
                            betatag = beforeversion + "A"
                            console.log("ok")
                            return true
                        }
                    });
                }
            } catch (error) {
                console.log(error)
                betatag = beforeversion + "A"
                console.log("catch but ok")
            }
            //if(body.length == 0){
            //betatag = beforeversion+"A"
            //console.log("ok")
            //}
            //});
            core.setOutput("betaversion", betatag);
        });
    //console.log(now.getFullYear().toString().substr(-2))
} catch (error) {
    core.setFailed(error.message);
}
