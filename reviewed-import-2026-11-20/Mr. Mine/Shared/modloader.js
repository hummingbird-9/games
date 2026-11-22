var fs = require('fs');
var path = require('path');
var archiver = require('archiver');
var AdmZip = require('adm-zip');

var mods = []; //Holds Mod Instances

/*
TO DO
- Do not allow publishing a mod that was downloaded DLC from another user
- Give the users a set of functions to bind their mod functionality to
- Associate the mod active status with the users individual save slots
- Make the users have to do a little bit of work to get the publish button to show up (don't show it by default)
- Provide a link to each DLC so they users can go to the steam page to see them
- Delete mods that were banned
- Check that mods are not breaking the rules by checking bits of code
- Ability to change the mod load order
- Add a way to bring up the mod UI and show an exclamation mark if there is a problem or warning
- Have mod UI popup when a user clicks on a save slot
*/

class Mod
{
    constructor(modFolderLocation)
    {
        this.modFolderLocation = modFolderLocation;
        var tempFolderPath = modFolderLocation.split("\\");
        this.modFolderName = tempFolderPath[tempFolderPath.length - 1];
        this.steamData = {};

        if(localStorage.getItem(this.modFolderName + "_details") !== null)
        {
            this.steamData = JSON.parse(LZString.decompress(localStorage[this.modFolderName + "_details"]));
        }

        this.isDataLoaded = false;
        this.Name = this.Author = this.Description = this.ModVersion = this.Date = this.GameVersion = this.Dependencies = "";
        this.loadIndexKey = this.modFolderName + "_order";
        this.loadingStartedFiles = 0;
        this.loadingFinishedFiles = 0;
    }

    isEnabled()
    {
        if(localStorage.getItem(this.modFolderName) !== null)
        {
            return localStorage[this.modFolderName] == "true" || localStorage[this.modFolderName] == true;
        }
        else
        {
            return false;
        }
    }

    loadModData()
    {
        fs.readdirSync(this.modFolderLocation).forEach(file =>
        {
            const absolutePath = path.join(this.modFolderLocation, file);
            if(!fs.statSync(absolutePath).isDirectory())
            {
                if(absolutePath.includes("info.txt"))
                {
                    fs.readFile(absolutePath, 'utf-8', (err, fileData) =>
                    {
                        if(err)
                        {
                            alert("An error ocurred reading the file :" + err.message);
                            return;
                        }
                        console.log(fileData);
                        var data = JSON.parse(fileData);

                        this.Name = ('Name' in data) ? data.Name : "";
                        this.Author = ('Author' in data) ? data.Author : "";
                        this.Description = ('Description' in data) ? data.Description : "";
                        this.ModVersion = ('ModVersion' in data) ? data.ModVersion : "";
                        this.Date = ('Date' in data) ? data.Date : "";
                        this.GameVersion = ('GameVersion' in data) ? data.GameVersion : "";
                        this.Dependencies = ('Dependencies' in data) ? data.Dependencies : "";

                        this.isDataLoaded = true;
                    });
                }
            }
        });
    }

    loadModJavascript()
    {
        this.loadAllJsFromFolder(this.modFolderLocation);
    }

    loadAllJsFromFolder(directory)
    {
        fs.readdirSync(directory).forEach(file =>
        {
            const absolutePath = path.join(directory, file);
            if(fs.statSync(absolutePath).isDirectory())
            {
                this.loadAllJsFromFolder(absolutePath);
            }
            else
            {
                if(isJavascriptFile(absolutePath))
                {
                    this.loadingStartedFiles++;
                    loadJS(absolutePath, this.incrementFilesLoaded, this);
                }
            }
        });
    }

    incrementFilesLoaded()
    {
        this.loadingFinishedFiles++;
    }

    isJavascriptLoaded()
    {
        return this.loadingStartedFiles == this.loadingFinishedFiles && this.loadingFinishedFiles > 0;
    }

