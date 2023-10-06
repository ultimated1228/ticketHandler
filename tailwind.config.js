module.exports = {
    content: [
        "./views/*.{handlebars,html,js}",
        "./views/layouts/*.{handlebars,html,js}",
        "./views/partials/*.{handlebars,html,js}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ]
}
