navigator.geolocation.getCurrentPosition( async function(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey='kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';

  const respond = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}`);
  const data = await respond.json();
  const respond2 = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.ParentCity.Key}?apikey=${apiKey}`);
  const data2 = await respond2.json();
  debugger
  this.setState({
    city: data.ParentCity.LocalizedName,
    key: data.ParentCity.Key,
    fiveDaysForcst:data2.DailyForecasts
  })
});