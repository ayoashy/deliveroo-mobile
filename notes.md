<!-- installing tailwind -->

install nativewind
`npm i nativewind`
`npm i --dev tailwindcss`

setup tailwind.config.js file
`npx tailwindcss init`

in tailwind.config.js file

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './<custom directory>/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

in babel.config.js file

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugin: ['nativewind/babel'],
    plugins: [['nativewind/babel', { expo: true }]],
  };
};
```

<!-- nativewind Limitations -->

assigning variable as value
styling img
<TouchableOpacity/>

installing react native navigation v5.x

<!-- {NavigationContainer ,useNavigation} -->

`npm install @react-navigation/native@^5.x`

installing native navigation screen & safe-area-helper

`npx expo install react-native-screens react-native-safe-area-context`

installing the native stack navigation library v5.x

<!-- {createStackNavigation} -->
<!-- const Stack = createStackNavigation -->

`npm install @react-navigation/stack@^5.x`

<!-- working with sanity -->

<!-- install sanity globally -->

`npm i -g @sanity/cli`

<!-- initialize sanity -->

`sanity init --coupon`
or
`npm create sanity @latest`

`answer questions with preferred answers`

<!-- in project root -->

`npm i @sanity/client @sanity/image-url`
@sanity/client: connecting to the Sanity API and performing operations like reading, writing, and updating data
@sanity/image-url: handles image URLs within Sanity CMS. It provides a set of helper functions for generating URLs to retrieve images stored in Sanity, along with additional features like resizing, cropping, and applying various transformations to images on-the-fly.

<!-- open sanity folder in integrated terminal -->

`cd /Users/path/to/sanity/`
`npm run dev` to run server locally

`sanity deploy` to deploy server online

<!-- fetching data from sanity -->

`create a sanity.js file in the root folder`

```
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'projectId(could be found in sanity folder,sanity.config.js)',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
```

<!-- in the component where data needs to be fetched -->

`import sanityClient from '../sanity';` importing ln 94

<!-- syntax to fetch data from sanity -->

useEffect(() => {
const fetchData = async () => {
try {
const query = `*[_type == 'featured']{
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }`;

        const result = await sanityClient.fetch(query);
        setFeaturedCategories(result);
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      }
    };

    fetchData();

}, []);

<!-- using redux toolkit for global state management -->

install the dependencies needed - @reduxjs/toolkit react-redux

<!--
npm install @reduxjs/toolkit react-redux
 -->

create a redux store to manage global state

<!--
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
 -->

Provide the Redux Store to React - wrap the app with Provider

<!--
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
 -->

Create a Redux State Slice - a portion of the state using createSlice

<!--
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})


export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
 -->

Add Slice Reducers to the Store

<!--
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
 -->

Use Redux State and Actions in React Components

<!--
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
        <button
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
 -->

the splice method
`modifies existing array`
`takes two argument`
`first is the starting index of array`
`second is number of items to remove from the starting index`
const spliced = [1,2,3,4,5].splice(2,3)
`means starting from second index,remove 3 items from the array`
spliced = [3,4,5]

the reduce method
`iterate over an array and return and accumulate a single value`
`takes two argument - callback function & the starting/initial value`
`the callback function takes two argument - accumulator - represent the accumulator value & item - represent current iteration value`

<!-- const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, items) => (total += items.price), 0); -->

Add to Basket sheet - #reducer
<!-- addToBAsket(state, action) {
      state.items = [...state.items, action.payload];
    }, -->

Remove from Basket sheet - #reducer using index

<!-- use the findIndex js method to get the index whose id match -->

`const index = state.items.findIndex(`
`(item) => item.id === action.payload.id`
`);`

<!-- take snapshot of the items in state  -->

`let newBasket = [...state.items];`

<!-- check if index is valid and delete the specific index using splice method -->

`if (index >= 0) {`
`newBasket.splice(index, 1);`
`} else {`
`console.warn(`
`can't remove productId (id: ${action.payload.id}) as it is not in basket`
`);`
`}`

<!-- update the state items -->

`state.items = newBasket;`
