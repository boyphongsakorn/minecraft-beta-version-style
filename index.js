const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    /*const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);*/
    /*const time = (new Date()).toTimeString();
    core.setOutput("time", time);*/
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    core.setOutput("betaversion", now.getFullYear().toString().substr(-2)+"W"+week);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    //console.log(now.getFullYear().toString().substr(-2))
} catch (error) {
    core.setFailed(error.message);
}