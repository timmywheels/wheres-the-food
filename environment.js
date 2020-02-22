/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost =
    Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

const ENV = {
    dev: {
        yelp_api_key: 'ePGLpVmkELtuPSoF3tuNI6pXxXvhaRTRJrKIyud0fgnzVeqwX9sCOdxW6MwEYinT6sqBR2Tvw5iTggE6XHi-1ramBSSC7etgWzB81VnQCMSWhqkPT_VbvBbCI9MdW3Yx'
    },
    staging: {
        yelp_api_key: 'ePGLpVmkELtuPSoF3tuNI6pXxXvhaRTRJrKIyud0fgnzVeqwX9sCOdxW6MwEYinT6sqBR2Tvw5iTggE6XHi-1ramBSSC7etgWzB81VnQCMSWhqkPT_VbvBbCI9MdW3Yx'
    },
    prod: {
        yelp_api_key: 'ePGLpVmkELtuPSoF3tuNI6pXxXvhaRTRJrKIyud0fgnzVeqwX9sCOdxW6MwEYinT6sqBR2Tvw5iTggE6XHi-1ramBSSC7etgWzB81VnQCMSWhqkPT_VbvBbCI9MdW3Yx'
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
        return ENV.dev;
    } else if (env === 'staging') {
        return ENV.staging;
    } else if (env === 'prod') {
        return ENV.prod;
    }
};

export default getEnvVars;
