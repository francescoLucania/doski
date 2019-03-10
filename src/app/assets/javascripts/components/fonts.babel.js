if (enable.components.fonts === true) {

    if (enable.components.fontsRubleSans === true) {
        const fontALSRublArial = new FontFaceObserver('TTNormsRegular');

        fontALSRublArial
            .load()
            .then(function () {
                console.log('TTNorms');
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
