WebFont.load({
    google: {
        families: ['Ubuntu']
    },
    active: e => {
        console.log("font loaded!");
        // pre-load the images
        app.loader.
            add([
                // images
                'images/nurek-diver.png',
                'images/shark.gif',
                'images/six-pack-sm.png',
                'images/plastic-water.png',
                'images/plastic-bag.png',
                'images/six-pack.png',
                'images/plastic-jug.png',
                'images/glass-bottle.png',
                'images/can.png',
                'images/soda-can.png'
            ]);
        app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
        app.loader.onComplete.add(setup);
        app.loader.load();
    }
});
