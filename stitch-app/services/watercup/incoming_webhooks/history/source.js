exports = function(payload) {
  const appId = payload.query.appId;
  const lastSevenDays = Date.now() - 7*24*60*60e3;
  
  const mongodb = context.services.get("mongodb-atlas");
  const waterCup = mongodb.db("WaterCup").collection("WaterCup");
  
  // Get last seven days
  var cups = waterCup.find({
      appId,
      date: { $gt : new Date(lastSevenDays) }
  }, { cups: 1, date: 1 }).sort({date:1}).toArray();
  return cups;
};