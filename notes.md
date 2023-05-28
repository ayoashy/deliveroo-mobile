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

<!-- installing react native navigation v5.x -->
<!-- {NavigationContainer ,useNavigation} -->

`npm install @react-navigation/native@^5.x`

<!-- installing native navigation screen & safe-area-helper -->

`npx expo install react-native-screens react-native-safe-area-context`

<!-- installing the native stack navigation library v5.x -->
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
@sanity/client: connecting to the Sanity API and performing various operations such as reading, writing, and updating data
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
