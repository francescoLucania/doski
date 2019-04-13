if (enable.components.fonts === true) {

    if (enable.components.fontsRubleSans === true) {
        const fontRegular = new FontFaceObserver('TTNormsRegular');

        const fontBold = new FontFaceObserver('TTNormsBold');

        fontBold
            .load()
            .then(function () {
                console.log('TTNormsRegular');
            });

        fontRegular
            .load()
            .then(function () {
                console.log('TTNormsBold');
            });
    }

    // if (enable.components.fontsRubleSerif === true) {
    //     const fontALSRublTimes = new FontFaceObserver('ALSRubl-Times');
    //
    //     fontALSRublTimes
    //         .load()
    //         .then(function () {
    //             console.log('ALSRubl-Times has loaded.');
    //         });
    // }

}
