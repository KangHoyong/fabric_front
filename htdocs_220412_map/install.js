let deferredInstallPrompt = null;
let installButton = null;
var toastLiveExample = document.getElementById('liveToast');

window.addEventListener('load', () => {
    installButton = document.getElementById("install-button");
    installButton.addEventListener('click', installPWA);
});

window.addEventListener(
    'beforeinstallprompt',
    saveBeforeInstallPromptEvent
);

function saveBeforeInstallPromptEvent (evt) {
    deferredInstallPrompt = evt;
    // $("#info").append(preg_w);
    var toast = new bootstrap.Toast(toastLiveExample);

    toast.show();

    installButton.removeAttribute('hidden');
               
}

function installPWA() {
    deferredInstallPrompt.prompt();

    installButton.remove();
    
    deferredInstallPrompt.userChoice
    .then((choice) => {
        if(choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt', choice);
        }else {
            console.log('User dismissed the A2HS prompt', choice);
        }
        deferredInstallPrompt = null;
    });
}