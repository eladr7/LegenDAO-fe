# Development Guideline

## How to read this guideline

-   Developers should do if encounter: SHOULD;
-   Developers should not do if encounter: SHOULDN'T, NOT RECOMMENDED;
-   Developers have to do if encounter: HAVE TO;
-   This guideline has not finished yet and may change in the future.

## Setup

After cloning:

-   SHOULD:

```
    npm i
    npm start
```

After pulling:

-   SHOULD:

```
    npm i
```

## IDE

### **Ideas**: your feeling, your comfort

You can use any IDE you like, but if you use Visual Studio Code, please consider the following things:

-   Extensions:

    -   Pretier (for formating), with config (to avoid git tracking annoying changes):

    ```
    print width: 100
    tab width: 4
    semi: true
    bracket spacing: true
    ```

    -   Bracket Pair Colorizer (to protect your eyes)
    -   ESLint
    -   npm
    -   npm Intellisense
    -   Tailwind CSS Intellisense

## Folder structure

```
--+ /app
  |--- store.ts                     # store setup
  |--- hooks.ts                     # utilities
--+ /component                      # hooks, generic components, utils, etc
  |--+ /commons                     # common comps, such as Button, Input, Modal, etc. (rarely change)
  |--+ /icons                       # icons (rarely change)
  |--+ /layouts                     # layouts (rarely change)
  |--+ *.tsx                        # domain/objective components, such as Wallet forms, Articles, etc (often change)
--+ /features                       # contains all "feature folders" (slices of state)
  |--+ /accessibility               # quick access feature
     |--- accessibilitySlice.ts     # quick access like toggle sidebar, universal search, etc.
--+ /routes                         # Pages
--+ App.tsx                         # The App component
--+ index.ts                        # App entry


```

## Git flow

### **Ideas**:

-   to reduce conflicts AMAP

### **Actions**:

When you're preparing for develop a new feature:

-   SHOULD
    -   create a new feature branch base on `develop` branch
    -   when finish, create a pull/merge request
-   NOT RECOMMENDED
    -   work on any existing branches, especially `develop` branch

When create a new **feature branches**:

-   SHOULD:

    -   if you don't use git-flow:

    ```
    git checkout develop
    git checkout -b feature_branch
    ```

    -   if you use git-flow

    ```
    git flow feature start feature_branch
    ...
    git flow feature finish feature_branch
    ```

- HAVE TO:
    - add "`#`" prefix before your feature branch name
    - add "`v`" prefix before a release

When you're working on your feature branch and **want to get code of another** feature branch:

-   SHOULD:
    -   rebase your branch to head of `develop` branch
    ```
    git rebase develop
    ```
-   NOT RECOMMENDED:
    -   if the another feature branch has not finished yet, you should not rebase your current branch to the head of that branch. If you have to do so, please make sure that it's the last choice.

## Conventions

### Naming

-   SHOULD:
    -   add "`T`" prefix if your type is gonna be exported:
    ```
    export type TAppContext = {...}
    ```
    -   add "`I`" prefix if your interface is gonna be exported:
    ```
    export interface IWallet {...}
    ```
    -   add "`rf`" prefix if your variable is a `ref`:
    ```
    const rfIsUnmounted = useRef<boolean>(false);
    ```
    -   add "`glb`" prefix if your variable is global:
    ```
    let glbLanguage = "en";
    ```
    -   add "`b`" prefix if your variable is boolean, but not do it with function name:
    ```
    const [bActivated, setActivated] = useState<boolean>();
    ```
    -   add "`handle`" prefix to event handler function name:
    ```
    const handleOnModalSubmitBtnClicked = useCallback(...);
    ```

### Creating a new component

- HAVE TO:
    - create a brand new file (.tsx) in `/components`, name it clearly
    - if the component has it's own props, declare & define the component Props type, and do NOT export it
    ```
    type Props = React.BaseHTMLAttributes<HTMLDivElement> & {...};
    ```
- SHOULD:
    - use `useCallback` hook for component functions
    - use `useMemo` hook for component variable

### Creating a new feature/slice of state (Redux state)
- HAVE TO:
    - create a brand new **folder** in `/features`, name it by a noun, and short;
    - create a brand new file (.ts) in that new folder, name it by concating the folder name and "`Slice`" suffix;

### Creating a new action of a slice
- HAVE TO:
    - create a brand new file (.ts) in `/features/yourSlice/`, name it by a verb, and short;
    - export the action's domains and import it into your slice.


### Linter

You SHOULDN'T disable any linters in `/src` folders

## To do

-   Testing guideline (if needed)
