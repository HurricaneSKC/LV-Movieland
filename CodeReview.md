Code Review 

## The Application
After a quick test around the application a lot looks in a good place. However, there are a few improvements and best practices you could consider

Notes: 
- there is a bug on the search functionality due to an extra '/' in constants.js 
- while most users can add and remove favourites you should also consider accessibile users who may need to manage with focus and keyboard navigation. (e.g. an accessible user can not currently add and remove so this funcitonality would be lost to them)
- it would be a good practice to move API calls to a separate service to keep component files cleaner and makes it easier to manage
- Instead of using string concatenation, it would be better to use template literals for the entire string
- Consider using environment variables for API keys instead of importing from constants
- Could consider altering the file structure keeping components together with their css and test files

## Constants.js

- line 3 + 4: remove extra '/' before query
- consider using template literals 

## App.js

- line 16 + 17: Instead of selecting the entire state, you can use specific selector and refactor to one line, as you've done in Movies.jsx
- line 21: consider setting the initial state
- line 22: isOpen is a bit vague. consider something more descriptive (eg.isPlayerOpen)
- line 27: closeCard function is empty and can be removed
- line 33: getSearchResults function consider template literal
- line 46: getMovies function consider template literal
- line 56: seems like an unnecessary condition as viewTrailer function sets isOpen to true unconditionally 
- line 60: getMovie function should handle exceptions in case the fetch fails. 
- Also, consider abstracting the fetch logic into a separate service or hook. Should be cautious about exposing API keys in client side code
- line 87: not considered best practice to use inline styles, consider using a class instead

## Header.jsx

- line 33: May want to consider seperating the navigation and search functionality and adding a debounce function to optimise performance

## Movie.jsx

- line 16-20: myClickHandeler function
  - avoid using var. If you need to define e, use let or const, however reassigning e is not needed in React.
  - window.event is deprecated 
  - e.cancelBubble is deprecated can use stopPropagation
  - the conditional for e.stopPropagation is not required
  - should avoid direct DOM manipulation when using React consider a state toggle
- line 24: similar point regarding direct DOM manipulation
- line 47: similar logic to line 30 - consider optimising this 
- line 62 + 63: seems like duplication

## Starred.jsx
- line 9 + 10: similar to previous better to select only the part of the state that is needed

## WatchLater.jsx
- line 9 + 10: similar to previous better to select only the part of the state that is needed 
- line 11: potential typo
- line 15: maybe use a more appropriate class name

## Things to consider

- If the project is due to become larger consider the idea of implementing typescript as it provides type safety which can help to catch errors during development
- Consider using a linter to sort import declarations 