    isJavascriptLoading()
    {
        return this.loadingStartedFiles != this.loadingFinishedFiles && this.loadingFinishedFiles > 0;
    }

    getLoadIndex()
    {
        if(localStorage.getItem(this.loadIndexKey) !== null)
        {
            return parseInt(localStorage[this.loadIndexKey]);
        }
        else
        {
            return Number.MAX_SAFE_INTEGER;
        }
    }

    setLoadIndex(newValue)
    {
        localStorage[this.loadIndexKey] = newValue;
    }

    enableMod()
    {
        localStorage[this.modFolderName] = true;
    }

    disableMod()
    {
        localStorage[this.modFolderName] = false;
    }

    isOutOfDate()
    {
        return parseInt(this.Version) < version;
    }

    isModOwner()
    {
        if(localStorage.getItem(this.modFolderName + "_owner") !== null)
        {
            return true;
        }
        else
        {
            if(this.steamData.hasOwnProperty("steamIDOwner"))
            {
                return UID == this.steamData["steamIDOwner"];
            }
            else
            {
                //Unknown: Either 3rd party or a Developer
                return true;
            }
        }
    }

    getModFileHandle()
    {
        if(localStorage.getItem(this.modFolderName + "_handle"))
        {
            return localStorage[this.modFolderName + "_handle"];
        }
        else if(this.steamData.hasOwnProperty("publishedFileId") != null)
        {
            return this.steamData["publishedFileId"];
        }
        else
        {
            return null;
        }
    }
}

// ###################################################################################
// ##################################### STARTUP #####################################
// ###################################################################################

function assignModFolders(root)
{
    fs.readdirSync(root).forEach(file =>
    {
        const absolutePath = path.join(root, file);
        if(fs.statSync(absolutePath).isDirectory() && file != "Zipped")
        {
            var newMod = new Mod(absolutePath);
            mods.push(newMod);
        }
    });
}

function loadAllEnabledModFiles()
{
    for(var i = 0; i < mods.length; i++)
    {
        mods[i].loadModData();
    }
}

function waitForDataLoadingCompletion()
{
    for(var i = 0; i < mods.length; i++)
    {
        if(!mods[i].isDataLoaded)
        {
            setTimeout(waitForDataLoadingCompletion, 17);
            return;
        }
    }
    onDataLoadingCompleted();
}

function onDataLoadingCompleted()
{
    establishModLoadOrder();
    loadJavascriptOfEnabledMods(0);
}

function establishModLoadOrder()
{
    //Lower load index loads first
    mods.sort((a, b) => (a.getLoadIndex() > b.getLoadIndex()) ? 1 : -1);
}

function loadJavascriptOfEnabledMods(startIndex)
{
    for(var i = startIndex; i < mods.length; i++)
    {
        if(mods[i].isEnabled() && !mods[i].isJavascriptLoaded())
        {
            mods[i].loadModJavascript();
            waitForIndividualModToLoad(i);
            return;
        }
    }
}

function waitForIndividualModToLoad(modIndex)
{
    if(!mods[modIndex].isJavascriptLoaded())
    {
        setTimeout(function () {waitForIndividualModToLoad(modIndex);}, 17);
    }
    else
    {
        loadJavascriptOfEnabledMods(modIndex + 1);
    }
}

function getModByFolderLocation(folderLocation)
{
    for(var i = 0; i < mods.length; i++)
    {
        if(folderLocation == mods[i].modFolderLocation)
        {
            return mods[i];
        }
    }
    return null;
}

function doesModThumbnailExist(modFolder)
{
    return doesFileExist(getModThumbnailPath(modFolder));
}

function getModThumbnailPath(modFolder)
{
    return modFolder + "/thumbnail.png";
}

// #########################
// ###### RUN STARTUP ######
// #########################

assignModFolders("mods");
loadAllEnabledModFiles();
waitForDataLoadingCompletion();

// ###################################################################################
// #################################### INTERFACE ####################################
// ###################################################################################

