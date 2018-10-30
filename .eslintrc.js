module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "no-param-reassign": 0,
        "prefer-destructuring": 0,
        "import/prefer-default-export": "off",
        "react/prefer-stateless-function": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "strict": 0,
        "arrow-body-style": 0
    },
    "globals": {
        "localStorage": true,
    }
};
