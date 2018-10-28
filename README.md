# Water Cup Counter

An application to help you control the water quantity you drink a day, created using MongoDB Stitch and React.js. If you want to know more about this necessity: [
Drink 8 Glasses of Water a Day: Fact or Fiction?](https://www.healthline.com/nutrition/8-glasses-of-water-per-day).

[![Powered by Stitch](http://badge.learnstitch.com/?appid=watercupcounter-alfxg)](http://cloud.mongodb.com)

## react-app

React.js application created using [Create React App](https://github.com/facebook/create-react-app).

This SPA show a glass of water. Everytime you add another cup, the glass of water fullfills a little more. When you complete your 8 glasses goal, the glass will be full.

You also can see a history with the last seven days and if you accomplished or not your goals each day.

## stitch-app

Exported [Stitch app](https://docs.mongodb.com/stitch/import-export/export-stitch-app/) with 2 endpoints.

### Endpoint Add

`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/watercupcounter-alfxg/service/watercup/incoming_webhook/add?appId={appId}`

Here you can POST how many cups you want to add in the day by sending the following body:

```
{
	"cups": Number
}
```

### Endpoint History

`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/watercupcounter-alfxg/service/watercup/incoming_webhook/history?appId={appId}`

Here you can GET how many cups you have drunk in the last seven days, including today. The response will look like:

```
[
    {
        "date": {
            "$date": {
                "$numberLong": String
            }
        },
        "cups": {
            "$numberInt": String
        }
    }
]
```