// UI shows: load order, enabled status, out of date status, missing status, name, description, version, author, release date, dependencies
// You can only make changes at start of the game when you first click a save
// Cannot load a file if dependency is not met and cannot place a mod above a dependency

//###########################################
//############## MANAGEMENT UI ##############
//###########################################

function createModsUI()
{
    //Mod wrapper
    var modsInterfaceWrapper = document.createElement("div");
    modsInterfaceWrapper.id = "modsUI";
    modsInterfaceWrapper.style.position = "absolute";
    modsInterfaceWrapper.style.width = "600px";
    modsInterfaceWrapper.style.height = "400px";
    modsInterfaceWrapper.style.zIndex = -1;
    modsInterfaceWrapper.style.visibility = "hidden";
    modsInterfaceWrapper.style.left = "50%";
    modsInterfaceWrapper.style.marginLeft = "-300px";
    modsInterfaceWrapper.style.top = "50%";
    modsInterfaceWrapper.style.marginTop = "-200px";
    modsInterfaceWrapper.style.border = "1px solid white";
    modsInterfaceWrapper.style.background = "black";
    modsInterfaceWrapper.style.color = "white";
    document.body.appendChild(modsInterfaceWrapper);

    //Scrolling mod selection menu
    var modSelectionMenu = document.createElement("div");
    modSelectionMenu.id = "modsMenu";
    modSelectionMenu.style.width = "160px";
    modSelectionMenu.style.height = "398px";
    modSelectionMenu.style.zIndex = -1;
    modSelectionMenu.style.overflowX = "hidden";
    modSelectionMenu.style.overflowY = "auto";
    modSelectionMenu.style.border = "1px solid white";
    modSelectionMenu.style.background = "#111111";
    modSelectionMenu.style.color = "white";
    modSelectionMenu.style.display = "inline-block";
    document.getElementById("modsUI").appendChild(modSelectionMenu);

    //Mod Exit Button
    var modMenuExitButton = document.createElement("div");
    modMenuExitButton.id = "modMenuExitButton";
    modMenuExitButton.style.position = "absolute";
    modMenuExitButton.style.top = "0px";
    modMenuExitButton.style.right = "0px";
    modMenuExitButton.style.width = "25px";
    modMenuExitButton.style.height = "25px";
    modMenuExitButton.style.zIndex = 4;
    modMenuExitButton.style.background = "url('Assets/UI/closei.png') no-repeat center";
    modMenuExitButton.style.color = "white";
    modMenuExitButton.style.display = "block";
    modMenuExitButton.style.padding = "0px";
    modMenuExitButton.style.cursor = "pointer";
    modMenuExitButton.onclick = hideModsUI;
    document.getElementById("modsUI").appendChild(modMenuExitButton);

    //Mod Details Menu
    var modDetailsMenu = document.createElement("div");
    modDetailsMenu.id = "modDetails";
    modDetailsMenu.style.width = "400px";
    modDetailsMenu.style.height = "378px";
    modDetailsMenu.style.zIndex = -1;
    modDetailsMenu.style.overflowX = "hidden";
    modDetailsMenu.style.overflowY = "auto";
    modDetailsMenu.style.borderLeft = "1px solid white";
    modDetailsMenu.style.background = "transparent";
    modDetailsMenu.style.color = "white";
    modDetailsMenu.style.display = "inline-block";
    modDetailsMenu.style.padding = "10px 5px 10px 5px";
    document.getElementById("modsUI").appendChild(modDetailsMenu);

    for(var i = 0; i < mods.length; i++)
    {
        addModEntry(mods[i]);
    }
}

