# Front End
I have built a front end for this project using create react app and TypeScript. 

The app consists of several components, all housed within a single <Home /> page. 
## Components 
### FetchButton
This component takes in the following props: 
- url -  a url to which to make the http request
- config - an optional object used to append headers to a request
- setter - a setState function to call when a successful response is received and there is some data to use. 
- label - a label for the button
- payload - an optional payload to send with a post request
- disabled 

The button is very simple, when clicked, the target URL is requested, the component local state item of 'loading' becomes true, which displays a 'loading' animation. Upon receipt of a response, the setter is called, updating the state with the received data. In the event of an error, the error message is displayed. 

#### Usage
The fetch button has been used in multiple instances. The first is to request a token. When the user lands on the page, they're prompted to enter a username, which then enables the fetch button. The fetch button makes a request to the '/token' endpoint, and if successful will call the setToken setter passed in from the Home component. 
The other use is within the Form component, in which the button will make requests to a given end point, and update the global data state.

### Home 
The home component is the main component for the web app. The first thing that is presented to the user is a prompt to request a token. Once a token is received and the state is updated, the Form component is then rendered. 

If the piece of global state, the Data array, contains exactly one item (length == 1), then a small bubble is displayed, showing the data.

If the Data array has a length greater than one, the LongDataDisplay component is rendered. 

### Form
The form component is used to create requests and interface with the API. It receives only one prop: token. A token is necessary to make successful requests, and is appended to all requests. 

The form object can be used in multiple 'mode's, each mode corresponds to a different end point on the API. For each mode, the expected inputs from the user will change. 

A FetchButton component is renderered, the URL is determined by the mode chosen, and the query params of that URL are dependant upon the inputs given (see generateQuery function). The setter function passed in is the setter for the global state Data array. 

Each time a successful request is made, the global Data array is updated with the new data.

### LongDataDisplay
This is a component that is only rendered when the length of the global Data array is > 1. ie. When there are multiple data points. The component renders 3 child components: 
- Line - This is a line of the data chart using the chart.js library 
- Table - A simple tabular display of the data where each element in the array corresponds to a row. 
- Export to CSV button - downloads the table as a .csv file. 

## State management
Global state management is handled by the context API, this choice was made to avoid prop drilling - because there are nested components being used. 

The global state is simply an array of type Data. The app expects data in a certain format (see global.d.ts for the Data interface). The API response object has data already in this format.

# Back End
I have built a backend to interface with the exchange rates API. 

## Middlewares
 All end points other than /token make use of the authenticateToken middleware function, if a token is not present on a given request, the request is automatically rejected and an error response is sent. 

These endpoints are also checked for a 'quote' query param, since this is a necessary part of all routes. 

## End points
### /Token 
The /token post end point accepts a username payload, it then serialises this using JWT, and returns a token to the front end. 

### /convert
This endpoint is not available by the exchangerates api free plan, so a strategy to calculate a given rate has been created. A live exchange rate is requested, and this rate is then applied to the quantity supplied in the request's query params. 

### /historical
This is a simple endpoint- the exchange rates api make available a historical rate endpoint for free, so no manipulation of the request or server side calculation is necessary. 

## /range 
This endpoint required some problem solving, as there is no free 'range' functionality made available by the exchange rates api. The solution used was to iterate over dates and make a request on the 'historical', single date at a time, endpoint. 

With each iteration, the date is increased by one day (weekends are skipped), until the end date is reached. 
Each request is appened to an array, which is then reformatted to match the Data interface used on the front end. 


note: 
All end points make a check for the necessary params in the request object, and throw an error response if params are missing. 

All responses are in a format that satisfies the Data interface used in the front end. 

