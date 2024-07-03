module.exports = function iotDevice(
  deviceId,
  initialTemperature,
  initialHumidity,
  reportFrequencyInSeconds,
  reportFn
) {
  let temperature = initialTemperature;
  let humidity = initialHumidity;

  function randomVariation(value, minChange, maxChange) {
    let change =
      (Math.random() * (maxChange - minChange) + minChange) *
      (Math.random() > 0.5 ? 1 : -1);
    return value + change;
  }

  // Function to produce temperature snapshot
  function generateTemperatureSnapshot() {
    // Apply a random variation to temperature and humidity
    temperature = randomVariation(temperature, 0.1, 0.5); // Temperature varies between 0.1 to 0.5 degrees
    humidity = randomVariation(humidity, 0.1, 1.0); // Humidity varies between 0.1% to 1%

    // Ensure temperature and humidity remain within realistic bounds
    if (temperature < -10) temperature = -10;
    if (temperature > 40) temperature = 40;
    if (humidity < 0) humidity = 0;
    if (humidity > 100) humidity = 100;

    return {
      deviceId,
      temperature,
      humidity,
      timestamp: new Date().toISOString(),
    };

    // // Log the current snapshot
    // console.log(
    //   `Temperature: ${temperature.toFixed(2)}°C, Humidity: ${humidity.toFixed(
    //     2
    //   )}%`
    // );
  }

  // Set interval to generate temperature snapshot every second
  const snapshot = generateTemperatureSnapshot();
  reportFn(snapshot);
  setInterval(() => {
    const snapshot = generateTemperatureSnapshot();
    reportFn(snapshot);
  }, reportFrequencyInSeconds * 1000);
};