function addModEntry(mod)
{
    var modEntry = document.createElement("div");
    modEntry.style.width = "148px";
    modEntry.style.height = "65px";
    modEntry.style.padding = "0px 0px 0px 0px";
    modEntry.style.marginTop = "3px";
    modEntry.style.marginBottom = "3px";
    modEntry.style.marginLeft = "5px";
    modEntry.style.overflow = "hidden";
    modEntry.style.border = "1px solid white";
    modEntry.style.background = "#222222";
    modEntry.style.color = "white";
    modEntry.style.cursor = "pointer";
    modEntry.style.opacity = 0.75;
    modEntry.style.fontSize = "12px";
    modEntry.onmouseover = function ()
    {
        this.style.opacity = 1;
    }
    modEntry.onmouseout = function ()
    {
        this.style.opacity = 0.80;
    }
    modEntry.onclick = function ()
    {
        displayModDetails(mod);
    }

    var modDetailsEntry = document.createElement("div");
    modDetailsEntry.style.width = "120px";
    modDetailsEntry.style.height = "59px";
    modDetailsEntry.style.overflow = "hidden";
    modDetailsEntry.style.display = "inline-block";
    modDetailsEntry.style.padding = "3px 3px 3px 3px";
    modDetailsEntry.innerHTML = shortenStringAndAddEllipsis(mod.Name, 15) + "<br>v." + shortenStringAndAddEllipsis(mod.ModVersion, 15) + "<br>" + shortenStringAndAddEllipsis(mod.Description, 45);
    modEntry.appendChild(modDetailsEntry);

    var modCheckBox = document.createElement("div");
    modCheckBox.style.width = "18px";
    modCheckBox.style.height = "65px";
    modCheckBox.style.overflow = "hidden";
    modCheckBox.style.display = "inline-block";
    //AO: refactor "checked"
    if(mod.isEnabled())
    {
        modCheckBox.innerHTML = "<input type='checkbox' id='enabledStatus_" + mod.Name + "' checked='checked' onclick='toggleEnabled(\"" + mod.modFolderLocation.replace("\\", "\\\\") + "\")'>";
    }
    else
    {
        modCheckBox.innerHTML = "<input type='checkbox' id='enabledStatus_" + mod.Name + "' onclick='toggleEnabled(\"" + mod.modFolderLocation.replace("\\", "\\\\") + "\")'>";
    }
    modEntry.appendChild(modCheckBox);
    modEntry.appendChild(modDetailsEntry);

    document.getElementById("modsMenu").appendChild(modEntry);
}

function toggleEnabled(modFolderLocation)
{
    var mod = getModByFolderLocation(modFolderLocation);
    if(mod.isEnabled())
    {
        mod.disableMod();
    }
    else
    {
        mod.enableMod();
    }
    document.getElementById("enabledStatus_" + mod.Name).checked = mod.isEnabled();
}

function displayModDetails(mod)
{
    var generatedContent = "";
    if(doesModThumbnailExist(mod.modFolderLocation))
    {
        generatedContent += "<center><img src='" + getModThumbnailPath(mod.modFolderLocation) + "' style='max-width: 200px;'></center><br>"
    }
    generatedContent += "<b>Name</b>: " + mod.Name + "<br>";
    generatedContent += "<b>Version</b>: " + mod.ModVersion + "<br>";
    generatedContent += "<b>Author</b>: " + mod.Author + "<br>";
    generatedContent += "<b>Compatible Game Version</b>: " + mod.GameVersion + "<br>";
    generatedContent += "<b>Release Date</b>: " + mod.Date + "<br>";
    if(mod.Dependencies != "")
    {
        generatedContent += "<b>Dependencies</b>: " + mod.Dependencies + "<br>";
    }
    else
    {
        generatedContent += "<b>Dependencies</b>: None<br>";
    }
    generatedContent += "<b>Description</b>: " + mod.Description + "<br>";

    if(mod.isModOwner())
    {
        if(mod.getModFileHandle() == null)
        {
            generatedContent += "<b>Publish</b>: <input type='submit' value='Publish' onClick='createPublishModsUI(\"" + mod.modFolderLocation.replace("\\", "\\\\") + "\");'><br>";
        }
        else
        {
            generatedContent += "<b>Update</b>: <input type='submit' value='Update' onClick='createPublishModsUI(\"" + mod.modFolderLocation.replace("\\", "\\\\") + "\");'><br>";
        }
    }

    document.getElementById("modDetails").innerHTML = generatedContent;
}

