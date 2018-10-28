exports = function(payload) {
  const appId = payload.query.appId;
  const today = new Date(Date.now()) || '';
  var body = {};
  if (payload.body) {
    body = EJSON.parse(payload.body.text());
  }
  var cups = body.cups;
  const insertCups = {
    appId: appId,
    date: today,
    cups: cups
  };
  
  const mongodb = context.services.get("mongodb-atlas");
  const waterCup = mongodb.db("WaterCup").collection("WaterCup");
  
  if (appId) {
    waterCup.insertOne(insertCups);
  }
  
  return;
};