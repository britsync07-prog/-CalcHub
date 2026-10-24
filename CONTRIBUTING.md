# Contributing to Everyday Calculator Hub

First off, thank you for considering contributing to Everyday Calculator Hub! It's people like you that make Everyday Calculator Hub such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make one! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.

## Fork & create a branch

If this is something you think you can fix, then fork Everyday Calculator Hub and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

`git checkout -b 325-add-pizza-calculator`

## Get the test suite running

Make sure you have Node.js installed.
Install dependencies:

`npm install`

Start the development server:

`npm run dev &`

Run the linter to ensure your code matches the project style:

`npm run lint`

## Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first.

If you are adding a new calculator, be sure to:
1. Define it in `src/data/calculators.ts`.
2. Create its view component in the appropriate `Views.tsx` file (e.g., `MathViews.tsx`, `EverydayViews.tsx`).
3. Wire it up in `src/components/CalculatorDispatcher.tsx`.

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with Everyday Calculator Hub's master branch:

`git remote add upstream git@github.com:your-username/everyday-calculator-hub.git`
`git fetch upstream`
`git merge upstream/main`

Then update your feature branch from your local copy of master, and push it!

`git checkout 325-add-pizza-calculator`
`git rebase master`
`git push origin 325-add-pizza-calculator`

Finally, go to GitHub and make a Pull Request!