function showModsUI()
{
    if(document.getElementById("modsUI") == null)
    {
        createModsUI();
    }
    document.getElementById("modsUI").style.visibility = "visible";
    document.getElementById("modsUI").style.zIndex = 999;
}

function hideModsUI()
{
    document.getElementById("modsUI").style.visibility = "hidden";
    document.getElementById("modsUI").style.zIndex = -1;
}

//########################################
//############## PUBLISH UI ##############
//########################################

function createPublishModsUI(modFolderLocation)
{
    var mod = getModByFolderLocation(modFolderLocation);

    var modsPublishInterfaceWrapper = document.createElement("div");
    modsPublishInterfaceWrapper.id = "modsPublishUI";
    modsPublishInterfaceWrapper.style.position = "absolute";
    modsPublishInterfaceWrapper.style.width = "600px";
    modsPublishInterfaceWrapper.style.height = "450px";
    modsPublishInterfaceWrapper.style.zIndex = 1000;
    modsPublishInterfaceWrapper.style.visibility = "visible";
    modsPublishInterfaceWrapper.style.left = "50%";
    modsPublishInterfaceWrapper.style.marginLeft = "-300px";
    modsPublishInterfaceWrapper.style.top = "50%";
    modsPublishInterfaceWrapper.style.marginTop = "-250px";
    modsPublishInterfaceWrapper.style.border = "1px solid white";
    modsPublishInterfaceWrapper.style.background = "black";
    modsPublishInterfaceWrapper.style.color = "white";
    modsPublishInterfaceWrapper.style.textAlign = "center";
    modsPublishInterfaceWrapper.innerHTML = "<u>Publish Mod To Steam Workshop</u><br><br>";
    if(doesModThumbnailExist(modFolderLocation))
    {
        modsPublishInterfaceWrapper.innerHTML += "<center><img src='" + getModThumbnailPath(modFolderLocation) + "' style='max-width: 200px;'></center><br>"
    }
    modsPublishInterfaceWrapper.innerHTML += "Name: <u>" + mod.Name + "</u><br>";
    modsPublishInterfaceWrapper.innerHTML += "Folder Location: <u>" + mod.modFolderLocation + "</u><br>";
    modsPublishInterfaceWrapper.innerHTML += "Author: <u>" + mod.Author + "</u><br>";
    modsPublishInterfaceWrapper.innerHTML += "Mod Version: <u>" + mod.ModVersion + "</u><br>";
    modsPublishInterfaceWrapper.innerHTML += "Update Date: <u>" + mod.Date + "</u><br>";
    if(version - 1 != mod.GameVersion)
    {
        modsPublishInterfaceWrapper.innerHTML += "<span title='Update the version in your info.txt file' style='color: red'>(WARNING!) Game Version At Time Of Publishing: <u>" + mod.GameVersion + "</u></span><br>";
    }
    else
    {
        modsPublishInterfaceWrapper.innerHTML += "Game Version At Time Of Publishing: <u>" + mod.GameVersion + "</u><br>";
    }
    modsPublishInterfaceWrapper.innerHTML += "Dependencies: <u>" + mod.Dependencies + "</u><br>";
    modsPublishInterfaceWrapper.innerHTML += "<br><br>";

    modsPublishInterfaceWrapper.innerHTML += "Tags (Comma Delimited): <input id='tags' type='text'></input><br>";
    modsPublishInterfaceWrapper.innerHTML += "Agree To <u>Terms</u>: <input id='agreedToTerms' type='checkbox' value='agreedToTos'><br><br>";

    if(mod.isModOwner())
    {
        //AO: refactor (just text)
        if(mod.getModFileHandle() == null)
        {
            modsPublishInterfaceWrapper.innerHTML += "<input type='submit' value='Publish To Steam' onClick='publishMod(\"" + mod.modFolderLocation.replace("\\", "\\\\") + "\");'><br><br>";
        }
        else
        {
            modsPublishInterfaceWrapper.innerHTML += "<input type='submit' value='Update Mod On Steam' onClick='publishMod(\"" + mod.modFolderLocation.replace("\\", "\\\\") + "\");'><br><br>";
        }
    }

    //Publish Exit Button
    var modPublishMenuExitButton = document.createElement("div");
    modPublishMenuExitButton.id = "modPublishMenuExitButton";
    modPublishMenuExitButton.style.position = "absolute";
    modPublishMenuExitButton.style.top = "0px";
    modPublishMenuExitButton.style.right = "0px";
    modPublishMenuExitButton.style.width = "25px";
    modPublishMenuExitButton.style.height = "25px";
    modPublishMenuExitButton.style.zIndex = 4;
    modPublishMenuExitButton.style.background = "url('Assets/UI/closei.png') no-repeat center";
    modPublishMenuExitButton.style.color = "white";
    modPublishMenuExitButton.style.display = "block";
    modPublishMenuExitButton.style.padding = "0px";
    modPublishMenuExitButton.style.cursor = "pointer";
    modPublishMenuExitButton.onclick = function () {document.getElementById("modsPublishUI").visibility = "hidden"; document.body.removeChild(document.getElementById("modsPublishUI"));};
    modsPublishInterfaceWrapper.appendChild(modPublishMenuExitButton);

    var publishResults = document.createElement("div");
    publishResults.id = "publishResults";
    publishResults.style.width = "400px";
    publishResults.style.height = "100px";
    publishResults.style.overflowX = "hidden";
    publishResults.style.overflowY = "auto";
    publishResults.style.display = "inline-block";
    publishResults.style.padding = "3px 3px 3px 3px";
    publishResults.style.textAlign = "left";
    publishResults.innerHTML = "";
    modsPublishInterfaceWrapper.appendChild(publishResults);

    document.body.appendChild(modsPublishInterfaceWrapper);
}

