import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }
const frameTitle = "THE CONCOCTION BY POP WONDER";

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.frame("/", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 90,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {frameTitle}
        </div>
      </div>
    ),
    intents: [
      <Button value="image1" action="/image1">
        View Images
      </Button>,
    ],
  });
});

const rightArrow = "\u2192";
const leftArrow = "\u2190";

app.frame("/image1", (c) => {
  return c.res({
    image: "/1.jpg",
    intents: [
      <Button value="back" action="/">
        {leftArrow}
      </Button>,

      <Button value="next" action="/image2">
        {rightArrow}
      </Button>,
    ],
  });
});

app.frame("/image2", (c) => {
  return c.res({
    image: "/2.jpg",
    intents: [
      <Button value="back" action="/image1">
        {leftArrow}
      </Button>,

      <Button value="next" action="/image3">
        {rightArrow}
      </Button>,
    ],
  });
});

app.frame("/image3", (c) => {
  return c.res({
    image: "/3.jpg",
    intents: [
      <Button value="back" action="/image2">
        {leftArrow}
      </Button>,

      <Button value="next" action="/image4">
        {rightArrow}
      </Button>,
    ],
  });
});

app.frame("/image4", (c) => {
  return c.res({
    image: "/4.jpg",
    intents: [
      <Button value="back" action="/image3">
        {leftArrow}
      </Button>,

      <Button.Link href="https://www.denimcoffeecompany.com/collections/artist-collab-series/products/the-concoction-by-pop-wonder">
        Buy ☕
      </Button.Link>,
    ],
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
