const fetch = require('node-fetch');
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
    console.log(tagurl)
    let betatag, gettoit
    fetch(tagurl)
        .then(res => res.json())
        .then(body => {
            //body.forEach(element => {
            try {
                body.every(element => {
                    if (element["name"].search(beforeversion) > -1) {
                        //get index of year
                        let yearindex = element["name"].search(now.getFullYear().toString().substr(-2))
                        //remove before year
                        let afteryear = element["name"].slice(yearindex)
                        console.log(yearindex)
                        console.log(afteryear)
                        let aplhabetbefore = afteryear.slice(afteryear.search(beforeversion) + 4, afteryear.search(beforeversion) + 5);
                        console.log(afteryear.slice(afteryear.search(beforeversion) + 4, afteryear.search(beforeversion) + 5))
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
            } catch (error) {
                betatag = beforeversion + "A"
                console.log("ok")
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
