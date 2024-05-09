npx react-native start --reset-cache
npx react-native run-ios

Clear Watchman Watches

- sometimes, stale or corrupted watches an cause delays or issues with Metro Bundler, clear them with:
  watchman watch-del-all
