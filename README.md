# Moto Repuestos Mega Mundo
This is a website for a business in Costa Rica.

To run it locally, you hace to clone it first and then
```
cd megamundo
npm install @sanity/client @sanity/image-url
npm install react-router-dom
npm install
npm run dev
```


How sanity was installed:

```
cd megamundo
npm create sanity@latest
```

Install sanity image helper: 
```
npm install @sanity/image-url
```

After that, just follow the instructions and set it up by your choice.
Change the schema and run the following in the terminal:
```
cd studio
npm run dev
```

add CORS in sanity through the termnal: 
```
cd megamundo/studio
npx sanity cors add http://localhost:5173 --credentials
```


### Uploading data
Instead of manually uploading every single product, I'm using google sheet + Make.com + gemini AI.

1. Put every single product in a google sheet. Gemini and Claude were used for this task.
2. Send it in Jason form