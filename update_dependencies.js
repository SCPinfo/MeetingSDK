/* eslint-disable guard-for-in, no-continue */
/* global __dirname */

const fs = require('fs');
const path = require('path');
const semver = require('semver');


const pathToPackageJSON = path.resolve(__dirname, '../../package.json');

const packageJSON = require(pathToPackageJSON);

const RNSDKpackageJSON = require(path.resolve(__dirname, './package.json'));


/**
 * Updates dependencies from the app package.json with the peer dependencies of the RNSDK package.json.
 */
function updateDependencies() {
    let updated = false;

    for (const key in RNSDKpackageJSON.peerDependencies) {

        // if the package in SDK peerDependencies doesn't exist in app package.json, add it to app package.json
        if (!packageJSON.dependencies.hasOwnProperty(key)) {
            packageJSON.dependencies[key] = RNSDKpackageJSON.peerDependencies[key];
            updated = true;
        }

        // if the package version in app package.json is not valid version and doesn't equal the one on SDK peerDeps,
        // add the SDK package to the app package.json
        if (!semver.valid(packageJSON.dependencies[key]) && packageJSON.dependencies[key] !== RNSDKpackageJSON.peerDependencies[key]) {
            packageJSON.dependencies[key] = RNSDKpackageJSON.peerDependencies[key];
            updated = true;

            console.log(`
⚠️We changed ${key} version number from ${packageJSON.dependencies[key]} to ${RNSDKpackageJSON.peerDependencies[key]}`
            );

            continue;
        }

        // if the package version in the app package.json equals the one in the SDK package.json, continue
        if (semver.satisfies(RNSDKpackageJSON.peerDependencies[key], `=${packageJSON.dependencies[key]}`)) {
            continue;
        }

        // if the package version in SDK package.json is higher than the one in the app package.json,
        // replace the app package.json version with SDK package
        if (semver.satisfies(RNSDKpackageJSON.peerDependencies[key], `>${packageJSON.dependencies[key]}`)) {
            packageJSON.dependencies[key] = RNSDKpackageJSON.peerDependencies[key];
            updated = true;

            console.log(`${key} is now set to ${RNSDKpackageJSON.peerDependencies[key]}`);
        }

        // if the SDK package version is not valid, and it doesn't include GitHub word
        // and doesn't equal the version in app package.json
        // replace the app package.json version with SDK package
        if (!semver.valid(RNSDKpackageJSON.peerDependencies[key])
            && RNSDKpackageJSON.peerDependencies[key].includes('github')
            && packageJSON.dependencies[key] !== RNSDKpackageJSON.peerDependencies[key]) {
            packageJSON.dependencies[key] = RNSDKpackageJSON.peerDependencies[key];
            updated = true;

            console.log(
`A fix for ${key} is available on ${RNSDKpackageJSON.peerDependencies[key]}.
This is now set on your end.`
            );
        }
    }

    packageJSON.overrides = packageJSON.overrides || {};

    for (const key in RNSDKpackageJSON.overrides) {
        if (!packageJSON.overrides.hasOwnProperty(key)) {
            packageJSON.overrides[key] = RNSDKpackageJSON.overrides[key];
            updated = true;
        }
    }

    if (!updated) {
        console.log('All your dependencies are up to date!');

        return;
    }

    console.log(`
=========================
🚀 Your project was updated!
🛠 Make sure you run npm install
📱 If you are building for iOS run cd ios && pod install to link them.
=========================
`);

    packageJSON.dependencies = Object.keys(packageJSON.dependencies)
        .sort()
        .reduce((item, itemKey) => {
            item[itemKey] = packageJSON.dependencies[itemKey];

            return item;
        }, {});

    fs.writeFileSync(pathToPackageJSON, JSON.stringify(packageJSON, null, 2));

    console.log(
        'All needed dependencies have been updated. \nPlease run npm install.'
    );
}

updateDependencies();
