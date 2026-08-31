const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const USER_PROFILE = os.homedir(); 
const OW_SETTINGS_PATH = path.join(USER_PROFILE, 'Documents', 'Overwatch', 'Settings', 'Settings_v0.ini');

const MODIFIED_LINES = `
BroadcastMarginBottom = "0.000000"
BroadcastMarginLeft = "0.000000"
BroadcastMarginRight = "0.000000"
BroadcastMarginTop = "1.000000"
`.trim();

let originalFileContent = '';

// Check if a process is running using native Windows tasklist
function isProcessRunning(processName) {
    try {
        const stdout = execSync(`tasklist /FI "IMAGENAME eq ${processName}"`, { encoding: 'utf8' });
        return stdout.toLowerCase().includes(processName.toLowerCase());
    } catch (e) {
        return false;
    }
}

async function manageOverwatchConfig() {
    console.log(`Targeting configuration at: ${OW_SETTINGS_PATH}`);

    if (!fs.existsSync(OW_SETTINGS_PATH)) {
        console.error(`Error: Could not find Settings_v0.ini.`);
        process.exit(1);
    }

    try {
        // Read and backup the original configuration
        originalFileContent = fs.readFileSync(OW_SETTINGS_PATH, 'utf8');
        console.log('Successfully backed up original Overwatch settings.');

        if (!originalFileContent.includes('[Render.13]')) {
            console.error('Error: Could not find [Render.13] header.');
            process.exit(1);
        }

        const cleanedContent = originalFileContent.replace(/BroadcastMargin.*\n?/g, '');

        const updatedContent = cleanedContent.replace('[Render.13]', `[Render.13]\n${MODIFIED_LINES}`);
        
        fs.writeFileSync(OW_SETTINGS_PATH, updatedContent, 'utf8');
        console.log('Applied custom HUD settings (duplicates prevented).');
        console.log('Waiting for Overwatch 2 to start and close... Do not close this window.');

        let gameWasRunning = false;
        while (true) {
            const isOpen = isProcessRunning('Overwatch.exe');

            if (isOpen && !gameWasRunning) {
                console.log('Overwatch 2 detected running!');
                gameWasRunning = true;
            }

            if (!isOpen && gameWasRunning) {
                console.log('Overwatch 2 closure detected.');
                break;
            }

            await new Promise(resolve => setTimeout(resolve, 3000));
        }

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    } finally {
        revertSettings();
    }
}

function revertSettings() {
    console.log('Reverting settings file back to original state...');
    try {
        if (originalFileContent) {
            fs.writeFileSync(OW_SETTINGS_PATH, originalFileContent, 'utf8');
            console.log('Original settings successfully restored.');
        }
    } catch (err) {
        console.error(`Failed to revert settings file: ${err.message}`);
    }
    process.exit(0);
}

process.on('SIGINT', revertSettings);
process.on('SIGTERM', revertSettings);

manageOverwatchConfig();