module.exports = {
  env: {
    DOMAIN_NAME: 'https://impossible-possible.net',
    DB_NAME: 'qav',
    DB_URL: 'mongodb+srv://qav:Aezakmi2021@cluster0.2vzdg.mongodb.net/qav?retryWrites=true&w=majority',
    JWT_SECRET: '4jsl35fkwDls21',
    SECRET_KEY: '5UnVZpZR2jbTpmvm',
    GOOGLE_USER: 'qavservise21@gmail.com',
    GOOGLE_PASSWORD: 'aezakmi2021!',
    NEXT_PUBLIC_GOOGLE_ANALYTICS: 'UA-204794642-1',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    loader: 'imgix',
    path: '',
  },
}