function logToPublishResultsLog(text)
{
    console.log(text);
    document.getElementById("publishResults").innerHTML += text + "<br>";
}

//##################################################################################
//#################################### WORKSHOP ####################################
//##################################################################################

//##################################################################################
//############################# GENERAL MOD SUBMISSION #############################
//##################################################################################

var modPublishSettings = {};

function publishMod(modFolder)
{
    if(agreedToTerms.checked)
    {
        var modToPublish = getModByFolderLocation(modFolder);

        //AO: assign active mod instance
        modPublishSettings["modFolder"] = modFolder;
        modPublishSettings["modFolderName"] = modToPublish.modFolderName;

        logToPublishResultsLog("Starting publishing of path: " + modFolder);
        logToPublishResultsLog("Folder Name: " + modToPublish.modFolderName);

        if(modToPublish.modFolderName != "" && modFolder != "")
        {
            publishToSteam();
        }
    }
    else
    {
        alert("Error: You must accept the terms to publish.");
        return;
    }
}

function publishToSteam()
{
    if(doesModThumbnailExist(modPublishSettings["modFolder"]))
    {
        uploadThumbnail(); //will call zipFolder() on completion
    }
    else
    {
        zipFolder();
    }
}

//######################## PROCESS MOD THUMBNAIL ########################

function uploadThumbnail()
{
    if(doesModThumbnailExist(modPublishSettings["modFolder"]))
    {
        greenworks.saveFilesToCloud([getModThumbnailPath(modPublishSettings["modFolder"])], onUploadThumbnailSuccess, onUploadThumbnailError);
    }
}

function onUploadThumbnailSuccess()
{
    logToPublishResultsLog("Upload Thumbnail success");
    shareThumbnail();
}

