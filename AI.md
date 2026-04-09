Just to add to the AI context:
This repository is mainly about two files

1. alert-box.js
2. alert-box.d.ts

There web component implemented in it which in the end will have to be published on npm.

Now. There is also clean vite project created in directory `alertwebcomponent` which is using this web component. 

The idea is to have this npm package mounted there as a dependency in the `alertwebcomponent/node_modules`.

For development purposed in order to make short-cuts way of testing we can use `npm link` command like so:

```

# in the main directory of this project:

npm link

# that is mounting this entire directory using symlink in global libraries directory on this computer using name from package.json in the main directory of this project. 
So the name is `ace-editor-webcomponent`

Now we have to mount it in the `alertwebcomponent` project.

cd alertwebcomponent
npm link ace-editor-webcomponent

this way this entire repo is mounted as a library (using simlink from global space) in `alertwebcomponent/node_modules/ace-editor-webcomponent`

```

from now on we can just enter `alertwebcomponent` directory and run `npm run dev` to test the web component in the vite project.

Component is attempted to use in `alertwebcomponent/src/App.tsx` file.

But then I'm not 100% sure how our library should be structured to properly work as a dependency.

I assume it will boild down to changes only in these 3 files:

- alert-box.d.ts
- alert-box.js
- package.json

and importing and using it properly in `alertwebcomponent/src/App.tsx` file.

Feel free to inspect all of these files and configure them for this scenario: 

To be ready to be used in React project as a dependency from node_modules.

<important>
ABSOLUTELY STAY AWAY FROM MODIFYING HOW VITE IS CONFIGURED BY DEFAULT. 
ANY SCENARIO WHERE IN ORDER TO USE THIS LIBRARY CONFIGURATION DIVITATING FROM DEFAULT SETTINGS IN VITE IS NEEDED IS NOT ACCEPTABLE.
THE LIBRARY SHOULD BE SIMPLE TO USE, WHICH MEANS npm install ace-editor-webcomponent THEN import ... from 'ace-editor-webcomponent' and that's it, ready to use in App.tsx
</important>


# I'm not sure about:

if the library supposed to be used in the App.tsx like this:

```

import "ace-editor-webcomponent";

<alert-box type="note">text</alert-box>

```


or in some way like this:

```

import AlertBox from "ace-editor-webcomponent";
<AlertBox type="note">text</AlertBox>

```

I don't know that. 
I have no idea what is the canonical way to prepare and use web component npm library.

Should we introduce a wrapper component  in the repostiry (separate file?) for React like AlertBox.(tsx|ts|jsx|js)?
because currently componet in current form works well with raw html.

# testing

Feel free to test final solution if it is loading in the browser using url: http://localhost:5173/

Assume that server is always running. I'll keep it running.

# later edits to this AI.md file

After doing some digging via ChatGPT these seems to be conclusion:

🧠 The problem (why Vite / TS / IDE complain)

When you write:

<alert-box type="note" />

TypeScript checks JSX against:

JSX.IntrinsicElements

And since "alert-box" is not defined there:

👉 ❌ TS error: Property 'alert-box' does not exist

Vite just surfaces that error — it’s not really a Vite issue.

✅ The solution: augment JSX types

You need to teach TypeScript about your custom element.

🧩 1. Add global type definitions (in your library)

Create something like:

// global.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "alert-box": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        type?: "note" | "caution";
      };
    }
  }
}

export {};

👉 This makes:


⚠️ Important detail

This only works if:

👉 Your package exposes this .d.ts file

So in your package.json:

{
  "types": "dist/index.d.ts"
}

🏆 6. Best practice (what I recommend for your library)
✅ Do BOTH:
1. Global WC types (for <alert-box>)
via IntrinsicElements
minimal but working
2. React wrapper (better DX)
<AlertBox type="note" />
fully typed
no global hacks
works with events cleanly


🧩 4. Alternative: ship React types separately (cleaner)

If you also provide a React wrapper:

👉 Put JSX augmentation in:

ace-editor-webcomponent/react

Example:

// react/index.d.ts
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "alert-box": {
        type?: "note" | "caution";
      };
    }
  }
}

This avoids polluting global JSX unless user opts in.
