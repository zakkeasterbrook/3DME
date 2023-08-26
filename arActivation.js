document.addEventListener("DOMContentLoaded", function() {
    const modelViewer = document.querySelector("#modelViewer");
    const arButton = document.querySelector("#arButton");

    arButton.addEventListener("click", function() {
        if (modelViewer.canActivateAR) {
            modelViewer.activateAR();
        } else {
            alert("AR is not available on this device.");
        }
    });

    // Toggle interaction mode when the model is clicked
    modelViewer.addEventListener('click', function() {
        if (isInteracting) {
            modelViewer.removeAttribute('camera-controls');
            modelViewer.setAttribute('auto-rotate', '');
            isInteracting = false;
        } else {
            modelViewer.setAttribute('camera-controls', '');
            modelViewer.removeAttribute('auto-rotate');
            isInteracting = true;
        }
    });

    // Revert to default state when the mouse is released or moves out of the model viewer area
    modelViewer.addEventListener('mouseup', revertToDefault);
    modelViewer.addEventListener('mouseleave', revertToDefault); // Using mouseleave instead of mouseout

    function revertToDefault() {
        if (isInteracting) {
            modelViewer.removeAttribute('camera-controls');
            modelViewer.setAttribute('auto-rotate', '');
            isInteracting = false;
        }
    }
});