function onUploadThumbnailError()
{
    logToPublishResultsLog("Upload Thumbnail error");
}

function shareThumbnail()
{
    logToPublishResultsLog("Setting thumbnail to shared");
    greenworks.fileShare(getModThumbnailPath(modPublishSettings["modFolder"]), onShareThumbnailSuccess, onShareThumbnailError);
}

function onShareThumbnailSuccess(fileHandle)
{
    logToPublishResultsLog("Share thumbnail success");
    logToPublishResultsLog(fileHandle);
    zipFolder();
}

function onShareThumbnailError(errorData)
{
    logToPublishResultsLog("Share thumbnail error");
    logToPublishResultsLog(errorData);
}

//######################## PROCESS MOD CONTENTS ########################

function zipFolder()
{
    modPublishSettings["zipPath"] = 'mods/Zipped/' + modPublishSettings["modFolderName"] + '.zip';
    zipDirectory(modPublishSettings['modFolder'], modPublishSettings["zipPath"])
        .then(uploadFileToSteam);
}

function uploadFileToSteam()
{
    logToPublishResultsLog("Uploading mod zip to steam cloud");
    greenworks.saveFilesToCloud([modPublishSettings["zipPath"]], onUploadSuccess, onUploadError);
}

function onUploadSuccess()
{
    logToPublishResultsLog("Upload success");
    shareZippedMod();
}

function onUploadError()
{
    logToPublishResultsLog("Upload error");
}

function shareZippedMod()
{
    logToPublishResultsLog("Setting mod to shared");
    greenworks.fileShare(modPublishSettings["zipPath"], onShareSuccess, onShareError);
}

function onShareSuccess(fileHandle)
{
    logToPublishResultsLog("Share success");
    logToPublishResultsLog(fileHandle);
    publishModToWorkshop();
}

function onShareError(errorData)
{
    logToPublishResultsLog("Share error");
    logToPublishResultsLog(errorData);
}

//##################################################################################
//######################## PUBLISH MOD CONTENTS TO WORKSHOP ########################
//##################################################################################

function publishModToWorkshop()
{
    logToPublishResultsLog("Publishing mod to steam workshop");

    //AO: Move tags to info.txt file
    var tags = document.getElementById("tags").value.split(",");
    for(var i = 0; i < tags.length; i++)
    {
        tags[i] = tags[i].trim();
    }
    var modDetails = getModByFolderLocation(modPublishSettings["modFolder"]);

    var thumbnailPath = "";
    if(doesModThumbnailExist(modPublishSettings["modFolder"]))
    {
        thumbnailPath = getModThumbnailPath(modPublishSettings["modFolder"]);
    }

    var modFileHandle = modDetails.getModFileHandle();

    if(modFileHandle == null)
    {
        //First time publishing
        greenworks.publishWorkshopFile(
            {
                "app_id": appId,
                "tags": tags
            },
            modPublishSettings["zipPath"],
            thumbnailPath,
            modDetails.Name,
            modDetails.Description,
            onPublishSuccess,
            onPublishError
        );
    }
    else
    {
        //Update the existing published mod
        greenworks.updatePublishedWorkshopFile(
            {
                "tags": tags
            },
            modFileHandle,
            modPublishSettings["zipPath"],
            thumbnailPath,
            modDetails.Name,
            modDetails.Description,
            onUpdateSuccess,
            onUpdateError
        );
    }
}

function onUpdateSuccess()
{
    logToPublishResultsLog("Update Success");
}

function onUpdateError()
{
    logToPublishResultsLog("Update Error");
    logToPublishResultsLog(errorData);
}

function onPublishSuccess(publishedFileHandle)
{
    logToPublishResultsLog("Publish Success");
    logToPublishResultsLog("Mod Assigned Id: " + publishedFileHandle);
    localStorage[modPublishSettings["modFolderName"] + "_owner"] = 1;
    localStorage[modPublishSettings["modFolderName"] + "_handle"] = publishedFileHandle;
    logToPublishResultsLog("View At: " + generateExternalLinkHtml("https://steamcommunity.com/sharedfiles/filedetails/?id=" + publishedFileHandle, "https://steamcommunity.com/sharedfiles/filedetails/?id=" + publishedFileHandle));
}

