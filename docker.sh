echo "🐳 Building and running temperature-device"
docker build -t temperature-device .

echo "\n\n"
echo "⏯️ Running temperature-device"
docker run --rm -it temperature-device
