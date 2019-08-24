window.onload = () => {

    const button = document.createElement('button');
    button.id = 'dartModeButton';
    button.textContent = "DO IT DARK";
    button.addEventListener('click', () => enableDarkMode());

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'darkSetting';
    input.addEventListener('click', () => storageSetting());

    document.querySelector('#end').prepend(button, input, 'Auto apply?');
   
    checkSetting();
}

function checkSetting() {
    chrome.storage.local.get(['enabled', 'color'], (result) => {
        const enabled = result.enabled;

        console.log(enabled);

        document.getElementById('darkSetting').checked = enabled;

        if (enabled) {
            enableDarkMode();
        }
    });
}


function storageSetting() {
    const isEnabled = document.getElementById('darkSetting').checked;
    const setting = { enabled: isEnabled, color: 'purple' };

    chrome.storage.local.set(setting, () => {
        console.log('saved setting', setting);
    });
}

function enableDarkMode() {
    if (!document.getElementsByTagName('ytd-app') || document.getElementsByTagName('ytd-app').length === 0) return;

    document.getElementsByTagName('ytd-app')[0].style.backgroundColor = "black";
}