function onPublishError(errorData)
{
    logToPublishResultsLog("Publish Error");
    logToPublishResultsLog(errorData);
}

//##################################################################
//#################### WORKSHOP STEAM SYNCING ######################
//##################################################################

function syncWorkshopItems()
{
    console.log("Sync Workshop Items");
    greenworks.ugcSynchronizeItems({"app_id": appId, "page_num": 1}, "mods/Zipped", onSyncItemsSuccess, onSyncItemsError);
}

function onSyncItemsSuccess(items)
{
    console.log("Sync success (1)");
    var itemFileNames = [];
    for(var i = 0; i < items.length; i++)
    {
        if(items[i].isBanned)
        {
            //Delete item
            console.log(items[i].title + " was banned");
        }
        if(items[i].isUpdated)
        {
            console.log(items[i].title + " was updated");
            if(confirmEnding(items[i].fileName, ".zip"))
            {
                var modFolderName = items[i].fileName.replace(".zip", "");
                var destinationFolder = "mods/" + modFolderName;

                //Delete folder first to remove files that no longer exist in the mod
                deleteDirectoryAndContents(destinationFolder);

                unzipFile("mods/Zipped/" + items[i].fileName, destinationFolder);
                //unzip and replace existing mod folder

                localStorage[modFolderName + "_details"] = LZString.compress(JSON.stringify(items[i]));
                //save data regarding mod update
            }
        }
        itemFileNames.push(items[i].fileName);
    }
    console.log(items);

    handleItemDiffDeletion(itemFileNames);
}

function onSyncItemsError(errorData)
{
    console.log("Sync error");
    console.log(errorData);
}

function handleItemDiffDeletion(newItemFiles)
{
    var oldItemFiles = localStorage.getItem("itemFiles");
    if(oldItemFiles == null)
    {
        oldItemFiles = [];
    }
    else
    {
        oldItemFiles = oldItemFiles.split(",");
    }
    for(var i = 0; i < oldItemFiles.length; i++)
    {
        if(!newItemFiles.includes(oldItemFiles[i]) && oldItemFiles[i] != "")
        {
            console.log("Delete " + oldItemFiles[i]);
            if(confirmEnding(oldItemFiles[i], ".zip"))
            {
                var zipFileLocation = "mods/Zipped/" + oldItemFiles[i];
                console.log("Delete " + zipFileLocation);
                deleteFile(zipFileLocation);

                var folderLocation = "mods/" + oldItemFiles[i].replace(".zip", "");
                console.log("Delete " + folderLocation);
                deleteDirectoryAndContents(folderLocation);
            }
        }
    }
    localStorage["itemFiles"] = newItemFiles;
}

//#############################################################
//########################## HELPERS ##########################
//#############################################################

function zipDirectory(source, out)
{
    const archive = archiver('zip', {zlib: {level: 9}});
    const stream = fs.createWriteStream(out);

    return new Promise((resolve, reject) =>
    {
        archive
            .directory(source, false)
            .on('error', err => reject(err))
            .pipe(stream)
            ;

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

function unzipFile(source, out)
{
    console.log("unzipping " + source + " => " + out);
    var zip = new AdmZip(source);
    zip.extractAllTo(out, true);
}

function deleteDirectoryAndContents(directory)
{
    fs.rmdirSync(directory, {recursive: true});
}

function deleteFile(filePath)
{
    fs.unlinkSync(filePath);
}

function doesFileExist(filePath)
{
    return fs.existsSync(filePath);
}

function saveContentToFile(filePath, content)
{
    fs.writeFile(filePath, content, function (err)
    {
        if(err) return console.log(err);
    });
}