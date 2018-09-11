module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "no-param-reassign": 0,
        "prefer-destructuring": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "strict": 0,
        "arrow-body-style": ["warn", "never"]
    },
    "globals": {
        "document": false,
        "Audio": false,
    }
};
