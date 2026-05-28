### Stack
- expo
- react-native
- typescript
- @tanstack/react-query
- AsyncStorage
- @react-native-picker/picker

## What worked well

Here are some prompts, which worked well:

```
Mobile only app, expo, react-native, typescript

Implement currency converter.

Reuqirements:
- install @react-native-picker/picker
- create Field component with label and component below label passed through prop
- create reusable Picker component with label above picker
- create Card with purple background
- add Field with 'Amount to convert' label and TextInput component (input is number only)
- add 2 Fields with label 'From' and 'To' and picker component (use empty data at this moment)
- add 'Convert currency' button with purple background below Card

Codebase:
- new component store under src/components/
```
```
add converter logic

-install react-query
-use react-query to fetch available currencies from "https://openexchangerates.org/api/currencies.json?app_id=converterAppId"
-cache data for 1 day in persist storage
-use currencies codes as items in Pickers
-do not allow anything unless currencies are loaded (show loading indicator in button)
```

AI worked well when it had to create some feature from scratch or in refactoring.

For example this simple prompt works perfect:
```
Make reusable Error component and use it in Field and below Picker

store it under src/components/
```

## Prompt or suggestion that failed and how you recovered

I gave AI the API endpoint and endpoint to the docs, but I think it didn't read it because it passed api key through headers, but documentation says that api key has to be passed through query parameter. 
In next prompt I tell AI how api key should be passed and ai fixed it pretty well.

At first prompt I gave agent just documentation endpoint and it used bad api endpoint. I don't even know where agent get that endpoint.

## Moment where you had to correct or override the AI

When I was adding second endpoint `conversion.ts`, AI duplicate almost half of the code from the first api endpoint call `currencies.ts`. I had to tell to move duplication to separate file `fixer.ts`.

I have problem in general, that agent just make new feature, but did not 'think' about refactoring and reusability. It is probably because it does not have full context because context window have limitations.

Agent forget to add .env file to .gitignore, i had to add manually

Better maintainability
- agent could have 'think' what make sense to use directly and what will be better as reusable component
