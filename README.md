# Hesitation

Adds a custom DOM event, dispatched when the value of an input field has not changed for _n_ milliseconds.

Sometimes it is useful to wait until a user has stopped typing before your application responds. _Hesitation_ lets your listen for a new event from input elements: `input:hesitation`. This event will be dispatched from the input element when the user has stopped typing, sliding, or spinning.

Listening for the `input:hesitation` event can reduce the redundancy of actions like autocomplete lookups or text searches.
