# eslint-plugin-safe-arguments

check function arguments

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-safe-arguments`:

```
$ npm install eslint-plugin-safe-arguments --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-safe-arguments` globally.

## Usage

Add `safe-arguments` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "safe-arguments"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "safe-arguments/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





