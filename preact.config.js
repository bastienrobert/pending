import path from 'path'
import fs from 'fs'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const appSrc = resolveApp('src')
const appPublic = resolveApp('public')

export default (config, env, helpers) => {
  /**
   * ALIAS
   */
  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    src: path.resolve(appSrc),
    content: path.resolve(appSrc, 'content'),
    components: path.resolve(appSrc, 'components'),
    routes: path.resolve(appSrc, 'routes'),
    utils: path.resolve(appSrc, 'utils'),
    config: path.resolve(appSrc, 'config.js')
  })

  /**
   * STYLE
   */
  const sassLoader = helpers
    .getLoadersByName(config, 'proxy-loader')
    .find(loader => String(loader.rule.test) === '/\\.s[ac]ss$/')

  // SASS
  sassLoader.loader.options.options = Object.assign(
    {},
    sassLoader.loader.options.options,
    {
      includePaths: ['./src'],
      data: '@import "config.scss";'
    }
  )

  /**
   * FONTS
   */
  const fileLoader = helpers.getLoadersByName(
    config,
    env.production ? 'file-loader' : 'url-loader'
  )[0]
  fileLoader.rule.test = /\.(svg|woff2?|ttf|otf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i

  /**
   * PLUGINS
   */

  // COPY /public IN BUILD ROOT
  config.plugins.push(
    new CopyWebpackPlugin([{ context: appPublic, from: '**/*' }])
  )
}
