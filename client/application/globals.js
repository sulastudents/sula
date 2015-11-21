mToast = function (message, time) {
    var duration = time;
    if (duration === undefined) {
        duration = 4000;
    }
    return Materialize.toast(message, duration);
}
