# Working on Hydrogen

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher

Run the following commands to get started working on Hydrogen.

| Command                                         | Description                                   |
| ----------------------------------------------- | --------------------------------------------- |
| `git clone git@github.com:Shopify/hydrogen.git` | Clones the repo to your local computer        |
| `npm install`                                   | Installs the dependencies with `npm`          |
| `npm run dev`                                   | Runs the `dev` command in all workspaces      |
| `npm run build`                                 | `build`s packages for production distribution |

## Context

Hydrogen is a monorepo built with [Turborepo](https://turbo.build/) and consists of the following workspaces:

- `templates`: Full working implementations of a Hydrogen storefront, such as the [`demo-store`](https://hydrogen.shop) template
- `packages/hydrogen`: The hooks, components, and utilities provided by Hydrogen
- `packages/remix-oxygen`: A [Remix](https://remix.run) runtime adapter for [Oxygen](https://shopify.dev/custom-storefronts/oxygen)
- `packages/cli`: A plugin for the [Shopify CLI](https://github.com/Shopify/cli) to provide specific commands for working on Hydrogen storefronts

Running `npm run dev` at the root of the monorepo is the most common way to develop in Hydrogen. With this task running, each package will be rebuilt when files change and you can preview the results in the `templates/demo-store` template at (http://localhost:3000)[http://localhost:3000].

The `Readme.md` files in the directories of individual packages and templates contain more specific information for developing in that workspace.

## Formatting and Linting

The Hydrogen monorepo provides commands for linting and formatting, and uses [Yorkie](https://github.com/yyx990803/yorkie) to run checks on staged commits automatically.

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run typecheck` | Checks source-code for invalid TypeScript |
| `npm run lint`      | Lints the code with ESLint                |
| `npm run format`    | Formats the code with prettier            |

## Naming conventions

Hydrogen follows common React naming conventions for filenames, component names, classes, constants, and more.

- For component **filenames** and **class names**, always use `PascalCase`.
- For **non-component filenames**, always use fully lowercase `kebab-case`.
- For **test filenames**, append `.test` before the file extension.
- When declaring **instances** of components, always use `camelCase`.
- When declaring **exported constants**, always use `SCREAMING_SNAKE_CASE`.

| &nbsp;                       | ✅ Valid                                  | 🚫 Invalid                                                                          |
| ---------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------- |
| **Component filenames:**     | `ProductTitle.tsx`<br>`ProductTitle.tsx`  | `productTitle.tsx`<br>`product_title.tsx`<br>`product-title.tsx`                    |
| **Non-component filenames:** | `client.ts`<br>`handle-event.ts`          | `Client.ts`<br>`handleEvent.ts`<br>`handle_event.ts`                                |
| **Test filenames:**          | `ExternalVideo.test.tsx`                  | `ExternalVideo-test.tsx`<br>`ExternalVideo_test.tsx`<br>`ExternalVideoTest.tsx`     |
| **Component classes:**       | `<AddToCartButton />`                     | `<addToCartButton />`                                                               |
| **Component instances:**     | `const cartSelector = <CartSelector />`   | `const CartSelector = <CartSelector />`<br>`const cart_selector = <CartSelector />` |
| **Exported constants:**      | `export const CART_COOKIE_TTL_DAYS = 14;` | `export const CartCookieTTLDays = 14;`<br>`export const cart_cookie_ttl_days = 14;` |

## Changesets

If you are contributing a user-facing or noteworthy change to Hydrogen that should be added to the changelog, you should include a changeset with your PR by running the following command.

| Command                 | Description             |
| ----------------------- | ----------------------- |
| `npm run changeset add` | Add a changeset locally |

Follow the prompts to select which package(s) are affected by your change, and whether the change is a major, minor or patch change. This will create a file in the `.changesets` directory of the repo. This change should be committed and included with your PR.

**Considerations:**

- You can use markdown in your changeset to include code examples, headings, and more. However, **please use plain text for the first line of your changeset**. The formatting of the GitHub release notes does not support headings as the first line of the changeset.

## Merging PRs

When merging PRs, please select the **Squash and Merge** option, which consolidates all the changes from the PR into a single commit. This helps reduce the commit noise in our Git repository.

## Testing

Hydrogen tests are run using [vitest](https://vitest.dev). You can run the tests with the following commands.

| Command              | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `npm run test`       | Run the tests once                                      |
| `npm run test:watch` | Run the tests once and re-run them when files are saved |

### Debugging tests in Github Actions

Tests that fail **only** in CI can be difficult and time-consuming to debug. If you find yourself in this situation, you can use [tmate](https://tmate.io/) to pause the Github Action on a given step and `ssh` into the container. Once in the container you can use `vim`, inspect the file system and try determining what might be diverging from running tests on your local computer and leading to the failure.

- Add the following `step` in your Github Actions workflow:

```yaml
- name: Setup tmate session
  uses: mxschmitt/action-tmate@v3
```

- Commit and push your changes to Github.
- The testing Github Action will run automatically and you will see it paused with both a Web Shell address and SSH address.
- Copy and paste the SSH address into your terminal.

## Principles to develop by

### Understand the concept and primitives

Consider what commerce concepts you’ll be working with for the component or abstraction. Hydrogen is coupled to the [Shopify Storefront API](https://shopify.dev/api/storefront); examining how a commerce primitive is represented there -what data is essential in the API and which other resources use them- is important.

### Determine sensible defaults

Consider what a sensible default would be for the component or abstraction. Look at high GMV commerce websites and check if there is a common pattern for how this information is displayed -be sure to examine both Shopify and non-Shopify storefronts. Browse through the [Liquid documentation](https://shopify.dev/api/liquid), look for[filters](https://shopify.dev/api/liquid/filters) related to your component or abstraction, and consider what defaults those provide and the customizations they support.

### Prioritize developer experience

Consider how to provide the best developer experience when using this component or abstraction. Hydrogen must be fun and easy to use, with good ergonomics, types and tooling. Developers should be **delighted** when they use Hydrogen. To quote Tobi Lütke: “Delight works by taking your experience minus your expectation, and if the end result is a positive number, you are delighted by that margin.”
