//alert("Connected");
const app = new PIXI.Application();

app
  .init({
    backgroundColor: "#3398b9",
    width: 800,
    height: 800,
  })

  .then(() => {
    const container = document.querySelector("#gameCon");
    container.appendChild(app.canvas);

    const radius = 10;
    const circle = new PIXI.Graphics()
      .beginFill("#f5ef42")
      .drawCircle(0, 0, radius)
      .endFill();

    circle.x = 400;
    circle.y = 400;
    app.stage.addChild(circle);

    let dx = 4;
    let dy = 4;

    const borders = [
      {
        side: "top",
        hit: false,
        g: new PIXI.Graphics()
          .beginFill("#FFFFFF")
          .drawRect(0, 0, 800, 10)
          .endFill(),
      },

      {
        side: "bottom",
        hit: false,
        g: new PIXI.Graphics()
          .beginFill("#FFFFFF")
          .drawRect(0, 790, 800, 10)
          .endFill(),
      },

      {
        side: "left",
        hit: false,
        g: new PIXI.Graphics()
          .beginFill("#FFFFFF")
          .drawRect(0, 0, 10, 800)
          .endFill(),
      },

      {
        side: "right",
        hit: false,
        g: new PIXI.Graphics()
          .beginFill("#FFFFFF")
          .drawRect(790, 0, 10, 800)
          .endFill(),
      },
    ];

    borders.forEach((border) => app.stage.addChild(border.g));

    const checkCompletion = new Promise((resolve) => {
      const gameLoop = () => {
        circle.x += dx;
        circle.y += dy;

        if (circle.y - radius <= 0) {
          dy *= -1;
          updateBorder(0);
        }

        if (circle.y + radius >= 800) {
          dy *= -1;
          updateBorder(1);
        }

        if (circle.x - radius <= 0) {
          dx *= -1;
          updateBorder(2);
        }

        if (circle.x + radius >= 800) {
          dx *= -1;
          updateBorder(3);
        }

        const finished = borders.every((b) => b.hit == true);

        if (finished) {
          app.ticker.remove(gameLoop);
          resolve("Mission Completed! All borders  have been hit! ");
        }
      };

      function updateBorder(index) {
        if (borders[index].hit == false) {
          borders[index].hit = true;
          borders[index].g.tint = 0xffff00;
          console.log("Hit border: " + borders[index].side);
        }
      }

      app.ticker.add(gameLoop);
    });
    return checkCompletion;
  })
  .then((message) => {
    alert(message);
  })
  .catch((err) => {
    console.error("error:Something went wrong:", err);
  });
