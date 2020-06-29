import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ width: 800, height: 450 });

document.body.appendChild(app.view);

app.loader.add('spritesheetJson', 'spritesheet.json').load((loader, resources) => {
    const { spritesheet } = resources.spritesheetJson;
    const background = new PIXI.Sprite(spritesheet.textures["background.png"]);
    app.stage.addChild(background);

    app.stage.scale.x = app.view.width / background.width;
    app.stage.scale.y = app.view.height / background.height;

    const animatedCapguy = new PIXI.AnimatedSprite(spritesheet.animations["capguy"]);

    animatedCapguy.animationSpeed = 0.167;                   // 6 fps
    animatedCapguy.position.set(0, background.height - 100); // almost bottom-left corner of the canvas
    animatedCapguy.play();

    app.stage.addChild(animatedCapguy);
    app.ticker.add(delta => animatedCapguy.x = (animatedCapguy.x + 5*delta) % (background.width + 200));
});
