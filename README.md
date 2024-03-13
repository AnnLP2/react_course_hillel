The program should display a table based on an array of objects:

const animals = [
    {type: `turtle`, icon: `🐢`},
    {type: `octopus`, icon: `🐙`},
    {type: `fish`, icon: `🐠`},
    {type: `flamingo`, icon: `🦩`},
    {type: `penguin`, icon: `🐧`}
]

Every 2 seconds a random item from the list is selected. Selected - this means that styles are applied to it - green color and bold font.
When half of the elements become active (green) – add border to the table (border-width: 10px)
When all elements are active (green) – change border width of the table to 20px.
