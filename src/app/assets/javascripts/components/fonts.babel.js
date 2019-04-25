if (enable.components.fonts === true) {

    if (enable.components.fontsRubleSans === true) {
        const fontBase = new FontFaceObserver('Montserrat');

        fontBase
            .load()
            .then(function () {
                console.log('Montserrat');
            });
    }
}
